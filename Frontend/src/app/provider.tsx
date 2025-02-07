import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { queryConfig } from '@lib/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = React.useState(
      () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
        <Theme appearance="dark">
        {children}
        </Theme>
      <ReactQueryDevtools initialIsOpen={false} /> {/* Optional DevTools */}
    </QueryClientProvider>
  );
}

export default AppProvider;