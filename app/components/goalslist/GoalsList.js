import { ActivityIndicator, FlatList, KeyboardAvoidingView, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUser } from '../../service/AuthService';
import Spacing from '../../helpers/Spacing';
import firebase from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons'

const GoalsList = () => {

    const [goalsList, setGoalsList] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            setIsLoading(true);
            const userInfo = await getUser();
            const querySnapshot = await firebase().collection('goals')
                .where('user', '==', userInfo.uid)
                .get();
            const itemsPromises = querySnapshot.docs.map(async (goal) => {
                const bankDoc = await firebase().doc(goal.data().bank.path).get();
                const typeDoc = await firebase().doc(goal.data().type.path).get();
                return {
                    ...goal.data(),
                    bank: bankDoc.data().name === 'Sin banco' ? '' : bankDoc.data().name,
                    type: typeDoc.data().name,
                };
            });
            const items = await Promise.all(itemsPromises);
            setGoalsList(items);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    const refreshData = async () => {
        setIsRefresh(true);
        await loadGoals();
        setIsRefresh(false)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={{ flex: 1, paddingHorizontal: Spacing.containerPadding, }}>
                {
                    !isLoading ?
                        <FlatList
                            style={{ flex: 1, paddingTop: 20, }}
                            showsVerticalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
                            data={goalsList}
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
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                                    <View style={{ height: 80, width: '100%', flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 48 / 2, width: 48, height: 48, backgroundColor: '#F2F2F2' }}>
                                                <Icon name={'game-controller-outline'} size={32} color='#100D40' />
                                            </View>
                                        </View>
                                        <View style={{ flex: 3, }}>
                                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                                <Text style={{ color: '#100D40', fontSize: 16, lineHeight: 20, fontWeight: '500' }}>{item.name}</Text>
                                                <Text style={{ fontSize: 14, fontWeight: '400', color: '#333333', paddingTop: 5, }}>{item.bank}</Text>
                                            </View>
                                        </View>
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

export default GoalsList

const styles = StyleSheet.create({})