import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Image, ActivityIndicator, Alert} from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Picker } from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import useCategories from '../hooks/useCategories';
import useForm from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';
import LoadingScreen from './LoadingScreen';
import HeaderButton from '../components/HeaderButton';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

const ProductScreen = ({ navigation, route: {params: { id = '', name = '' }}}: Props) => {

  const { loadProductById, addProduct, updateProduct, deleteProduct, uploadImage, loading } = useContext(ProductsContext)
  const { user } = useContext(AuthContext)
  const [tempImage, setTempImage] = useState<string>('')
  const { _id, categorieId, form, name: nameF, img, onChange, setFormValue } = useForm({
    _id: id,
    categorieId: '',
    name: name,
    img: ''
  })
  
  const { categories, isLoading } = useCategories()

  const handleDelete = () => {
     Alert.alert(
      "Are you sure you want to delete this product?",
      "This action is permanent",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: async () => {
          await deleteProduct(_id)
          navigation.pop()
        } }
      ]
    );
  }

  //set custom header title
  useEffect(() => {
    navigation.setOptions({
      title: nameF || 'Product name',
      headerRight: () => ( 
        user?.rol === 'ADMIN_ROLE' && _id 
        ? <HeaderButton title="Delete" backgroundColor="#d84242" onPress={() => handleDelete() } />
        : <View></View>
       ) 
    })
  }, [nameF])

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

  const takePhoto = () => {
    launchCamera({ mediaType: 'photo', quality: 0.5 }, (res) => {
      console.log(res);
      if(res.didCancel) return
      if(!res.assets?.[0].uri) return
      setTempImage(res.assets?.[0].uri)
      uploadImage(res, _id)
    })
  }

  const saveOrUpdate = async () => {
    if(id.length > 0){
      updateProduct(categorieId, nameF, id)
    } else {
      const tempCategorieId = categorieId || categories[0]._id
      const newProduct = await addProduct(tempCategorieId, nameF)
      onChange(newProduct._id, '_id')
    }
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
        
        <Text style={styles.label} > Select Category </Text>
        <Picker
          style={{ marginBottom: 10}}
          selectedValue={categorieId}
          onValueChange={ value => onChange(value, 'categorieId')}
        >
          {categories.map(c => <Picker.Item label={c.nombre} value={c._id} key={c._id} />)}
        </Picker>

        {
          loading 
          ? <ActivityIndicator color="#e1e1e1" size={40} style={{marginBottom: 10}} />
          : <Button  title="Save" onPress={saveOrUpdate} color="#5856d6" />

        }
        {( img.length > 0 && !tempImage  )&&  <Image source={{uri: img}} style={styles.image} />}
        {tempImage.length > 0 &&  <Image source={{uri: tempImage}} style={styles.image} />}
        
        {
          _id.length > 0 &&  
          //TODO: wrap this on a component
            <View style={styles.buttonContainer} >
              <Button title="Camera" onPress={takePhoto} color="#5856d6" />
              <View style={{width: 10}} />
              <Button title="Gallery" onPress={() => {}} color="#5856d6" />
            </View>
        }

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
    },
    image: {
      marginTop: 20,
      width: '100%', 
      height: 250
    }
});

export default ProductScreen
