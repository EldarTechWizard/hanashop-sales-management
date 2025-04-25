import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Flex, Theme } from "@radix-ui/themes"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useState } from "react";
import { queryConfig } from '@lib/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "inherit">(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === "light" || storedTheme === "dark" || storedTheme === "inherit" ? storedTheme : "light";
  });

  const [queryClient] = React.useState(
      () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
        <Theme style={{backgroundColor:"#FAFAFA"}} >
        {children}
        </Theme>
      <ReactQueryDevtools initialIsOpen={false} /> {/* Optional DevTools */}
    </QueryClientProvider>
  );
}

export default AppProvider;