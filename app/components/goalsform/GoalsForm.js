import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useFirebaseCatalog } from '../../hooks/useFirebaseCatalog';
import { stylesGoalsForm } from './Style';
import useDocRefFromArray from '../../hooks/useDocRefFromArray';
import { getUser } from '../../service/AuthService';
import firestore from '@react-native-firebase/firestore';

const GoalsForm = () => {

    const initialFormState = () => {
        return {
            name: '',
            amountlimit: '',
            type: '',
            bank: '',
        };
    }

    const [addGoalForm, setAddGoalForm] = useState(initialFormState());
    const [accountTypeList, setAccountTypeList] = useState([]);
    const accountTypeListData = useFirebaseCatalog('accounttype');
    const [banksList, setBanksList] = useState([]);
    const banksData = useFirebaseCatalog('banks');
    const ammountInputRef = useRef(null);

    const renderAccountTypePicker = () => {
        return accountTypeList.map((type, index) => {
            return <Picker.Item key={index} label={type.name} value={type.id} />
        })
    }

    const renderBanksPicker = () => {
        return banksList.map((bank, index) => {
            return <Picker.Item key={index} label={bank.name} value={bank.id} />
        })
    }

    const saveGoal = async () => {

        try {
            const isFormEmptyOrNull = Object.entries(addGoalForm).some(
                ([key, value]) => key !== 'bank' && (value === '' || value === null)
            );
            if (isFormEmptyOrNull || addGoalForm.amountlimit === 0) {
                Alert.alert('Verificar', 'Revise la información', [{
                    text: 'Ok',
                }]);
                return;
            }

            const accountTypeRef = await firestore().collection('accounttype').doc(useDocRefFromArray(accountTypeList, addGoalForm.type));
            addGoalForm.type = accountTypeRef;
            const bankRef = await firestore().collection('banks').doc(useDocRefFromArray(banksList, addGoalForm.bank));
            addGoalForm.bank = bankRef;
            const userInfo = await getUser();
            addGoalForm.user = userInfo.uid;
            console.log(addGoalForm);
            const createAccount = firestore().collection('goals').add(addGoalForm);
            if (createAccount) {
                Alert.alert('Exito', 'Cuenta registrada', [{
                    text: 'Ok',
                }]);
                setAddGoalForm(initialFormState());
                ammountInputRef.current.clear();
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setAccountTypeList(accountTypeListData.data);
        setBanksList(banksData.data);
    }, [accountTypeListData.data, banksData.data])

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={stylesGoalsForm.container}>
                <View style={stylesGoalsForm.containerForm}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={stylesGoalsForm.containerFormLabel}>Nombre</Text>
                        <TextInput style={[stylesGoalsForm.containerFormInput, { paddingHorizontal: 10, }]}
                            value={addGoalForm.name}
                            onChange={(e) => setAddGoalForm({ ...addGoalForm, name: e.nativeEvent.text })}>
                        </TextInput>
                    </View>
                </View>

                <View style={stylesGoalsForm.containerForm}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={stylesGoalsForm.containerFormLabel}>Monto</Text>
                        <TextInput style={[stylesGoalsForm.containerFormInput, { paddingHorizontal: 10, }]}
                            keyboardType='numeric'
                            ref={ammountInputRef}
                            onChange={(e) => setAddGoalForm({ ...addGoalForm, amountlimit: Number(e.nativeEvent.text) })}>
                        </TextInput>
                    </View>
                </View>
                <View style={stylesGoalsForm.containerForm}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={stylesGoalsForm.containerFormLabel}>Cuenta</Text>
                        <View style={stylesGoalsForm.containerFormInput} >
                            <Picker style={{}}
                                itemStyle={{ height: 50, fontSize: 17, }}
                                selectedValue={addGoalForm.bank}
                                onValueChange={(itemValue) => {
                                    setAddGoalForm({ ...addGoalForm, bank: itemValue })
                                }
                                }>
                                {renderBanksPicker()}
                            </Picker>
                        </View>
                    </View>
                </View>

                <View style={stylesGoalsForm.containerForm}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={stylesGoalsForm.containerFormLabel}>Tipo</Text>
                        <View style={stylesGoalsForm.containerFormInput} >
                            <Picker style={{}}
                                itemStyle={{ height: 50, fontSize: 17, }}
                                selectedValue={addGoalForm.type}
                                data
                                onValueChange={(itemValue) => {
                                    setAddGoalForm({ ...addGoalForm, type: itemValue })
                                }
                                }>
                                {renderAccountTypePicker()}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={stylesGoalsForm.containerBtn}>
                    <TouchableOpacity style={stylesGoalsForm.containerBtnButton}
                        onPress={() => saveGoal()}>
                        <Text style={stylesGoalsForm.containerBtnLabel}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default GoalsForm

const styles = StyleSheet.create({})