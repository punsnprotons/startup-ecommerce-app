import { StyleSheet, Text, View,Pressable,TextInput,ScrollView} from 'react-native'
import { AntDesign, Feather, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import React,{useState,useEffect,useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { UserType } from '../UserContext'


const AddAddressScreen = () => {

    const navigation = useNavigation()
    const [addresses,setAddresses] = useState([])
    const {userId,setUserId} = useContext(UserType)

    useEffect(()=>{
        fetchAddresses()
    },[])

    const fetchAddresses = async ()=> {
        try{
            const response = await axios.get(`http://localhost:8000/addresses/${userId}`)
            const {addresses} = response.data
            setAddresses(addresses)
        }catch(error){
            console.log('error',error)
        }
    }
    console.log("addresses",addresses)
    return (
        <ScrollView showsVerticalScrollIndivator={false} style={{ marginTop: 50 }}>
            <View style={styles.searchheader}>
                <Pressable style={styles.searchbar}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={24} color="black" />
                    <TextInput placeholder="Search store..." />
                </Pressable>
                <Feather name="mic" size={24} color="black" />
            </View>
            <View style={{padding:10}}>
                <Text style={{fontSize:20,fontWeight:'600'}}>Your Addresses</Text>
                <Pressable onPress={()=> navigation.navigate('Add')}style={{flexDirection:'row' , alignItems:'center', justifyContent:'space-between',marginTop:10,borderColor:'#D0D0D0',borderWidth:1,borderLeftWidth:0,borderRightWidth:0,paddingVertical:7,paddingHorizontal:5}}>
                    <Text>Add a new address</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="black"/>
                </Pressable>

                <Pressable>
                    {/*all the added addresses*/}
                    {addresses?.map((item,index)=> (
                        <Pressable style={{borderWidth:1,borderColor:'#D0D0D0',padding:10,flexDirection:'column',gap:5,marginVertical:10}}>
                            <View style={{flexDirection:'row',alignItems:'center',gap:3}}>
                                <Text style={{fontSize:15,fontWeight:'500'}}>{item?.name}</Text>
                                <Entypo name="location-pin" size={24} color='red'/>
                            </View>
                            <Text style={{fontSize:15,color:'#181818'}}>{item?.houseNo},{item?.landmark}</Text>
                            <Text style={{fontSize:15,color:'#181818'}}>{item?.street}</Text>
                            <Text style={{fontSize:15,color:'#181818'}}>Karachi,Pakistan</Text>
                            <Text style={{fontSize:15,color:'#181818'}}>Phone #: {item?.mobileNo}</Text>
                            <Text style={{fontSize:15,color:'#181818'}}>{item?.postalCode}</Text>

                            <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:7}}>
                                <Pressable style={{backgroundColor:'lightgray',paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:'#D0D0D0',justifyContent:'center',alignItems:'center'}}>
                                    <Text>Edit</Text>
                                </Pressable>
                                <Pressable style={{backgroundColor:'lightgray',paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:'#D0D0D0',justifyContent:'center',alignItems:'center'}}>
                                    <Text>Remove</Text>
                                </Pressable>
                                <Pressable style={{backgroundColor:'lightgray',paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:'#D0D0D0',justifyContent:'center',alignItems:'center'}}>
                                    <Text>Set as default</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </Pressable>
            </View>

        </ScrollView>
    )
}

export default AddAddressScreen

const styles = StyleSheet.create({
    searchheader: { backgroundColor: '#00CED1', padding: 10, flexDirection: 'row', alignItems: 'center' },
    searchbar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 7, gap: 10, backgroundColor: 'white', borderRadius: 3, height: 38, flex: 1 },
})