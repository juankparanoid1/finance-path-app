import { ActivityIndicator, FlatList, KeyboardAvoidingView, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from '../../helpers/Spacing'
import firebase from '@react-native-firebase/firestore';
import { getUser } from '../../service/AuthService';
import auth from '@react-native-firebase/auth';
import ModalAccount from '../modal/ModalAccount';

const AccountList = () => {
    const [accountList, setAccountList] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [info, setInfo] = useState({});

    useEffect(() => {
        loadAccounts();
    }, [])

    const loadAccounts = async () => {
        try {
            setIsLoading(true);
            await auth().onAuthStateChanged(async (user) => {
                if (user) {
                    const querySnapshot = await firebase().collection('accounts')
                        .where('user', '==', user.uid)
                        .get();
                    const itemsPromises = querySnapshot.docs.map(async (account) => {
                        const bankDoc = await firebase().doc(account.data().bank.path).get();
                        const typeDoc = await firebase().doc(account.data().type.path).get();
                        return {
                            id: account.id,
                            ...account.data(),
                            bank: bankDoc.data().name === 'Sin banco' ? '' : bankDoc.data().name,
                            type: typeDoc.data().name,
                        };
                    });
                    const items = await Promise.all(itemsPromises);
                    setAccountList(items);
                    setIsLoading(false);
                } else {
                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    const refreshData = async () => {
        setIsRefresh(true);
        await loadAccounts();
        setIsRefresh(false)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ModalAccount item={info} modalVisible={modalVisible} setModalVisible={setModalVisible}></ModalAccount>
            <View style={{ flex: 1, paddingHorizontal: Spacing.containerPadding, }}>
                {
                    !isLoading ?
                        <FlatList
                            style={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{ height: 35 }}></View>}
                            data={accountList}
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
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{
                                        flex: 1, width: 327, height: 166, backgroundColor: '#FFFFFF', borderRadius: 16,
                                        borderColor: '#100D40', borderWidth: 2, padding: 24,
                                    }}>
                                        <Text style={{ fontSize: 32, lineHeight: 36, fontWeight: '700', color: '#100D40' }}>${item.amount}</Text>
                                        <Text style={{ fontSize: 16, lineHeight: 22, fontWeight: '400', color: '#545F71', paddingVertical: 4, }}>{`${item.type} ${item.bank ? '-' : ''} ${item.bank}`}</Text>
                                        <TouchableOpacity style={{ paddingTop: 7, }} onPress={()=> {setModalVisible(true); setInfo(item)}}>
                                            <View style={{ width: 121, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEF1F4', paddingVertical: 16, borderRadius: 6, }}>
                                                <Text style={{ fontSize: 16, lineHeight: 22, fontWeight: '600', color: '#545F71' }}>
                                                    Ver detalles
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
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
            </View>
        </KeyboardAvoidingView>
    )
}

export default AccountList

const styles = StyleSheet.create({})