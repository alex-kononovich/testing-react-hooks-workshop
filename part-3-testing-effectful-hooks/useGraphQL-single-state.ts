import { useEffect, useState } from "react";

type GraphQLQuery = string;
type Variables = { [key: string]: any };

type UseGraphQLState<Data> = {
  isLoading: boolean;
  data: Data | null;
  error: any | null;
};

const initialState = {
  isLoading: true,
  data: null,
  error: null
};

export const useGraphQL = <Data>(
  query: GraphQLQuery,
  variables: Variables,
  jwtToken: string
) => {
  const [state, setState] = useState<UseGraphQLState<Data>>(initialState);

  useEffect(() => {
    setState(initialState);

    const requestInit: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`
      },
      body: JSON.stringify({
        query,
        variables
      })
    };

    fetch("/graphql", requestInit)
      .then(r => r.json())
      .then(data => setState({ isLoading: false, data: data, error: null }))
      .catch(error => setState({ isLoading: false, data: null, error: error }));
  }, [query, variables]);

  return state;
};
