import React from 'react'
import {StyleSheet} from 'react-native'
import { Image } from 'react-native'

export default function Avatar({size, user}) {
    return (
        <Image 
            style={{
                width: size,
                height: size,
                borderRadius: size,
            }}
            
            source={user?.photoURL ? {uri: user.photoURL} : require('../assets/icon-square.png')}
            resizeMode='cover'
        />
    )
}

const styles = StyleSheet.create({
    container: {

    }
})
