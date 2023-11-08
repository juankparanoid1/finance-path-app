import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoriesItem from '../../components/CategoriesItem/CategoriesItem'

const Categories = () => {
  return (
    <>
      <View style={styles.container}>
        <CategoriesItem></CategoriesItem>
      </View> 
    </>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  }
})