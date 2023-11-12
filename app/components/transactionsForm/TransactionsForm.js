import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { stylesTransactionForm } from './Style';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Screens from '../../helpers/Screens'

const TransactionsForm = () => {

  const navigation = useNavigation();

  const [addTransactionForm, setAddTransactionForm] = useState({
    ammount: 0,
    transactionDate: null,
    transactionType: '',
    categorie: '',
    account: ''
  });

  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [transactionsType, setTransactionsType] = useState([
    {
      id: 1,
      name: 'Salidas'
    },
    {
      id: 2,
      name: 'Ahorros'
    },
    {
      id: 3,
      name: 'Gastos'
    }
  ]);

  const [categoriesList, setCategoriesList] = useState([
    {
      id: 1,
      name: 'Familia'
    },
    {
      id: 2,
      name: 'Salario'
    },
    {
      id: 3,
      name: 'Otros'
    }
  ]);

  const [accountsList, setAccountList] = useState([
    {
      id: 1,
      name: 'Ahorro agricola'
    },
    {
      id: 2,
      name: 'Ahorro Davivienda'
    },
    {
      id: 3,
      name: 'Credito Cuscatlán'
    }
  ]);

  const renderTransactionsPicker = () => {
    return transactionsType.map((transaction, index) => {
      return <Picker.Item key={index} label={transaction.name} value={transaction.id} />
    })
  }

  const renderCategoriesPicker = () => {
    return categoriesList.map((category, index) => {
      return <Picker.Item key={index} label={category.name} value={category.id} />
    })
  }

  const renderAccountsPicker = () => {
    return accountsList.map((account, index) => {
      return <Picker.Item key={index} label={account.name} value={account.id} />
    })
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  }

  const confirmDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    setDate(`${day} - ${month}`);
    setAddTransactionForm({ ...addTransactionForm, transactionDate: date })
    hideDatePicker();
  }

  const saveAddTransactionForm = () => {
    console.log(addTransactionForm);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={stylesTransactionForm.container}>
        <View style={stylesTransactionForm.containerAmmount}>
          <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate(Screens.HOME)}>
            <Icon name={'arrow-back'} size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.viewTop}>
            <Text style={stylesTransactionForm.containerAmmountLabel}>Monto</Text>
            <View style={styles.viewMonto}>
              <Text style={styles.logo}>$</Text>
              <TextInput style={styles.textInput} keyboardType='numeric' />
            </View>
          </View>
        </View>
        <View style={stylesTransactionForm.containerForm}>
          <View style={{ paddingBottom: 10, }}>
            <Text style={stylesTransactionForm.containerFormLabel}>Fecha</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <View style={stylesTransactionForm.containerFormInput}>
                <Text style={stylesTransactionForm.containerFormLabelDate}>{date}</Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={confirmDate}
              onCancel={hideDatePicker}
              locale='es_ES'
              headerTextIOS="Elige la fecha"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
              display='inline'
            />
          </View>
          <View style={{ paddingVertical: 10, }}>
            <Text style={stylesTransactionForm.containerFormLabel}>Tipo de transacción</Text>
            <View style={stylesTransactionForm.containerFormInput} >
              <Picker style={{}}
                itemStyle={{ height: 50, fontSize: 17, }}
                selectedValue={addTransactionForm.transactionType}
                data
                onValueChange={(itemValue) => {
                  setAddTransactionForm({ ...addTransactionForm, transactionType: itemValue })
                }
                }>
                {renderTransactionsPicker()}
              </Picker>
            </View>
          </View>
          <View style={{ paddingVertical: 10, }}>
            <Text style={stylesTransactionForm.containerFormLabel}>Categorias</Text>
            <View style={stylesTransactionForm.containerFormInput} >
              <Picker style={{}}
                itemStyle={{ height: 50, fontSize: 17, }}
                selectedValue={addTransactionForm.categorie}
                data
                onValueChange={(itemValue) => {
                  setAddTransactionForm({ ...addTransactionForm, categorie: itemValue })
                }
                }>
                {renderCategoriesPicker()}
              </Picker>
            </View>
          </View>
          <View style={{ paddingVertical: 10, }}>
            <Text style={stylesTransactionForm.containerFormLabel}>Cuenta</Text>
            <View style={stylesTransactionForm.containerFormInput} >
              <Picker style={{}}
                itemStyle={{ height: 50, fontSize: 17, }}
                selectedValue={addTransactionForm.account}
                onValueChange={(itemValue) => {
                  console.log(itemValue)
                  setAddTransactionForm({ ...addTransactionForm, account: itemValue })
                }
                }>
                {renderAccountsPicker()}
              </Picker>
            </View>
          </View>
        </View>
        <View style={stylesTransactionForm.containerBtn}>
          <TouchableOpacity style={stylesTransactionForm.containerBtnButton}
            onPress={() => saveAddTransactionForm()}>
            <Text style={stylesTransactionForm.containerBtnLabel}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default TransactionsForm

const styles = StyleSheet.create({
  btnBack: {
    borderWidth: 2,
    width: 60,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'black',
  },
  viewTop: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    width: 140,
    textAlign: 'center',
    fontSize: 25,
  },
  viewMonto: {
    flexDirection: 'row',
  },
  logo: {
    fontSize: 30,
    marginHorizontal: 10,
  }
})

