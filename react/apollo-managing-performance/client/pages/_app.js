import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../graphql';

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
