import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core/index.js";

interface ClienteGraphqlFunction {
  authUser: string;
}

export function clientGraphql({
  authUser,
}: ClienteGraphqlFunction) {
  const httpLink = new HttpLink({
    uri: `${import.meta.env.VITE_GRAPHQL_URL}`,
    headers: {
      Authorization: `Bearer ${authUser}`,
      "x-api-key": `${import.meta.env.VITE_X_API_KEY}`,
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
}
