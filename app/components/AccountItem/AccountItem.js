import { Text, StyleSheet, View, FlatList, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity,
  TouchableHighlight } from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import AccountInfo from './AccountInfo'
import AccountForm from './AccountForm'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Screens from '../../helpers/Screens'

const AccountItem = () => {
  const [cuentas, setCuentas] = useState([]);
  const [mostrarform, guardarMostrarForm] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerCuentasStorage = async () => {
      try{
        const cuentasStorage = await AsyncStorage.getItem('cuentas');
        if(cuentasStorage){
          setCuentas(JSON.parse(cuentasStorage))
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerCuentasStorage();
  }, []);

  const eliminarCuenta = id => {
    const cuentasFiltradas = cuentas.filter( cuenta => cuenta.id !== id);
    setCuentas(cuentasFiltradas);
    guardarCuentasStorage(JSON.stringify(cuentasFiltradas));
  }

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform);
  }

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  const guardarCuentasStorage = async(cuentasJSON) => {
    try{
      await AsyncStorage.setItem('cuentas', cuentasJSON);
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <TouchableWithoutFeedback onPress={() => cerrarTeclado() }>
      <View style={styles.contenedor}>
        <View style={styles.top}>
          <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate(Screens.LOGIN)}>
            <Icon name={'arrow-back'} size={30} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>Cuentas</Text>
          </View>
          <TouchableOpacity style={styles.btnAdd} onPress={ () => mostrarFormulario() }>
            <Icon name={'add'} size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}> {mostrarform ? 'Cancelar' : 'Admistra tus Cuentas:'} </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          { mostrarform ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cuenta</Text>
              <AccountForm cuentas={cuentas} setCuentas={setCuentas} guardarMostrarForm={guardarMostrarForm}
                guardarCuentasStorage={guardarCuentasStorage} />
            </>
          ) : (
            <>
                <Text style={styles.titulo}> {cuentas.length > 0 ? 'Cuentas Disponibles:' : 'No hay cuentas que mostrar'} </Text>
                <FlatList style={styles.listado} data={cuentas} renderItem={ ({item}) => <AccountInfo item={item}
                  eliminarCuenta={eliminarCuenta} /> } keyExtractor={ cuenta => cuenta.id} />
            </>
          ) }
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AccountItem

const styles = StyleSheet.create({
  btnBack: {
    borderWidth: 2,
    width: 60,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#FFF',
  },
  title: {
    fontSize: 30,
    color: '#FFF',
  },
  top: {
    flexDirection: 'row',
    marginVertical: 30,
  },
  viewTitle: {
    marginHorizontal: 90,
  },
  contenedor: {
    flex: 1,
    backgroundColor: '#778899',
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#b0e0e6',
    marginVertical: 10
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
  },
  btnAdd: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#FFF',
  }
})