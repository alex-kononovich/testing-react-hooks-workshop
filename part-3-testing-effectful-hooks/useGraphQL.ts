import { useEffect, useState } from "react";

export const useGraphQL = <Data>(query: string, jwtToken: string) => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setData(null);
    setError(null);
    setIsLoading(true);

    const requestInit: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        query
      })
    };

    fetch("/graphql", requestInit)
      .then(r => r.json())
      .then(data => {
        // TODO: implement correct data and error handling according to spec
        // https://graphql.org/learn/serving-over-http/#response
        // https://spec.graphql.org/June2018/#sec-Response-Format
        setData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, [query]);

  return {
    isLoading,
    data,
    error
  };
};
