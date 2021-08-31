import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import loginStyles from '../theme/loginTheme'

interface Props {
  onPress: () => void,
  text: string,
  iconButton?: string
}

const AuthButton = ({text, iconButton, onPress }: Props) => {
  return (
    <View style={loginStyles.buttonContainer} >
      <TouchableOpacity onPress={onPress} style={loginStyles.button} activeOpacity={0.8} >
        <Text style={loginStyles.buttonText} >{text}</Text>
        { iconButton &&  <Icon style={{marginLeft: 10}}  name={iconButton} color="#ffffff" size={20} /> }
      </TouchableOpacity>
    </View>
  )
}

export default AuthButton
