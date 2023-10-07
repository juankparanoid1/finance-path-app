import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AccountItem from '../../components/AccountItem/AccountItem';

const Accounts = () => {
  return (
    <>
      <View style={styles.container}>
        <AccountItem></AccountItem>
      </View> 
    </>
  )
}

export default Accounts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  }
})