import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import {paths} from '@config/paths'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convert = (queryClient: QueryClient) => async (m: any) => {
    const { clientLoader, clientAction, default: Component, ...rest } = m;
    return {
      ...rest,
      loader: clientLoader? clientLoader(queryClient):undefined,
      action: clientAction? clientAction(queryClient):undefined,
      Component,
    };
  };

  export const createAppRouter = (queryClient: QueryClient) =>
    createBrowserRouter([
      {
        path: paths.home.path,
        lazy: async () => import('./routes/landing').then(convert(queryClient)),
      },
      {
        path: paths.products.path,
        lazy: async () => import('./routes/pages/product').then(convert(queryClient)),
      },
      {
        path: paths.gestion.path,
        lazy: async () => import('./routes/pages/gestion').then(convert(queryClient)),
      },
      {
        path: paths.example.path,
        lazy: async () => import('./routes/pages/example').then(convert(queryClient)),
      },
      {
        path: paths.customers.path,
        lazy: async () => import('./routes/pages/customer').then(convert(queryClient)),
      },
      {
        path: paths.categories.path,
        lazy: async () => import('./routes/pages/category').then(convert(queryClient)),
      },
      {
        path: paths.inventory.path,
        lazy: async () => import('./routes/pages/inventory-movement').then(convert(queryClient)),
      },
      {
        path: paths.salesReport.path,
        lazy: async () => import('./routes/pages/salesReport').then(convert(queryClient)),
      }
      ,
      {
        path: paths.inventoryReport.path,
        lazy: async () => import('./routes/pages/inventoryReport').then(convert(queryClient)),
      }
    ]);

  export const AppRouter = () => {
    const queryClient = useQueryClient();
    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

    return <RouterProvider router={router} />;
  };