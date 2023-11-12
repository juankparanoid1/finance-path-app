import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TransactionList from '../../components/transactionlist/TransactionList';

const Transactions = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: 10 }]}>
      <TransactionList></TransactionList>
    </View>
  )
}

export default Transactions

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
})