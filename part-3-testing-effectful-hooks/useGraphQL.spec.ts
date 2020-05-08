import { renderHook } from "@testing-library/react-hooks";
import { useGraphQL } from "./useGraphQL";

import fetch from "jest-fetch-mock";
fetch.enableMocks();

describe("useGraphQL", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("starts loading immediately", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGraphQL("", ""));
    expect(result.current.isLoading).toEqual(true);
    await waitForNextUpdate();
  });

  it("correctly uses fetch to talk to GraphQL endpoint", async () => {
    const { waitForNextUpdate } = renderHook(() =>
      useGraphQL("query { myField }", "fakeJWToken")
    );
    await waitForNextUpdate();

    expect(fetch).toHaveBeenCalledWith("/graphql", {
      method: "POST",
      headers: {
        Authorization: "Bearer fakeJWToken",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: "query { myField }" })
    });
  });

  it("correctly updates loading state", async () => {
    let finishLoading: () => void = () => {};
    const fetchPromise: Promise<string> = new Promise(resolve => {
      finishLoading = resolve;
    });
    fetch.mockResponse(() => fetchPromise);

    const { result, waitForNextUpdate } = renderHook(() => useGraphQL("", ""));

    expect(result.current.isLoading).toEqual(true);

    finishLoading();
    await waitForNextUpdate();

    expect(result.current.isLoading).toEqual(false);
  });

  it("parses the data from response", async () => {
    fetch.mockResponse(JSON.stringify({ test: 1 }));

    const { result, waitForNextUpdate } = renderHook(() => useGraphQL("", ""));
    await waitForNextUpdate();

    expect(result.current.data).toEqual({ test: 1 });
  });

  it("handles general errors", async () => {
    fetch.mockReject(new Error("Network error"));

    const { result, waitForNextUpdate } = renderHook(() => useGraphQL("", ""));
    await waitForNextUpdate();

    expect(result.current.error).toEqual(new Error("Network error"));
  });

  it("handles parse errors", async () => {
    fetch.mockResponse('not json');

    const { result, waitForNextUpdate } = renderHook(() => useGraphQL("", ""));
    await waitForNextUpdate();

    expect(result.current.error?.message).toEqual("invalid json response body at  reason: Unexpected token o in JSON at position 1");
  });
});
