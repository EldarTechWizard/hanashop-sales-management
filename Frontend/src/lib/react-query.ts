import { DefaultOptions } from '@tanstack/react-query';
export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
} satisfies DefaultOptions;