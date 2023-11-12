import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AccountForm from '../../components/accountform/AccountForm';

const AddAccount = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <AccountForm></AccountForm>
    </View>
  )
}

export default AddAccount

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})