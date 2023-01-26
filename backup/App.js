import { StyleSheet, Text, View, LogBox } from 'react-native';
import {useAssets} from 'expo-asset'
import React, {useState, useEffect, useContext} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from './firebase'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import SignIn from './screens/SignIn'
import ContextWrapper from "./context/ContextWrapper";
import Context from "./context/Context";
import Profile from './screens/Profile'
import Chats from './screens/Chats'
import Photo from './screens/Photo'
import {Ionicons} from '@expo/vector-icons'
import Contacts from './screens/Contacts'

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
])

const Stack = createStackNavigator()
const Tab = createMaterialTopTabNavigator()

function App() {

  const [currUser, setCurrUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const {theme: { colors }} = useContext(Context)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setLoading(false);
      if(user) {
        setCurrUser(user);
      }
    })
    return () => unsubscribe()
  },[])

  if(loading){
    return (
      <View style={styles.container}>
        <Text>Loading..</Text>
      </View>
    )
  }

  return (
    <NavigationContainer  >
      {!currUser ? (
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="SignIn" component={SignIn} />
          {/* <Stack.Screen name="Profile" component={Profile} /> */}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: colors.foreground,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTintColor: colors.white
        }} >
        {!currUser.displayName && 
          (<Stack.Screen 
              name="Profile" 
              component={Profile}
              options={{headerShown: false}} 
            />
          )
        }
        <Stack.Screen 
              name="Home" 
              component={Home}
              options={{title: `whatsappClone`}} 
            />
        <Stack.Screen 
              name="contacts" 
              component={Contacts}
              options={{title: `Select Contacts`}} 
            />
        </Stack.Navigator>
      )}
      {/* <Text>{JSON.stringify(currUser)}</Text> */}
    </NavigationContainer>
  );
}

function Home(){

  const {theme: { colors }} = useContext(Context)

  return (
    <Tab.Navigator screenOptions={({route}) => {
      return{
        tabBarLabel: () => {
          if(route.name === 'photo'){
            return <Ionicons name='camera' size={20} color={colors.white} />
          }else{
            return <Text style={{color: colors.white}} >{route.name.toLocaleUpperCase()}</Text>
          }
        },
        tabBarShowIcon: true,
        tabBarLabelStyle: {
          color: colors.white,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.white,
        },
        tabBarStyle: {
          backgroundColor: colors.foreground
        }
      }
    }} 
      initialRouteName='chats'
    >
      <Tab.Screen name='photo' component={Photo} />
      <Tab.Screen name='chats' component={Chats} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Main() {
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome-img.png"),
  )

  if(!assets){
    return <Text>Loading..</Text>
  }
  return (
    <ContextWrapper  >
      <App />
    </ContextWrapper>
  )    
}
