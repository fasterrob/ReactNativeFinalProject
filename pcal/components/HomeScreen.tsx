import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text>HomeScreen</Text>
                <Button title='CALORIES PLAN' />
                <Button title='INGREDIENTS CALCULATOR' />
            </View>
        </View>

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        elevation: 5,
        marginHorizontal: 30,
        marginVertical: 100,
        borderRadius: 10,
        padding: 10
    }
})