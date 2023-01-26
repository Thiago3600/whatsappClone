import React, {useContext, useState} from 'react'
import { View, Text, StyleSheet , Image, TextInput, Button, TouchableOpacity} from 'react-native'
import Context from "../context/Context";
import { signIn, signUp } from '../firebase';

export default function SignIn() {
    const {theme: { colors }} = useContext(Context);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mode, setMode] = useState("signUp")

    async function handlePress(){
        if(mode === "signUp"){
            await signUp(email, password)
        }
        if(mode === "signIn"){
            await signIn(email, password)
        }
    }


    return (
        <View style={[styles.container, {backgroundColor: colors.white}]} >
            <Text style={[styles.txt, {color: colors.foreground}]}>
                Welcome to whatsappclone
            </Text>
            <Image 
                source={require('../assets/welcome-img.png')} 
                style={styles.img}
                resizeMode="cover"
            />
            <View style={styles.vInput} >
                <TextInput
                    value={email}
                    onChangeText={setEmail} 
                    placeholder='email'
                    style={[styles.input, {borderBottomColor: colors.primary}]}
                />
                <TextInput
                    value={password} 
                    onChangeText={setPassword}
                    placeholder='password'
                    secureTextEntry={true}
                    style={[styles.input, {borderBottomColor: colors.primary}]}
                />
                <Button 
                    title={mode === 'signUp' ? 'Sign Up' : 'Sign in'} 
                    disabled={!password || !email}
                    color={colors.secondary} 
                    onPress={handlePress}
                />
                <TouchableOpacity 
                    style={[styles.acc, {}]}
                    onPress={ () => mode === 'signUp' ? 
                                        setMode('signIn')
                                        :
                                        setMode('signUp')
                        } 
                >
                    <Text style={[styles.newAcc, {color: colors.secondaryText}]} >
                        {mode === `signUp` ? 
                            `Already have an account? Sign in` 
                            : 
                            `Dont't have an account yet`
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt:{
        fontSize: 24,
        marginBottom: 20,
    },
    img:{
        width: 180,
        height: 180,
    },
    vInput:{
        marginTop: 20,
    },
    input:{
        marginVertical: 10,
        borderBottomWidth: 2,
        width: 200,
    },
    acc:{
        marginTop: 15,
    },
    newAcc:{

    }
})

