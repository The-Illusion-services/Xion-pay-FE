import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConversationProvider } from "@/hooks/context/conversation";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConversationProvider>
        <Component {...pageProps} />
      </ConversationProvider>
    </QueryClientProvider>
  );
}
// TODO: if any error in the ap, show error pge