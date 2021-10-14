import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'
import { ProductsStackParams } from '../navigator/ProductsNavigator'

interface Props {
  navigation: StackNavigationProp<ProductsStackParams, 'ProductsScreen'>
  routePath: keyof ProductsStackParams,
  routeParams?: object,
  title: string
}

const HeaderButton = ({navigation, title, routePath, routeParams = {}}: Props) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} style={styles.headerRight}
      onPress={() => navigation.navigate(routePath, routeParams)} 
    >
      <Text style={styles.headerRightText} >{title}</Text>
    </TouchableOpacity>
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

export default HeaderButton
