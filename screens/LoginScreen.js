import { StyleSheet, Text, View,SafeAreaView,Image, KeyboardAvoidingView,TextInput, Pressable,Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import { MaterialIcons, Entypo} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const LoginScreen = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigation = useNavigation()

    useEffect(()=>{
        const checkLoginStatus = async () =>{
            try{
                const token = await AsyncStorage.getItem("authToken")
                if(token){
                    navigation.replace("Main")
                }

            }catch(error){
                console.log("Error message",error)
            }
        }
        checkLoginStatus()
    },[])

    

    const handleLogin = () =>{
        const user ={
            email:email,
            password:password,
        }
        axios.post('http://localhost:8000/login',user).then((response)=>{
            console.log(response)
            const token = response.data.token 
            AsyncStorage.setItem("authToken",token)
            navigation.replace("Main")

        }).catch((error)=>{
            Alert.alert("Login error","Invalid credentials")
            console.log(error)
        })

    }



  return (
    <SafeAreaView style={styles.container}>
      <Image style={{width:150,height:100}}/>
      <KeyboardAvoidingView>
        <View style={{alignItems:'center'}}>
            <Text style={styles.login}>Login</Text>
        </View>
        <View style={{marginTop:70}}>
            <View style={styles.loginbox}>
                <MaterialIcons name="email" size={24} color="gray" style={{marginLeft:8}}/>
                <TextInput 
                    style={styles.textinput} 
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={(text)=>setEmail(text)}
                    autoCapitalize='none'
                    autoComplete='off'
                />
            </View>
        </View>
        <View style={{marginTop:10}}>
            <View style={styles.loginbox}>
                <Entypo name="lock" size={24} color="gray" style={{marginLeft:8}}/>
                <TextInput 
                    style={styles.textinput} 
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={(text)=>setPassword(text)}
                    secureTextEntry
                    autoCapitalize='none'
                    autoComplete='off'
                />
            </View>
        </View>

        <View style={styles.bottomContainer}>
            <Text>Keep me logged in </Text>
            <Text style={styles.forgotpass}>Forgot password</Text>
        </View>
        <View style={{marginTop:80}}/>

        <Pressable onPress={handleLogin} style={styles.loginbutton}>
            <Text style={{textAlign:'center',color:'white',fontSize:16,fontWeight:'bold'}}>Login</Text>
        </Pressable>

        <Pressable onPress={()=> navigation.navigate('Register')}style={{marginTop:15}}>
            <Text style={{textAlign:'center',color:'gray',fontSize:16}}>Don't have an account? Sign up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'white',
        alignItems:'center',
        marginTop:50,
    },
    loginbox:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        backgroundColor:'#D0D0D0',
        paddingVertical:5,
        borderRadius:5,
        marginTop:30,
    },
    textinput:{
        color:'gray',
        marginVertical:10,
        width:300,
    },
    login:{
        fontSize:17,
        fontWeight:'bold',
        marginTop:12,
        color:'#041E42'
    },
    bottomContainer:{
        marginTop:12,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    forgotpass:{
        color:'#007FFF',
        fontWeight:'500',

    },
    loginbutton:{
        width:200,
        backgroundColor:'#FEBE10',
        borderRadius:6,
        marginLeft:'auto',
        marginRight:'auto', 
        padding:15,
    }
    
})