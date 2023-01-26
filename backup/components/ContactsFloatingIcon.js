import React, {useContext} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import Context from '../context/Context'

export default function ContactsFloatingIcon() {

    const {theme: { colors }} = useContext(Context)

    const navigation = useNavigation()

    return (
        <TouchableOpacity 
                onPress={() => navigation.navigate('contacts')}
                activeOpacity={0.8}  
                style={[styles.container, {backgroundColor: colors.secondary}]} >
            <MaterialCommunityIcons 
                name='android-messages'
                size={30}
                color={'white'}
                style={{transform: [{scaleX: -1}]}}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        borderRadius: 60,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    }
})