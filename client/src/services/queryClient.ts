import { QueryClient } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      refetchOnWindowFocus: true, // Refetch data when window regains focus
      retry: 3, // Retry failed queries 3 times
    },
  },
});

export default queryClient;
