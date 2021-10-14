import React, { createContext, useEffect, useState } from "react";
import { Producto, GetProductsResponse } from '../interfaces/AppInterfaces';
import productsApi from '../api/productsApi';

type productsContextProps = {
  products: Producto[]
  loadProducts: () => Promise<void>
  addProduct: (categoryId: string, productName:  string) => Promise<void>
  updateProducts: (categoryId: string, productName:  string, productId: string) => Promise<void>
  deleteProduct: (productId: string) => Promise<void>
  loadProductById: (productId: string) => Promise<Producto>
  uploadImage: (data: any, id: string) => Promise<void> //TODO: type data
}

export const ProductsContext = createContext({} as productsContextProps)

const ProductsProvider: React.FC = ({children}) => {
  const [products, setProducts] = useState<Producto[]>([])

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async  () => {
    try {
      const res = await productsApi.get<GetProductsResponse>('/productos')
      setProducts([...res.data.productos])
    } catch (error) {
      console.log(error);
    }
  }

  const addProduct = async  (categoryId: string, productName:  string) => {
    
  }

  const updateProducts = async  (categoryId: string, productName:  string, productId: string) => {
    
  }

  const deleteProduct = async  (productId: string) => {
    
  }

  const loadProductById = async  (productId: string) => {
    throw new Error('Not implemented')
  }

  const uploadImage = async  (data: any, id: string) => {
    
  }


  return (
    <ProductsContext.Provider value={{
      products,
      loadProducts,
      addProduct,
      updateProducts,
      deleteProduct,
      loadProductById,
      uploadImage,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider