import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../screens/ProductScreen';
import ProductsScreen from '../screens/ProductsScreen';

export type ProductsStackParams = {
  ProductsScreen: undefined
  ProductScreen: {id?: string, name?: string}
}

const Stack = createStackNavigator<ProductsStackParams>()

const ProductsNavigator = () => {
  return (
   <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#ffffff'
      },
      headerStyle: {
        elevation: 0,
        shadowColor: 'transparent'
      }
    }}
   >
     <Stack.Screen options={{title: 'Products'}} name="ProductsScreen" component={ProductsScreen}  />
     <Stack.Screen options={{title: 'Product'}} name="ProductScreen" component={ProductScreen}  />
   </Stack.Navigator>
  )
}

export default ProductsNavigator
