import React from 'react'
import { Image, View } from 'react-native'

const WhiteLogo = () => {
  return (
    <View style={{
      alignItems: 'center'
    }} >
      <Image style={{width:110, height: 100}} source={require('../assets/react-logo-white.png')} />
    </View>
  )
}

export default WhiteLogo
