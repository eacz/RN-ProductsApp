import { useEffect, useState } from "react"
import { Categoria, GetCategoriesResponse } from '../interfaces/AppInterfaces';
import productsApi from '../api/productsApi';

const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<Categoria[]>([])

  const getCategories = async () => {
    const res =  await productsApi.get<GetCategoriesResponse>('/categorias')
    setCategories(res.data.categorias) 
    setIsLoading(false)
  }

  useEffect(() => {
    getCategories()
  }, [])
  
  return {
    isLoading, 
    categories
  }
}

export default useCategories
