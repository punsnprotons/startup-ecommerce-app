import { StyleSheet, Text, View, ScrollView, TextInput,Pressable } from 'react-native'
import React,{useState,useEffect,useContext} from 'react'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import axios from 'axios'
import jwt_decode from 'jwt-decode';


const AddressScreen = () => {

    const navigation = useNavigation()
    const [name,setName] = useState('')
    const [mobileNo,setMobileNo] = useState('')
    const [houseNo,setHouseNo] = useState('')
    const [street,setStreet] = useState('')
    const [landmark,setLandmark] = useState('')
    const [postalCode,setPostalCode] = useState('')
    const {userId,setUserId} = useContext(UserType)

    useEffect(() => {
        const fetchUser = async() => {
            
            const token = await AsyncStorage.getItem("authToken");
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId; 
            setUserId(userId); 
          
        };
    
        fetchUser();
    }, []);
    
    console.log(userId)

    const handleAddAddress=()=>{
        const address={
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode
        }
        axios.post('http://localhost:8000/addresses',{userId,address}).then((response)=>{
            Alert.alert("Success","Address added successfully")
            setName('')
            setMobileNo('')
            setStreet('')
            setLandmark('')
            setPostalCode('')

            setTimeout(()=>{
                navigation.goBack()

            },500)

        }).catch((error)=>{
            console.log("error",error)
            Alert.alert('Error','Failed to add address')
        })

    }

    return (
        <ScrollView style={{ marginTop: 50 }}>
            <View style={{ height: 50, backgroundColor: '#00CED1' }} />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}> Add a new address </Text>

                <TextInput placeholderTextColor={'gray'} placeholder='Pakistan' style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
            </View>

            <View style={{ padding: 10,marginVertical:0}}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Full name </Text>

                <TextInput value={name} onChangeText={(text)=>setName(text)} placeholderTextColor={'gray'} placeholder='Enter full name...' style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
            </View>

            <View style={{ padding: 10,marginVertical:0}}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Mobile # </Text>

                <TextInput value={mobileNo} onChangeText={(text)=>setMobileNo(text)} placeholderTextColor={'gray'} placeholder='Enter mobile #...' style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
            </View>

            <View style={{ padding: 10,marginVertical:0}}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Address line 1 </Text>

                <TextInput value={houseNo} onChangeText={(text)=>setHouseNo(text)} placeholderTextColor={'gray'} placeholder='Flat no. , House #, Building #, Street' style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
            </View>

            <View style={{ padding: 10,marginVertical:0}}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}> Address line 2 </Text>

                <TextInput value={street} onChangeText={(text)=>setStreet(text)} placeholderTextColor={'gray'} placeholder='Area name ,Sector,City' style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
            </View>


            <View style={{ padding: 10,marginVertical:0}}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Landmark </Text>

                <TextInput value={landmark} onChangeText={(text)=>setLandmark(text)} placeholderTextColor={'gray'} placeholder='Enter nearby landmark' style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
            </View>

            <View style={{ padding: 10,marginVertical:0}}>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Postal code </Text>

                <TextInput value={postalCode} onChangeText={(text)=>setPostalCode(text)} placeholderTextColor={'gray'} placeholder='Enter postalcode #' style={{ padding: 10, borderColor: '#D0D0D0', borderWidth: 1, marginTop: 10, borderRadius: 5 }} />
            </View>
            
            <Pressable onPress={handleAddAddress} style={{backgroundColor:'#FFC72C', padding:10,borderRadius:6, justifyContent:'center',alignItems:'center',marginHorizontal:10,marginTop:20,}}>
                <Text style={{fontWeight:'500'}}>Add address</Text>
            </Pressable>


        </ScrollView>
    )
}

export default AddressScreen

const styles = StyleSheet.create({})