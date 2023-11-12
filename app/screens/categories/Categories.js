import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CategoriesForm from '../../components/categoriesForm/CategoriesForm'
import CategoriesList from '../../categorieslist/CategoriesList'

const Categories = () => {
  return (
    <>
      <View style={styles.container}>
        <CategoriesList></CategoriesList>
      </View> 
    </>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})