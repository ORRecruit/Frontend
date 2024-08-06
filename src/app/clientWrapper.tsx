// File: src/app/clientWrapper.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./authProvider";
import GoogleTagManager from "@/components/custom/GoogleTagManager";
import ApolloTracker from "@/components/custom/ApolloTracker";
import ClientLayout from "./clientLayout";

const queryClient = new QueryClient();

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GoogleTagManager containerId="GTM-WQBFH7L6" />
      <ApolloTracker appId="667d8edb4b466e0a9f2e49a4" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
