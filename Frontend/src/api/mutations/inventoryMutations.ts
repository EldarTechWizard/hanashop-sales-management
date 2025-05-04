import { InventoryMovement } from "@customTypes/types";
import { deleteData, postData, updateData } from "@lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// --- Inventory Movement ---
export const useCreateInventoryMovement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InventoryMovement) =>
      postData("/inventory_movements/", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory-movements"] });
    },
  });
};

export const useUpdateInventoryMovement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: InventoryMovement }) =>
      updateData(`/inventory_movements/${id}/`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory-movements"] });
    },
  });
};

export const useDeleteInventoryMovement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteData(`/inventory_movements/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory-movements"] });
    },
  });
};
