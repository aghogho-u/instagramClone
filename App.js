import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,  TextInput, TouchableHighlight } from 'react-native';
import { f, db, auth } from './config/config';


export default function App() {

  const [email, setEmail ] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
  f.auth().onAuthStateChanged((user)=>{
    if(user){
      setLoggedIn(true);
      console.log('logged in', user)
    }else{
      setLoggedIn(false);
      console.log('logged out')
    }
  })
    //registerUser('uu@test.com', 'fak3P@ssword')
  },[])


function   registerUser(email, password){
    auth.createUserWithEmailAndPassword(email, password)
    .then((user)=>console.log(user))
    .catch((e)=>
      console.log(e)
    )
  }

 function signUserOut(){
  auth.signOut()
  .then(console.log('User signed out now'))
  .catch(e => console.log('Something went wrong when signing out'))
}

  async function loginWithEmail(email, password){
      if(email != "" && password != ""){
        try{ let user = await auth.signInWithEmailAndPassword(email,password);
          console.log(user)
        }catch(e){console.log(e)}

      }else alert("Input required")
  }

  return (
    <View style={styles.container}>
      <Text>Testing the microphone. Open up App.js to start working on your app!</Text>
      <Text>______________</Text>
      { loggedIn == true ?  (
        <View>
        <TouchableHighlight onPress={()=>signUserOut()}>
          <Text>Log out</Text>
        </TouchableHighlight>
        </View>) : (
          <View>
            <Text>Email: </Text>
            <TextInput value={email} onChangeText={text=> setEmail(text)} ></TextInput>

            <Text>Password: </Text>
            <TextInput secureTextEntry={true} value={password} onChangeText={text=> setPassword(text)} ></TextInput>

          <TouchableHighlight
            onPress={()=>loginWithEmail(email, password)} >
            <Text>Login with Email</Text>
          </TouchableHighlight>
          </View>
        )

      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
