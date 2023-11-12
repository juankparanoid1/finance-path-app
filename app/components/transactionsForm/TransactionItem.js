import { Text, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Screens from '../../helpers/Screens'

const TransactionsItem = () => {

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback>
      <View style={styles.contenedor}>
        <View style={styles.top}>
          <TouchableOpacity style={styles.btnBack} onPress={() => navigation.navigate(Screens.LOGIN)}>
            <Icon name={'arrow-back'} size={30} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>Transacciones</Text>
          </View>
        </View>
        <View style={styles.contenedorDatos}>
          <View style={styles.contenedorTexto}>
            <Text style={styles.texto1}>Ingresos:</Text>
            <Text style={styles.texto1}>$0.00</Text>
          </View>
          <View style={styles.contenedorTexto}>
            <Text style={styles.texto1}>Gastos:</Text>
            <Text style={styles.texto1}>$0.00</Text>
          </View>
          <View style={styles.contenedorTexto}>
            <Text style={styles.texto1}>Balance:</Text>
            <Text style={styles.texto1}>$0.00</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.contenedorTran}>
            <View style={styles.contenedorInfo}>
              <Icon name={'logo-usd'} size={30} color="black" />
            </View>
            <View style={styles.contenedorInfo}>
              <Text style={styles.textoPrimario}>Ahorro Agricola</Text>
              <Text>Comida-Almuerzo</Text>
            </View>
            <View style={styles.contenedorInfo}>
              <Text style={styles.monto}>$0.00</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.viewBtn}>
          <TouchableOpacity style={styles.btnAdd} onPress={() => navigation.navigate(Screens.ADDTRANSACTION)}>
            <Icon name={'add-circle-outline'} size={65} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default TransactionsItem

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    marginVertical: 30,
  },
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
  viewTitle: {
    marginHorizontal: 40,
  },
  contenedor: {
    flex: 1,
    backgroundColor: '#778899',
  },
  texto1: {
    fontSize: 20,
    color: '#FFF',
  },
  contenedorDatos: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contenedorTexto: {
    marginHorizontal: 10,
  },
  contenedorTran: {
    marginVertical: 30,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  textoPrimario: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  contenedorInfo: {
    marginHorizontal: 30,
    justifyContent: 'center',
  },
  monto: {
    fontSize: 25,
  },
  btnAdd: {
    width: 60,
    alignItems: 'center',
    borderRadius: 100,
  },
  viewBtn: {
    flexDirection: 'row-reverse',
  }
})