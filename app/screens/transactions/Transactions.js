import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TransactionsItem from '../../components/transactionsForm/TransactionItem';

const Transactions = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <TransactionsItem></TransactionsItem>
    </View>
  )
}

export default Transactions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#778899',
  }
})