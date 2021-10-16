import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  title: string,
  onPress: () => void,
  backgroundColor?: string
}

const HeaderButton = ({ title, onPress, backgroundColor = '#3150ff'}: Props) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} style={{...styles.headerRight, backgroundColor}}
      onPress={onPress} 
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
    padding:8,
    borderRadius: 10
  },
  headerRightText: {
    color: '#ffffff'
  }
});

export default HeaderButton
