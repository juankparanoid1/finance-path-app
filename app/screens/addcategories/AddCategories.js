import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CategoriesForm from '../../components/categoriesForm/CategoriesForm';

const AddCategories = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <CategoriesForm></CategoriesForm>
    </View>
  )
}

export default AddCategories

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})