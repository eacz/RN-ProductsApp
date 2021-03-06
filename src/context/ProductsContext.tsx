import React, { createContext, useEffect, useState } from "react";
import { Producto, GetProductsResponse } from '../interfaces/AppInterfaces';
import productsApi from '../api/productsApi';
import { ImagePickerResponse } from "react-native-image-picker";

type productsContextProps = {
  products: Producto[],
  loading: boolean,
  loadProducts: () => Promise<void>
  addProduct: (categoryId: string, productName:  string) => Promise<Producto>
  updateProduct: (categoryId: string, productName:  string, productId: string) => Promise<void>
  deleteProduct: (productId: string) => Promise<void>
  loadProductById: (productId: string) => Promise<Producto>
  uploadImage: (data: any, id: string) => Promise<void> //TODO: type data
}

export const ProductsContext = createContext({} as productsContextProps)

const ProductsProvider: React.FC = ({children}) => {
  const [products, setProducts] = useState<Producto[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async  () => {
    try {
      setLoading(true)
      const res = await productsApi.get<GetProductsResponse>('/productos?limite=50')
      setProducts([...res.data.productos])
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  }

  const addProduct = async  (categoryId: string, productName:  string) : Promise <Producto> => {
    setLoading(true)
    const res = await productsApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categoryId
    })
    setProducts([...products, res.data])
    setLoading(false)
    return res.data
  }
  
  const updateProduct = async  (categoryId: string, productName:  string, productId: string) => {
    setLoading(true)
    const res = await productsApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId
    })
    setProducts(products.map(p => p._id === productId ? res.data : p))
    setLoading(false)
  }

  const deleteProduct = async (productId: string) => {
    try {
      setLoading(true)
      await productsApi.delete(`/productos/${productId}`)
      setProducts(products.filter(p => p._id !== productId))
    } catch (error) {
      console.log(error)
      
    }
    
    setLoading(false)
  }

  const loadProductById = async  (productId: string): Promise<Producto> => {
    try {
      const res = await productsApi.get<Producto>(`/productos/${productId}`)
      return res.data
    } catch (error) {
      console.log(error);
    }
    throw new Error('Not implemented')
  }

  const uploadImage = async  (data: ImagePickerResponse, id: string) => {
    const fileToUpload = {
      uri: data.assets?.[0].uri,
      type: data.assets?.[0].type,
      name: data.assets?.[0].fileName,
    }

    const formData = new FormData()
    formData.append('archivo', fileToUpload)

    try {
      const res = await productsApi.put<Producto>(`/uploads/productos/${id}`, formData)
      console.log(res);
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <ProductsContext.Provider value={{
      products,
      loading,
      loadProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      loadProductById,
      uploadImage,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider