import { Alert, StyleSheet, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { styleCategoriesForm } from './Style';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import { getUser } from '../../service/AuthService';

const CategoriesForm = () => {
    const initialFormState = () => {
        return {
            name: '',
            type: 'gastos',
            description: '',
        };
    }

    categoriesType = [
        {
            id: 1,
            name: 'gastos'
        },
        {
            id: 2,
            name: 'ingresos'
        }
    ]

    const [addCategoriesForm, setAddCategoriesForm] = useState(initialFormState());


    const renderCategoriesType = () => {
        return categoriesType.map((type, index) => {
            let capitalize = type.name.charAt(0).toUpperCase() + type.name.slice(1);
            return <Picker.Item key={index} label={capitalize} value={type.name} />
        })
    }

    const saveCategoriesFormForm = async () => {
        try {
            const isFormEmptyOrNull = Object.values(addCategoriesForm).some(value => value === '' || value === null);
            if (isFormEmptyOrNull) {
                Alert.alert('Verificar', 'Revise la información', [{
                    text: 'Ok',
                }]);
                return;
            }
            const userInfo = await getUser();
            addCategoriesForm.user = userInfo.uid;
            const createCategorie = firestore().collection('categories').add(addCategoriesForm);
            if (createCategorie) {
                Alert.alert('Exito', 'Categoria registrada', [{
                    text: 'Ok',
                }]);
                setAddCategoriesForm(initialFormState());
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={styleCategoriesForm.container}>
                <View style={[styleCategoriesForm.containerForm, { paddingTop: 10, }]}>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={styleCategoriesForm.containerFormLabel}>Nombre</Text>
                        <TextInput style={[styleCategoriesForm.containerFormInput, { paddingHorizontal: 10, }]}
                            value={addCategoriesForm.name}
                            onChange={(e) => setAddCategoriesForm({ ...addCategoriesForm, name: e.nativeEvent.text })}>
                        </TextInput>
                    </View>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={styleCategoriesForm.containerFormLabel}>Descripción</Text>
                        <TextInput style={[styleCategoriesForm.containerFormInput, { paddingHorizontal: 10, }]}
                            value={addCategoriesForm.description}
                            onChange={(e) => setAddCategoriesForm({ ...addCategoriesForm, description: e.nativeEvent.text })}>
                        </TextInput>
                    </View>
                    <View style={{ paddingVertical: 10, }}>
                        <Text style={styleCategoriesForm.containerFormLabel}>Tipo de categoria</Text>
                        <View style={styleCategoriesForm.containerFormInput} >
                            <Picker style={{}}
                                itemStyle={{ height: 50, fontSize: 17, }}
                                selectedValue={addCategoriesForm.type}
                                data
                                onValueChange={(itemValue) => {
                                    setAddCategoriesForm({ ...addCategoriesForm, type: itemValue })
                                }
                                }>
                                {renderCategoriesType()}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={styleCategoriesForm.containerBtn}>
                    <TouchableOpacity style={styleCategoriesForm.containerBtnButton}
                        onPress={() => saveCategoriesFormForm()}>
                        <Text style={styleCategoriesForm.containerBtnLabel}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default CategoriesForm

const styles = StyleSheet.create({})