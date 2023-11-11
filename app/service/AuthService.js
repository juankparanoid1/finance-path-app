import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUser = async (user) => {
    try {
        if(!user){
            return;
        }
        await AsyncStorage.setItem('user',JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async () => {
    let userInfo = null;
    try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            userInfo = JSON.parse(user);
        }
    } catch (error) {
        console.log(error);
    }
    console.log('getUser', userInfo.uid)
    return userInfo;
}