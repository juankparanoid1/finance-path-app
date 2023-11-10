import { Text, StyleSheet, View, FlatList, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity,
    TouchableHighlight } from 'react-native'
import React, {useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Screens from '../../helpers/Screens'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GastoForm from './GastoForm'
import GastoInfo from './GastoInfo'

const CategoriesItem = () => {

    const navigation = useNavigation();

    const [gastos, setGastos] = useState([]);
    const [mostrargastoform, guardarGastoForm] = useState(false);

    useEffect(() => {
        const obtenerGastosStorage = async () => {
          try{
            const gastosStorage = await AsyncStorage.getItem('gastos');
            if(gastosStorage){
              setGastos(JSON.parse(gastosStorage))
            }
          } catch (error) {
            console.log(error);
          }
        }
        obtenerGastosStorage();
      }, []);
    
      const eliminarGasto = id => {
        const gastosFiltrados = gastos.filter( gasto => gasto.id !== id);
        setGastos(gastosFiltrados);
        guardarGastoStorage(JSON.stringify(gastosFiltrados));
      }
    
      const mostrarGastoFormulario = () => {
        guardarGastoForm(!mostrargastoform);
      }
    
      const cerrarTeclado = () => {
        Keyboard.dismiss();
      }
    
      const guardarGastoStorage = async(gastosJSON) => {
        try{
          await AsyncStorage.setItem('gastos', gastosJSON);
        } catch (error) {
          console.log(error);
        }
      }
    

    return(
        <TouchableWithoutFeedback>
            <View style={styles.contenedor} onPress={() => cerrarTeclado()}>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate(Screens.LOGIN)}>
                        <Icon name={'arrow-back'} size={30} color="#FFF" />
                    </TouchableOpacity>
                    <View style={styles.viewTitle}>
                        <Text style={styles.title}>Categorias</Text>
                    </View>
                </View>
                <View style={styles.viewTitle2}>
                    <Text style={styles.title}>Gastos:</Text>
                </View>
                <View style={styles.contenido}>
                { mostrargastoform ? (
                    <>
                    <Text style={styles.titulo}>Crear Nueva Cuenta</Text>
                    <GastoForm gastos={gastos} setGastos={setGastos} guardarGastoForm={guardarGastoForm}
                        guardarGastoStorage={guardarGastoStorage} />
                    </>
                ) : (
                    <>
                        <Text style={styles.titulo}> {gastos.length > 0 ? '' : 'No hay gastos que mostrar'} </Text>
                        <FlatList style={styles.listado} data={gastos} renderItem={ ({item}) => <GastoInfo item={item}
                        eliminarGasto={eliminarGasto} /> } keyExtractor={ gasto => gasto.id} />
                    </>
                ) }
                </View>
                <View>
                    <TouchableHighlight onPress={ () => mostrarGastoFormulario() } style={styles.btnMostrarForm}>
                        <Text style={styles.textoMostrarForm}> {mostrargastoform ? 'Cancelar' : 'Añadir Gasto'} </Text>
                    </TouchableHighlight>
                </View>
            </View>
    </TouchableWithoutFeedback>
    );
}

export default CategoriesItem

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
    viewTitle2: {
        fontSize: 30,
        color: '#FFF',
        marginHorizontal: 144,
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
        backgroundColor: 'blue',
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
        backgroundColor: 'green',
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