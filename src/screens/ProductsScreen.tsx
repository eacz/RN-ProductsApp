import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductsContext';
import ProductListItem, { productListSeparator } from '../components/ProductListItem';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import HeaderButton from '../components/HeaderButton';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

const ProductsScreen = ({ navigation }: Props) => {
  const { products, loadProducts } = useContext(ProductsContext)
  
  //TODO: pull to refesh to update products

  //set header button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton navigation={navigation} routePath="ProductScreen" title="Add"  />,
    })
  })
  
  return (
    <View style={styles.container}>
      <FlatList 
        data={products}
        keyExtractor={p => p._id} 
        renderItem={({item}) => <ProductListItem navigation={navigation} product={item} />}
        ItemSeparatorComponent={productListSeparator} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
    },
    headerRight: {
      marginRight: 20,
      backgroundColor: '#3150ff',
      padding:8,
      borderRadius: 10
    },
    headerRightText: {
      color: '#ffffff'
    }
});

export default ProductsScreen
