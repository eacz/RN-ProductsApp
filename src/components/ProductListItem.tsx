import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Producto } from '../interfaces/AppInterfaces';
import { ProductsStackParams } from '../navigator/ProductsNavigator';

interface Props {
  product: Producto,
  navigation: StackNavigationProp<ProductsStackParams, 'ProductsScreen'>
}

const ProductListItem = ({product, navigation} : Props) => {
  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('ProductScreen', {id: product._id, name: product.nombre})} 
      activeOpacity={0.5} 
    >
      <Text style={styles.title} >{product.nombre}</Text>
    </TouchableOpacity>
  )
}

export const productListSeparator = () => <View style={styles.separator} />

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textTransform: 'capitalize'
  },
  separator: {
    borderBottomWidth: 2,
    marginVertical: 4,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  }
});

export default ProductListItem
