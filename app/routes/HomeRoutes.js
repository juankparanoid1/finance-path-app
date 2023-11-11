import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accounts from '../screens/accounts/Accounts';
import Categories from '../screens/categories/Categories';
import Goals from '../screens/goals/Goals';
import Transactions from '../screens/transactions/Transactions';
import Screens from '../helpers/Screens';
import Colors from '../helpers/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import AddAccount from '../screens/addaccount/AddAccount';
import { useNavigation } from '@react-navigation/native';
import Settings from '../screens/settings/Settings';

const HomeRoutes = ({ isBottomNavigationBar = true }) => {

    const Tab = createBottomTabNavigator();
    const navigation = useNavigation()

    const displayIcon = (screenName, focused) => {
        if (!screenName) {
            return;
        }
        let iconName = '';
        switch (screenName) {
            case Screens.ACCOUNTS:
                iconName = focused ? 'bookmark' : 'bookmark-outline';
                break;
            case Screens.TRANSACTIONS:
                iconName = focused ? 'stats-chart-sharp' : 'stats-chart-outline';
                break;
            case Screens.CATEGORIES:
                iconName = focused ? 'book' : 'book-outline'
                break;
            case Screens.GOALS:
                iconName = focused ? 'check-decagram' : 'check-decagram-outline'
                break;
            case Screens.SETTINGS:
                iconName = focused ? 'menu' : 'menu-outline'
                break;
            default:
                break;
        }
        return iconName;
    }

    return (
        <Tab.Navigator screenOptions={({ route }) => (
            {
                tabBarIcon: ({ focused, color, size }) => {
                    const screenName = route.name;
                    const iconName = displayIcon(screenName, focused);
                    return (screenName !== Screens.GOALS) ?
                        <Ionicons name={iconName} size={size} color={color}></Ionicons>
                        :
                        <MaterialCommunityIcons name={iconName} size={size} color={color}></MaterialCommunityIcons>
                        ;
                },
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: styles.tabBarLabelStyle
            }
        )

        }>
            {
                isBottomNavigationBar ?
                    (
                        <>
                            <Tab.Screen name={Screens.ACCOUNTS}
                                options={{
                                    headerTitleStyle: styles.headerTitleStyle, headerTitleAlign: 'center',
                                    headerRight: () => (
                                        <TouchableOpacity style={{
                                            marginRight: 10, // Add marginLeft for separation
                                        }} onPress={() => {
                                            navigation.navigate(Screens.ADDACCOUNT);
                                        }}>
                                            <View style={{ borderWidth: 1.5, borderColor: '#231F20', width: 47, height: 47, borderRadius: 7, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                                <Ionicons style={{ paddingHorizontal: 1 }} name={'add-outline'} size={45} color={'#231F20'}></Ionicons>
                                            </View>
                                        </TouchableOpacity>
                                    ),
                                }}
                                component={Accounts}></Tab.Screen>
                            <Tab.Screen name={Screens.TRANSACTIONS} options={{ headerTitleStyle: styles.headerTitleStyle, headerTitleAlign: 'center', headerTitle: 'Agregar Transacción' }} component={Transactions}></Tab.Screen>
                            <Tab.Screen name={Screens.CATEGORIES} options={{
                                headerTitleStyle: styles.headerTitleStyle, headerTitleAlign: 'center',
                                headerRight: () => (
                                    <TouchableOpacity style={{
                                        marginRight: 10, // Add marginLeft for separation
                                    }} onPress={() => {
                                        navigation.navigate(Screens.ADDCATEGORIES);
                                    }}>
                                        <View style={{ borderWidth: 1.5, borderColor: '#231F20', width: 47, height: 47, borderRadius: 7, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                            <Ionicons style={{ paddingHorizontal: 1 }} name={'add-outline'} size={45} color={'#231F20'}></Ionicons>
                                        </View>
                                    </TouchableOpacity>
                                ),
                            }} component={Categories}></Tab.Screen>
                            <Tab.Screen name={Screens.GOALS} options={{ headerTitleStyle: styles.headerTitleStyle, headerTitleAlign: 'center' }} component={Goals}></Tab.Screen>
                            <Tab.Screen name={Screens.SETTINGS} options={{ headerTitleStyle: styles.headerTitleStyle, headerTitleAlign: 'center' }} component={Settings}></Tab.Screen>
                        </>
                    )
                    :
                    (
                        <>

                        </>
                    )
            }

        </Tab.Navigator>
    )
}

export default HomeRoutes

const styles = StyleSheet.create({
    tabBarLabel: {
        color: Colors.primary,
        fontSize: 13
    },
    headerTitleStyle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.font,
    },
    tabBarLabelStyle: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.primary,
    }
})