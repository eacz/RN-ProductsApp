import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView} from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Picker } from '@react-native-picker/picker';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import useCategories from '../hooks/useCategories';
import useForm from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';
import LoadingScreen from './LoadingScreen';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

const ProductScreen = ({ navigation, route: {params: { id = '', name = '' }}}: Props) => {

  const { loadProductById } = useContext(ProductsContext)
  const { _id, categorieId, name: nameF, img, form, onChange, setFormValue } = useForm({
    _id: id,
    categorieId: '',
    name: name,
    img: ''
  })
  const [selectedLanguage, setSelectedLanguage] = useState();
  
  const { categories, isLoading } = useCategories()

  //set custom header title
  useEffect(() => {
    navigation.setOptions({title: name || 'New Product'})
  }, [])

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    if(id. length === 0) return
    const product = await loadProductById(id)
    setFormValue({
      _id: id,
      categorieId: product.categoria._id,
      img: product.img || '',
      name
    })
    
  }
 
  if(isLoading){
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label} >Product name</Text>
        <TextInput 
          value={nameF} 
          onChangeText={value => onChange(value, 'name')}
          style={styles.textInput}
          placeholder="Product" />
        
        <Text> Select Category </Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          {categories.map(c => <Picker.Item label={c.nombre} value={c._id} key={c._id} />)}
        </Picker>

        <Button title="Save" onPress={() => {}} color="#5856d6" />

        <View style={styles.buttonContainer} >
          <Button title="Camera" onPress={() => {}} color="#5856d6" />
          <View style={{width: 10}} />
          <Button title="Gallery" onPress={() => {}} color="#5856d6" />
        </View>
        <Text>
          {JSON.stringify(form, null, 5)}
        </Text>
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
