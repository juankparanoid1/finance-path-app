import { BackHandler, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import HomeRoutes from '../../routes/HomeRoutes'

const Home = () => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove();
  }, [])
  
  return (
    <HomeRoutes></HomeRoutes>
  )
}

export default Home

const styles = StyleSheet.create({})