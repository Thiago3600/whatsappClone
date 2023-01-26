import React, {useContext}from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import GlobalContext from '../context/Context'
import {Grid, Row, Col} from 'react-native-easy-grid'
import Avatar from './Avatar'

export default function ListItem({
        style, 
        type, 
        description, 
        user, 
        time, 
        room, 
        image
    }) {

    const navigation = useNavigation()
    const {theme: { colors }} = useContext(GlobalContext)

    console.log(user)

    return (
        <TouchableOpacity 
            style={[styles.container, {...style}]}
            onPress={() => navigation.navigate('chat', {user, room, image})}
        >
            <Grid
                style={[styles.grid]}
            >
                <Col style={[styles.col]} >
                    <Avatar 
                        user={user} 
                        size={type === 'contacts' ? 40 : 65} 
                    />
                    <Col style={{marginLeft: 10}}>
                        <Row style={{alignItems: 'center'}}>
                            <Col>
                                <Text>{user?.contactName || user?.displayName || user?.firstName || user?.lastName || 'unknown'}</Text>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </Grid>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 80, 
    },
    grid:{
        maxHeight: 80
    },
    col:{
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
