import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import { setContext } from "apollo-link-context";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:1337/graphql/",
});

// Cache implementation
const cache = new InMemoryCache();
const authLink = setContext((_, { headers }) => {
  // get the authentication token from ApplicationSettings if it exists
  const token = localStorage.getItem("token");

  // return the headers to the context so HTTP link can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});
// Create the apollo client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

window.restoreGraphql = () => {
  apolloClient.restore();
};

createApp(App).use(apolloProvider).use(store).use(router).mount("#app");
