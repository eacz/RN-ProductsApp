import React from 'react'
import { KeyboardTypeOptions, Platform, View, Text, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import loginStyles from '../theme/loginTheme'

interface Props {
  label: string,
  placeholder?: string,
  keyboardType: KeyboardTypeOptions,
  isPassword?: boolean,
  icon?: string,
  field: string,
  value: string,
  auto?:boolean
  onChange: (value: string, field: any) => void,
  onSubmitEditing: () => void,
  
}

const AuthInput = ({label, placeholder, keyboardType,isPassword, auto= false, icon, field, value,onChange,onSubmitEditing}: Props) => {

  return (
    <>
      <Text style={loginStyles.label} >{label}</Text>
      <View style={loginStyles.inputContainer} >
      { icon && <Icon style={loginStyles.inputIcon} name={icon} size={20} color="#ffffff" />}
      <TextInput 
        placeholder={placeholder ? placeholder : `Write your ${label.toLowerCase()}`}
        secureTextEntry={isPassword}
        underlineColorAndroid="#ffffff" 
        placeholderTextColor="rgba(255,255,255,0.4)" 
        keyboardType={keyboardType} 
        style={[loginStyles.inputField, (Platform.OS ==="ios") && loginStyles.inputFieldIos]}
        selectionColor="#ffffff"
        autoCorrect={auto}
        autoCapitalize={auto ? 'words' : 'none'}
        onChangeText={(v) => onChange(v, field)}
        onSubmitEditing={onSubmitEditing}
        value={value}
      />
      </View>
    </>
  )
}

export default AuthInput
