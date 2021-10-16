import React, { useContext, useEffect } from 'react'
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ProductsContext } from '../context/ProductsContext';
import ProductListItem, { productListSeparator } from '../components/ProductListItem';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import HeaderButton from '../components/HeaderButton';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

const ProductsScreen = ({ navigation }: Props) => {
  const { products, loadProducts, loading } = useContext(ProductsContext)

  //set header button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton navigation={navigation} routePath="ProductScreen" title="Add"  />,
    })
  })

  const onRefresh = () => {
    loadProducts()
  }
  
  return (
    <View style={styles.container}>
      <FlatList 
        data={products}
        keyExtractor={p => p._id} 
        renderItem={({item}) => <ProductListItem navigation={navigation} product={item} />}
        ItemSeparatorComponent={productListSeparator} 
        refreshControl={
          <RefreshControl 
            refreshing={loading}
            onRefresh={onRefresh}
            progressBackgroundColor="#5856d6"
            colors={['#ffffff']}
            title="Refreshing"
          />
        }
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
