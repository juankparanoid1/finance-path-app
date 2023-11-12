import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GoalsForm from '../../components/goalsform/GoalsForm';
import TransactionsForm from '../../components/transactionsForm/TransactionsForm';

const AddTransactions = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <TransactionsForm></TransactionsForm>
        </View>
    )
}

export default AddTransactions

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})