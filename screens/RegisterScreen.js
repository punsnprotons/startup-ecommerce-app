import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable,Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const LoginScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    const handleRegister = () => {
        const user = {
            name: name,
            email: email,
            password: password,
        }

        // send a post request to the back end 
        axios.post('http://localhost:8000/register', user).then((response) => {
            console.log(response);
            Alert.alert("Registration succesful", "You have registered successfully")
            setName('')
            setEmail('')
            setPassword('')

        }).catch((error)=>{
            Alert.alert('Registration Error',"An error occured during registration")
            console.log("Registration failed",error)
        })

    }



    return (
        <SafeAreaView style={styles.container}>
            <Image style={{ width: 150, height: 100 }} />
            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.login}>Register</Text>
                </View>
                <View style={{ marginTop: 70 }}>
                    <View style={styles.loginbox}>
                        <FontAwesome5 name="user-alt" size={24} color="gray" style={{ marginLeft: 8 }} />
                        <TextInput
                            style={styles.textinput}
                            placeholder="Enter your name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.loginbox}>
                        <MaterialIcons name="email" size={24} color="gray" style={{ marginLeft: 8 }} />
                        <TextInput
                            style={styles.textinput}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            autoCapitalize='none'
                            autoComplete='off'
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <View style={styles.loginbox}>
                        <Entypo name="lock" size={24} color="gray" style={{ marginLeft: 8 }} />
                        <TextInput
                            style={styles.textinput}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
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
                <View style={{ marginTop: 80 }} />

                <Pressable onPress={handleRegister} style={styles.registerbuttonstyle}>
                    <Text style={styles.registertext}>Register</Text>
                </Pressable>

                <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }}>
                    <Text style={{ textAlign: 'center', color: 'gray', fontSize: 16 }}>Already have an account? Sign in</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    loginbox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#D0D0D0',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
    },
    textinput: {
        color: 'gray',
        marginVertical: 10,
        width: 300,
    },
    login: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 12,
        color: '#041E42'
    },
    bottomContainer: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    forgotpass: {
        color: '#007FFF',
        fontWeight: '500',

    },
    registerbuttonstyle: {
        width: 200,
        backgroundColor: '#FEBE10',
        borderRadius: 6,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 15,
    },
    registertext: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }

})