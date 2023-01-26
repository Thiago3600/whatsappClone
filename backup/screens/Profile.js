import React, {useContext, useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import Context from '../context/Context'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {pickImage, askForPermission, uploadImage} from '../utils'
import {auth, db} from '../firebase'
import {updateProfile} from '@firebase/auth'
import { setDoc, doc } from '@firebase/firestore'
import { useNavigation } from '@react-navigation/native'

export default function Profile() {

    const {theme: { colors }} = useContext(Context)
    const [displayName, setDisplayName] = useState()
    const [selectedImage, setSelectedImage] = useState()
    const [permissionsStatus, setPermissionsStatus] = useState(null)
    const navigation = useNavigation()

    useEffect(() =>{
        (async () =>{
            const status = await askForPermission()
            setPermissionsStatus(status)
        })()
    },[])

    async function handlePress() {
        const user = auth.currentUser
        let photoURL
        if(selectedImage) {
            const {url} = await uploadImage(selectedImage, `images/${user.uid}`, "profilePicture")
            photoURL = url
        }
        const userData = {
            displayName,
            email: user.email,
        }
        if(photoURL){
            userData.photoURL = photoURL
        }
        await Promise.all([
            updateProfile(user, userData),
            setDoc(doc(db, "users", user.uid), {...userData, uid: user.uid})
        ]).then(() =>navigation.navigate("Home"))

    }
    async function handleProfilePicture(){
        const result = await pickImage()
        if(!result.cancelled){
            setSelectedImage(result.uri)
        }
    }


    if(!permissionsStatus){
        return <Text>Loading</Text>
    }
    if(permissionsStatus !== 'granted'){
        return <Text>You need to allow this permission</Text>
    }

    return (
        <React.Fragment>
            <StatusBar style='auto' />
            <View style={styles.container} >
                <Text style={[styles.title, {color: colors.foreground}]} >Profile info</Text>
                <Text style={[styles.txt, {color: colors.text}]} >
                    Please provide your name and an optional profile photo
                </Text>
            <TouchableOpacity 
                style={[styles.photoProfile, {backgroundColor: colors.background}]}
                onPress={handleProfilePicture}
            >
                {!selectedImage ? (
                    <MaterialCommunityIcons 
                        name='camera-plus' 
                        color={colors.iconGray}
                        size={45}
                    />
                ) : <Image 
                        source={{uri: selectedImage}} 
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 60,
                        }}
                    />}
            </TouchableOpacity>
            <TextInput 
                placeholder="Type your name"
                value={displayName}
                onChangeText={setDisplayName}
                style={[styles.typeName, {borderBottomColor: colors.primary}]}
            />
            <View style={[styles.vNext, {}]} >
                <Button 
                    title='Next'
                    color={colors.secondary}
                    onPress={handlePress}
                    disabled={!displayName}
                />
            </View>
            </View>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight + 20,
        padding: 20,
    },
    title:{
        fontSize: 22,
    },
    txt:{
        fontSize: 14,
        marginTop: 20,
    },
    photoProfile:{
        marginTop: 30,
        borderRadius: 60,
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    typeName:{
        marginTop: 40,
        borderBottomWidth: 2,
        width: '100%',
    },
    vNext:{
        marginTop: 'auto',
        width: 80,
    }
})