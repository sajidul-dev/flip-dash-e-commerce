import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { Provider } from "react-redux";
import { store } from "@/redux/store/store";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        {" "}
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </Provider>
  );
}
