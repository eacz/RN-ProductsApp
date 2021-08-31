import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import loginStyles from '../theme/loginTheme'

interface Props {
  route: string,
  text: string,
  navigation: any //I don't know how to type this :(
}

const RightClickableText = ({text, route, navigation} : Props) => {
  return (
    <View style={loginStyles.newUserContainer} >  
    <TouchableOpacity 
      onPress={() => navigation.replace(route)} 
      activeOpacity={0.8} 
    >
        <Text style={loginStyles.buttonText} > {text} </Text>
    </TouchableOpacity>
  </View>

  )
}

export default RightClickableText
