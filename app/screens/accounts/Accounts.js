import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AccountList from '../../components/accountlist/AccountList';

const Accounts = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <AccountList></AccountList>
    </View>
  )
}

export default Accounts

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})