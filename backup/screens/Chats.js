import React, {useContext, useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {collection, query, where, onSnapshot} from '@firebase/firestore'
import {db, auth} from '../firebase'
import GlobalContext from '../context/Context'
import ContactsFloatingIcon from '../components/ContactsFloatingIcon'

export default function Chats() {

    const {currentUser} = auth
    const {rooms, setRooms} = useContext(GlobalContext)

    const chatQuery = query(
        collection(db, 'rooms'), 
        where('participantsArray', 'array-contains', currentUser.email)
    )

    useEffect(() => {
        const unsubscribe = onSnapshot(chatQuery, (querySnapshot) =>{
            const parsedChats = querySnapshot.docs.filter(doc => 
                doc.data().lastMessage
            ).map(doc => ({
                ...doc.data(),
                id: doc.id,
                userB: doc.data().participants.find(p => p.email !== currentUser.email),
            }))
            setRooms(parsedChats)
        })
        return () => unsubscribe()
    }, [])
    return (
        <View style={styles.container} >
            <Text>Chats</Text>
            <ContactsFloatingIcon />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        paddingRight: 10
    }
})