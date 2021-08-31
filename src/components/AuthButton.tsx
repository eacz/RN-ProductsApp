import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import loginStyles from '../theme/loginTheme'

interface Props {
  onPress: () => void,
  text: string
}

const AuthButton = ({text, onPress }: Props) => {
  return (
    <View style={loginStyles.buttonContainer} >
      <TouchableOpacity onPress={onPress} style={loginStyles.button} activeOpacity={0.8} >
        <Text style={loginStyles.buttonText} >{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AuthButton
