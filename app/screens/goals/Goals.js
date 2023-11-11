import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GoalsForm from '../../components/goalsform/GoalsForm'
import GoalsList from '../../components/goalslist/GoalsList'

const Goals = () => {
  return (
    <>
    <View style={styles.container}>
      <GoalsList></GoalsList>
    </View> 
  </>
  )
}

export default Goals

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})