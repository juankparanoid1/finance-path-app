import { Text, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView, KeyboardAvoidingView, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Screens from '../../helpers/Screens'
import Spacing from '../../helpers/Spacing'
import { getUser } from '../../service/AuthService'
import firebase from '@react-native-firebase/firestore'

const TransactionList = () => {

    const [transactionsList, setTransactionsList] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionsDetails, setTransactionDetails] = useState({
        income: 0,
        expenses: 0,
        balance: 0,
    });

    useEffect(() => {
        loadTransactions();
    }, []);

    useEffect(() => {
        getTransactionDetails();
    }, [transactionsList]);

    const loadTransactions = async () => {
        try {
            setIsLoading(true);
            const userInfo = await getUser();
            const querySnapshot = await firebase().collection('transactions')
                .where('user', '==', userInfo.uid)
                .get();
            const itemsPromises = querySnapshot.docs.map(async (tran) => {
                const bankDoc = await firebase().doc(tran.data().bank.path).get();
                const categoryDoc = await firebase().doc(tran.data().category.path).get();
                const transactionTypeDoc = await firebase().doc(tran.data().transactionType.path).get();
                return {
                    ...tran.data(),
                    bank: bankDoc.data().name === 'Sin banco' ? 'Efectivo' : bankDoc.data().name,
                    transactiontype: transactionTypeDoc.data().name,
                    category: categoryDoc.data().name,
                };
            });
            const items = await Promise.all(itemsPromises);
            setTransactionsList(items);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    const getTransactionDetails = () => {
        let details = {
            income: 0,
            expenses: 0,
            balance: 0,
        }
        transactionsList.forEach(tran => {
            switch (tran.transactiontype) {
                case 'Ingresos':
                    details.income += tran.amount;
                    break;
                case 'Gastos':
                    details.expenses += tran.amount;
                    break;
                default:
                    break;
            }
        });
        setTransactionDetails(details)
    }

    const displayColorTranType = (item) => {
        let color = '';
        switch (item.transactiontype) {
            case 'Ingresos':
                color = '#399DDC'
                break;
            case 'Gastos':
                color = '#E34F4F'
                break;
            default:
                break;
        }
        return color;
    }

    const displaySignoTranType = (item) => {
        let signo = '';
        switch (item.transactiontype) {
            case 'Ingresos':
                signo = '+'
                break;
            case 'Gastos':
                signo = '-'
                break;
            default:
                break;
        }
        return signo;
    }

    const calcBalance = () => {
        return transactionsDetails.income - transactionsDetails.expenses;
    }

    const refreshData = async () => {
        setIsRefresh(true);
        await loadTransactions();
        setIsRefresh(false)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={styles.contenedor}>
                <View style={styles.contenedorDatos}>
                    <View style={styles.contenedorTexto}>
                        <Text style={styles.texto1}>Ingresos</Text>
                        <Text style={styles.texto1}>${transactionsDetails.income.toFixed(2)}</Text>
                    </View>
                    <View style={styles.contenedorTexto}>
                        <Text style={styles.texto1}>Gastos</Text>
                        <Text style={styles.texto1}>${transactionsDetails.expenses.toFixed(2)}</Text>
                    </View>
                    <View style={styles.contenedorTexto}>
                        <Text style={styles.texto1}>Balance</Text>
                        <Text style={styles.texto1}>${calcBalance().toFixed(2)}</Text>
                    </View>
                </View>

                {
                    !isLoading ?
                        <FlatList
                            style={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
                            data={transactionsList}
                            ListEmptyComponent={() =>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>No data disponible</Text>
                                </View>
                            }
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefresh}
                                    onRefresh={() => refreshData()}
                                    tintColor="#100D40"
                                />
                            }
                            renderItem={({ item, index, separators }) => (
                                    <View style={styles.contenedorTran}>
                                        <View style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon name={'logo-usd'} size={30} color="black" />
                                        </View>
                                        <View style={{ flex: 1, }}>
                                            <Text style={{ fontSize: 20, fontWeight: 600, color: '#000000' }}>{item.bank}</Text>
                                            <Text style={{ fontSize: 16, fontWeight: 400, color: '#000000' }}>{item.category}</Text>
                                        </View>
                                        <View style={styles.contenedorInfo}>
                                            <Text style={[styles.monto, { color: displayColorTranType(item) }]}>
                                                {displaySignoTranType(item)} ${item.amount}
                                            </Text>
                                        </View>
                                    </View>

                            )}
                            keyExtractor={(item, index) => 'key' + index}
                        />
                        :
                        (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#0073bf" />
                        </View>)
                }

                {/* <View style={styles.viewBtn}>
              <TouchableOpacity style={styles.btnAdd} onPress={() => navigation.navigate(Screens.ADDTRANSACTION)}>
                <Icon name={'add-circle-outline'} size={65} color="black" />
              </TouchableOpacity>
            </View> */}
            </View>
        </KeyboardAvoidingView>
    )
}

export default TransactionList

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        marginVertical: 30,
    },
    btnBack: {
        borderWidth: 2,
        width: 60,
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#FFF',
    },
    title: {
        fontSize: 30,
        color: '#FFF',
    },
    viewTitle: {
        marginHorizontal: 40,
    },
    contenedor: {
        flex: 1,
        paddingHorizontal: Spacing.containerPadding,
    },
    texto1: {
        fontSize: 16,
        color: '#545F71',
        lineHeight: 22,
        fontWeight: '600',
        textAlign: 'center'
    },
    contenedorDatos: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    contenedorTexto: {
        marginHorizontal: 10,
    },
    contenedorTran: {
        flex: 1,
        flexDirection: 'row',
    },
    textoPrimario: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    contenedorInfo: {
        justifyContent: 'center',
    },
    monto: {
        fontSize: 16,
        fontWeight: '600',
    },
    btnAdd: {
        width: 60,
        alignItems: 'center',
        borderRadius: 100,
    },
    viewBtn: {
        flexDirection: 'row-reverse',
    }
})