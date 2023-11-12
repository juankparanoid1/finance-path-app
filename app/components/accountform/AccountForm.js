import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { stylesAccountForm } from './Style';
import { useFirebaseCatalog } from '../../hooks/useFirebaseCatalog';
import { Picker } from '@react-native-picker/picker';
import {useDocRefFromArray} from '../../hooks/useDocRefFromArray';
import firestore from '@react-native-firebase/firestore';
import { getUser } from '../../service/AuthService';

const AccountForm = () => {

    const initialFormState = () => {
        return {
            amount: '',
            accountNumber: '',
            type: '',
            bank: '',
        };
    }

    const [addAccountForm, setAddAccountForm] = useState(initialFormState());
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

    const saveAccountForm = async () => {
        try {
            const isFormEmptyOrNull = Object.entries(addAccountForm).some(
                ([key, value]) => key !== 'bank' && (value === '' || value === null)
            );
            if (isFormEmptyOrNull || addAccountForm.amount === 0) {
                Alert.alert('Verificar', 'Revise la información', [{
                    text: 'Ok',
                }]);
                return;
            }

            const validateAccountNumber = await firestore()
                .collection('accounts')
                .where('accountNumber', '==', addAccountForm.accountNumber)
                .get();

            if (validateAccountNumber.size > 0) {
                Alert.alert('Verificar', 'El numero de cuenta ya se encuentra registrado', [{
                    text: 'Ok',
                }]);
                return;
            }

            const accountTypeRef = await firestore().collection('accounttype').doc(useDocRefFromArray(accountTypeList, addAccountForm.type));
            addAccountForm.type = accountTypeRef;
            const bankRef = await firestore().collection('banks').doc(useDocRefFromArray(banksList, addAccountForm.bank));
            addAccountForm.bank = bankRef;
            const userInfo = await getUser();
            addAccountForm.user = userInfo.uid;
            const createAccount = firestore().collection('accounts').add(addAccountForm);
            if (createAccount) {
                Alert.alert('Exito', 'Cuenta registrada', [{
                    text: 'Ok',
                }]);
                setAddAccountForm(initialFormState());
                ammountInputRef.current.clear();
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setAccountTypeList(accountTypeListData.data);
        setBanksList(banksData.data);
    }, [accountTypeListData.data, banksData.data])


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={stylesAccountForm.container}>
                <View style={stylesAccountForm.containerForm}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={stylesAccountForm.containerFormLabel}>Monto</Text>
                        <TextInput style={[stylesAccountForm.containerFormInput, { paddingHorizontal: 10, }]}
                            keyboardType='numeric'
                            ref={ammountInputRef}
                            onChange={(e) => setAddAccountForm({ ...addAccountForm, amount: Number(e.nativeEvent.text) })}>
                        </TextInput>
                    </View>
                </View>
                <View style={stylesAccountForm.containerForm}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={stylesAccountForm.containerFormLabel}>Número</Text>
                        <TextInput style={[stylesAccountForm.containerFormInput, { paddingHorizontal: 10, }]} keyboardType='default'
                            value={addAccountForm.accountNumber}
                            onChange={(e) => {
                                const numericText = e.nativeEvent.text.replace(/[^\d]/g, '');
                                if (numericText) {
                                    setAddAccountForm({ ...addAccountForm, accountNumber: String(numericText) })
                                }
                            }}>
                        </TextInput>
                    </View>
                </View>
                <View style={{ paddingVertical: 10, }}>
                    <Text style={stylesAccountForm.containerFormLabel}>Tipo</Text>
                    <View style={stylesAccountForm.containerFormInput} >
                        <Picker style={{}}
                            itemStyle={{ height: 50, fontSize: 17, }}
                            selectedValue={addAccountForm.type}
                            data
                            onValueChange={(itemValue) => {
                                setAddAccountForm({ ...addAccountForm, type: itemValue })
                            }
                            }>
                            {renderAccountTypePicker()}
                        </Picker>
                    </View>
                </View>
                <View style={{ paddingVertical: 10, }}>
                    <Text style={stylesAccountForm.containerFormLabel}>Cuenta</Text>
                    <View style={stylesAccountForm.containerFormInput} >
                        <Picker style={{}}
                            itemStyle={{ height: 50, fontSize: 17, }}
                            selectedValue={addAccountForm.bank}
                            onValueChange={(itemValue) => {
                                setAddAccountForm({ ...addAccountForm, bank: itemValue })
                            }
                            }>
                            {renderBanksPicker()}
                        </Picker>
                    </View>
                </View>
                <View style={stylesAccountForm.containerBtn}>
                    <TouchableOpacity style={stylesAccountForm.containerBtnButton}
                        onPress={() => saveAccountForm()}>
                        <Text style={stylesAccountForm.containerBtnLabel}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AccountForm

const styles = StyleSheet.create({})