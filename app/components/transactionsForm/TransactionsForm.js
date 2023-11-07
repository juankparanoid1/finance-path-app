import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { stylesTransactionForm } from './Style';
import firestore from '@react-native-firebase/firestore';
import { useFirebaseCatalog } from '../../hooks/useFirebaseCatalog';
import useDocRefFromArray from '../../hooks/useDocRefFromArray';

const TransactionsForm = () => {

  const initialFormState = () => {
    return {
      amount: 0.00,
      transactionDate: null,
      transactionType: '',
      category: '',
      bank: '',
    };
  }

  const [addTransactionForm, setAddTransactionForm] = useState(initialFormState());
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [transactionsType, setTransactionsType] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [banksList, setBanksList] = useState([]);
  const [textInputValue, setTextInputValue] = useState('0.00');
  const [isTextInputVisible, setIsTextInputVisible] = useState(false);

  const transactionsTypeData = useFirebaseCatalog('transactiontype');
  const categoriesData = useFirebaseCatalog('categories');
  const banksData = useFirebaseCatalog('banks');

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

  const renderBanksPicker = () => {
    return banksList.map((bank, index) => {
      return <Picker.Item key={index} label={bank.name} value={bank.id} />
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

  const saveAddTransactionForm = async () => {
    try {
      const isFormEmptyOrNull = Object.values(initialFormState()).some(value => value === '' || value === null);
      if (!isFormEmptyOrNull) {
        Alert.alert('Verificar', 'Revise la información', [{
          text: 'Ok',
        }]);
        return;
      }
      const formatDate = await firestore.Timestamp.fromDate(addTransactionForm.transactionDate);
      const categoryRef = await firestore().collection('categories').doc(useDocRefFromArray(categoriesList, addTransactionForm.category));
      const transactiontypeRef = await firestore().collection('transactiontype').doc(useDocRefFromArray(transactionsType, addTransactionForm.transactionType));
      const bankRef = await firestore().collection('banks').doc(useDocRefFromArray(banksList, addTransactionForm.bank));
      addTransactionForm.transactionDate = formatDate;
      addTransactionForm.category = categoryRef
      addTransactionForm.transactionType = transactiontypeRef;
      addTransactionForm.bank = bankRef;
      const createTransaction = firestore().collection('transactions').add(addTransactionForm);
      if (createTransaction) {
        Alert.alert('Exito', 'Transacción registrada', [{
          text: 'Ok',
        }]);
        setAddTransactionForm(initialFormState());
        initialFormState();
        setTextInputValue('0.00')
        setDate('');
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  // const getDocRefFromArray = (array, query) => {
  //   return array?.filter(arr => arr.id === query).idDoc;
  // }

  const handleToggleTextInput = () => {
    setIsTextInputVisible(!isTextInputVisible);
  };

  const handleBlur = () => {
    setIsTextInputVisible(false);
  };

  useEffect(() => {
    setTransactionsType(transactionsTypeData.data);
    setCategoriesList(categoriesData.data);
    setBanksList(banksData.data);
  }, [transactionsTypeData.data, categoriesData.data, banksData.data])


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <View style={stylesTransactionForm.container}>
        <View style={stylesTransactionForm.containerAmmount}>
          <Text style={stylesTransactionForm.containerAmmountLabel}>Monto</Text>
          {isTextInputVisible ?

            <TextInput style={[stylesTransactionForm.containerFormInput,
            { width: '50%', textAlign: 'center', fontSize: 40, fontWeight: '600', color: '#333333' }]} keyboardType='numeric'
              onChange={(e) => {
                setAddTransactionForm({ ...addTransactionForm, amount: Number(e.nativeEvent.text) });
                setTextInputValue(e.nativeEvent.text)
              }}
              onBlur={handleBlur}
            >
            </TextInput>
            :
            <TouchableOpacity onPress={handleToggleTextInput}>
              <Text style={stylesTransactionForm.containerAmmountInfo}>{textInputValue}</Text>
            </TouchableOpacity>
          }
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
                selectedValue={addTransactionForm.category}
                data
                onValueChange={(itemValue) => {
                  setAddTransactionForm({ ...addTransactionForm, category: itemValue })
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
                selectedValue={addTransactionForm.bank}
                onValueChange={(itemValue) => {
                  setAddTransactionForm({ ...addTransactionForm, bank: itemValue })
                }
                }>
                {renderBanksPicker()}
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

