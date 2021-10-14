import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { ScrollView } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

const ProductScreen = ({ navigation, route: {params: { id, name }}}: Props) => {

  //set custom header title
  useEffect(() => {
    navigation.setOptions({title: name || 'New Product'})
  }, [])
  
  //if there is no id, create new product
  if(!id || !name){
    return (
      <View>
        <Text> new product </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label} >Product name</Text>
        <TextInput style={styles.textInput} placeholder="Product" />
        <Text> Select Category </Text>
        {/* picker */}

        <Button title="Save" onPress={() => {}} color="#5856d6" />

        <View style={styles.buttonContainer} >
          <Button title="Camera" onPress={() => {}} color="#5856d6" />
          <View style={{width: 10}} />
          <Button title="Gallery" onPress={() => {}} color="#5856d6" />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
      marginHorizontal: 20
    },
    label: {
      fontSize: 18,
    },
    textInput: {
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 10,
      borderColor: 'rgba(0,0,0,0.2)',
      height: 45,
      marginBottom: 15,
      marginTop: 10
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10
    }
});

export default ProductScreen
