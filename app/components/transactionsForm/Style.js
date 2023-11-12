import { StyleSheet } from "react-native";
import Spacing from "../../helpers/Spacing";
import Colors from "../../helpers/Colors";

export const stylesTransactionForm = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Spacing.containerPadding,
    },
    containerAmmount: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerAmmountLabel: {
      fontSize: 25,
      fontWeight: '400',
      color: 'black'
    },
    containerAmmountInfo: {
      fontSize: 48,
      fontWeight: '600',
      color: '#333333'
    },
    containerForm: {
      flex: 2
    },
    containerFormLabel: {
      fontSize: 12,
      fontWeight: '400',
      color: '#020614'
    },
    containerFormInput: {
      height: 50,
      borderWidth: 1,
      borderColor: '#DDDDDD',
      borderRadius: 4,
    },
    containerFormLabelDate: {
      padding: 15,
      fontSize: 14,
      color: '#333333',
      fontWeight: '400'
    },
    containerBtn: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    containerBtnButton: {
      width: 132,
      height: 48,
      backgroundColor: Colors.primary,
      alignItems: 'center',
      justifyContent: 'center'
    },
    containerBtnLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFFFFF',
      borderRadius: 6,
    }
  })