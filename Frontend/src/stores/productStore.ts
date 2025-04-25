import { Product } from '@types/types'
import { create } from 'zustand'

type ProductStore = {
  insertMode: boolean,
  editMode: boolean,
  deleteMode: boolean,
  selectedProduct: Product | null,

  setInsertMode: (insertMode: boolean) => void,
  setEditMode: (editMode: boolean) => void,
  setDeleteMode: (deleteMode: boolean) => void,
  setSelectedProduct: (product: Product) => void,
}


const useProduct = create<ProductStore>((set) => ({
    insertMode: false,
    editMode: false,
    deleteMode: false,
    selectedProduct: null,

    setInsertMode: (insertMode) => set({insertMode:insertMode}),
    setEditMode: (editMode) => set({editMode: editMode}),
    setDeleteMode: (deleteMode) => set({deleteMode:deleteMode}),
    setSelectedProduct: (product) => set({selectedProduct: product}),
}))


export default useProduct;