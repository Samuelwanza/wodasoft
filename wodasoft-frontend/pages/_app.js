import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "../src/context/userContext";
import { useApollo } from "../src/lib/apolloClient";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        {getLayout(<Component {...pageProps} />)};
        <ToastContainer />
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
