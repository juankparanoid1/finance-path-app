import { ActivityIndicator, FlatList, KeyboardAvoidingView, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firebase from '@react-native-firebase/firestore';
import Spacing from '../helpers/Spacing';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CategoriesByType from './CategoriesByType';

const CategoriesList = () => {
    const Tab = createMaterialTopTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen name="Gastos" component={CategoriesByType} initialParams={{ type: 'gastos' }}/>
            <Tab.Screen name="Ingresos" component={CategoriesByType} initialParams={{ type: 'ingresos' }}/>
        </Tab.Navigator>
    )
}

export default CategoriesList

const styles = StyleSheet.create({})