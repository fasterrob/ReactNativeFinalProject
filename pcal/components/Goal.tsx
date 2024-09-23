import { View, Text, TextInput, Button, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/styles'

const Goal = () => {
    return (
        <View style={styles.containerGoal}>
            <Text style={styles.titleBMI}>Your Goal</Text>
            <Text style={styles.fontBMI}>Weight Goal</Text>
            <TextInput editable={false} style={styles.textBox} placeholder="-" />
            <Text style={styles.fontBMI}>Duration</Text>
            <TextInput editable={false} style={styles.textBox} placeholder="-" />
            <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#66C6A8",
                    borderRadius: 50,
                    width: 100,
                    height: 40,
                }}>
                    <Text style={{ color: "white" }}>
                        SUBMIT
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Goal