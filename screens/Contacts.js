import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import useContacts from '../hooks/useHooks'
import Context from '../context/Context'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import {db} from '../firebase'
import ListItem from '../components/ListItem'
import {useRoute} from '@react-navigation/native'

export default function Contacts() {

    const contacts = useContacts()
    const route = useRoute()
    const image = route.params && route.params.image
    return (
        <FlatList 
            style={styles.container}
            data={contacts}
            keyExtractor={(_,i) => i}
            renderItem={(item) => {
                    //console.log(item)
                    return <ContactsPreviews contacts={item} image='supostaImagem' />
                    //return <Text>You</Text>
                }
            }
        />
    )
}

function ContactsPreviews({contacts, image}) {

    const contact = {
        contactName: contacts.contactName,
        email: contacts.email
    }
    const img = image

   

    const {rooms} = useContext(Context)
    const {user, setUser} = useState({
        ...contact,
        image: img
    })


    console.log("cotato", contact)
    console.log("img", img)
    //return <Text>{JSON.stringify(contacts)}</Text>

    useEffect(() => {
        const q = query(
            collection(db, 'users'),
            where('email', '==', contact.email)
        )
        const unsubscribe = onSnapshot(q, snapshot => {
            if(snapshot.docs.length){
                const userDoc = snapshot.docs[0].data()
                setUser((prevUser) => ({...prevUser, userDoc}))
            }
        })
        return () => unsubscribe()
    },[])
    return(
        <ListItem 
            style={{marginTop: 7}} 
            room={rooms.find(room => room.participantsArray.includes(contact.email))} 
            type='contacts' 
            user={user} 
            image={image} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    }
})
