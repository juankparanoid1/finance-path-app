import { ActivityIndicator, FlatList, KeyboardAvoidingView, LayoutAnimation, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import firebase from '@react-native-firebase/firestore';
import Spacing from '../helpers/Spacing';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { getUser } from '../service/AuthService';

const CategoriesByType = ({ route }) => {
    const { type } = route.params;

    const [categoriesList, setCategoriesList] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shouldRefreshData, setShouldRefreshData] = useState(true);
    const [expanded, setExpanded] = useState(-1);

    useFocusEffect(
        useCallback(() => {
            if (shouldRefreshData) {
                console.log(`Screen focused with type: ${type}`);
                loadCategories();
            }

            return () => {
                console.log(`Screen unfocused`);
            };
        }, [shouldRefreshData, type])
    );

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setIsLoading(true);
            const userInfo = await getUser();
            const querySnapshot = await firebase().collection('categories')
                .where('type', '==', type)
                .where('user', '==', userInfo.uid)
                .get();
            const itemsPromises = querySnapshot.docs.map(async (categories) => {
                return {
                    id: categories.id,
                    ...categories.data(),
                };
            });
            const items = await Promise.all(itemsPromises);
            setCategoriesList(items);
            setIsLoading(false);
            setShouldRefreshData(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }
    }

    const refreshData = async () => {
        setIsRefresh(true);
        setShouldRefreshData(true);
        await loadCategories();
        setIsRefresh(false)
    }

    const toggleExpand = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded((prevIndex) => (prevIndex === index ? -1 : index));
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={{ flex: 1 }}>
                {
                    !isLoading ?
                        <FlatList
                            style={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            data={categoriesList}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefresh}
                                    onRefresh={() => refreshData()}
                                    tintColor="#100D40"
                                />
                            }
                            ListEmptyComponent={() =>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>No data disponible</Text>
                                </View>
                            }
                            renderItem={({ item, index, separators }) => (
                                <View>
                                    <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => toggleExpand(index)}>
                                        <Text style={[styles.title, styles.font]}>{item.name}</Text>
                                        <Icon name={expanded === index ? 'chevron-up-outline' : 'chevron-down-outline'} size={30} color='#100D40' />
                                    </TouchableOpacity>
                                    <View style={styles.parentHr} />
                                    {
                                        expanded === index &&
                                        <View style={styles.child}>
                                            <Text style={{ fontSize: 14, lineHeight: 14, fontWeight: '400', color: '#82909D' }}>{item.description}</Text>
                                        </View>
                                    }

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

export default CategoriesByType

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#100D40',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingHorizontal: 15,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    parentHr: {
        height: 1,
        color: '#100D40',
        width: '100%'
    },
    child: {
        backgroundColor: '#FFFFFF',
        padding: 16,
    }
})