import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserType } from '../UserContext'
import { AntDesign, Feather, Ionicons, MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons'



const ConfirmationScreen = () => {

    const steps = [
        { title: 'Address', content: 'Address Form' },
        { title: 'Delivery', content: 'Delivery Options' },
        { title: 'Payment', content: 'Payment Details' },
        { title: 'Place Order', content: 'Order Summary' }
    ];

    const [currentStep, setCurrentStep] = useState(0)
    const [addresses, setAddresses] = useState([])
    const [selectedAddress,setSelectedAddress] = useState("")
    const [option,setOption] = useState(false)
    const [selectedOption,setSelectedOption] = useState('')
    const { userId, setUserId } = useContext(UserType)

    useEffect(() => {
        fetchAddresses()
    }, [])

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/addresses/${userId}`)
            const { addresses } = response.data
            setAddresses(addresses)
        } catch (error) {
            console.log('error', error)
        }
    }

    console.log(addresses)

    return (
        <ScrollView style={{ marginTop: 55 }}>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' }}>
                    {steps?.map((step, index) => (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {index > 0 && (
                                <View style={[{ flex: 1, height: 2, backgroundColor: 'green' }, index <= currentStep && { backgroundColor: 'green' }]} />

                            )}
                            <View style={[{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }, index < currentStep && { backgroundColor: 'green' }]}>
                                {index < currentStep ? (<Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>&#10003;</Text>) : (<Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>{index + 1}</Text>)}
                            </View>
                            <Text style={{ textAlign: 'center', marginTop: 8 }}>{step.title}</Text>
                        </View>
                    ))}
                </View>
            </View>
            {currentStep == 0 && (
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600' }}>Select a delivery addresss</Text>
                    <Pressable>
                        {addresses?.map((item, index) => (
                            <Pressable style={{borderWidth:1,borderColor:'#D0D0D0', padding:10,flexDirection:'row',gap:5,paddingBottom:17,marginVertical:5,alignItems:'center',borderRadius:6}}>
                               {selectedAddress && selectedAddress._id === item?._id ? (
                                <FontAwesome5 name="dot-circle" size={24} color="#008397"/>
                               ):(
                                <Entypo onPress={()=>setSelectedAddress(item)} name="circle" size={24} color="black" />
                               )}
                                
                                <View style={{marginLeft:6}}>
                                    <Pressable>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                            <Text style={{ fontSize: 15, fontWeight: '500' }}>{item?.name}</Text>
                                            <Entypo name="location-pin" size={24} color='red' />
                                        </View>
                                        <Text style={{ fontSize: 15, color: '#181818' }}>{item?.houseNo},{item?.landmark}</Text>
                                        <Text style={{ fontSize: 15, color: '#181818' }}>{item?.street}</Text>
                                        <Text style={{ fontSize: 15, color: '#181818' }}>Karachi,Pakistan</Text>
                                        <Text style={{ fontSize: 15, color: '#181818' }}>Phone #: {item?.mobileNo}</Text>
                                        <Text style={{ fontSize: 15, color: '#181818' }}>{item?.postalCode}</Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 7 }}>
                                            <Pressable style={{ backgroundColor: 'lightgray', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, borderWidth: 0.9, borderColor: '#D0D0D0', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>Edit</Text>
                                            </Pressable>
                                            <Pressable style={{ backgroundColor: 'lightgray', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, borderWidth: 0.9, borderColor: '#D0D0D0', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>Remove</Text>
                                            </Pressable>
                                            <Pressable style={{ backgroundColor: 'lightgray', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, borderWidth: 0.9, borderColor: '#D0D0D0', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text>Set as default</Text>
                                            </Pressable>
                                        </View>
                                        {selectedAddress && selectedAddress._id === item?._id && (
                                            <Pressable onPress={()=>setCurrentStep(1)}style={{backgroundColor:'#008397',padding:10,borderRadius:20,justifyContent:'center',alignItems:'center',marginTop:10}}>
                                                <Text style={{textAlign:'center',color:'white',fontWeight:'500'}}>Deliver to this address</Text>
                                            </Pressable>
                                        )}
                                    </Pressable>
                                </View>
                            </Pressable>
                        ))}
                    </Pressable>
                </View>
            )}
            {currentStep == 1 && (
                <View style={{marginHorizontal:20}}>
                    <Text style={{fontSize:20,fontWeight:'600'}}>Choose your delivery options</Text>
                    <View style={{flexDirection:'row',alignItems:'center',padding:8,gap:7,backgroundColor:'white',borderColor:'#D0D0D0',borderWidth:1,marginTop:10}}>
                       {option ? (<FontAwesome5 name="dot-circle" color="#008397" size={24}/>):( <Entypo onPress={()=>setOption(!option)} name="circle" size={24} color="gray"/>)}
                       
                        <Text style={{flex:1}}>
                            <Text style={{color:'green',fontWeight:'500'}}>
                                Tomorrow by 10pm
                            </Text>{" "}
                            - FREE delivery with your membership
                        </Text>
                    </View>
                    <Pressable onPress={()=>setCurrentStep(2)} style={{backgroundColor:'#FFC72C', padding:10,borderRadius:20,justifyContent:'center',alignItems:'center',marginTop:15}}>
                        <Text>Continue</Text>
                    </Pressable>
                </View>
            )}
            {currentStep == 2 && (
                <View style={{marginHorizontal:20}}>
                    <Text style={{fontSize:20,fontWeight:'600'}}>Select your payment method</Text>
                    <View style={{backgroundColor:'white',padding:8,borderColor:'#D0D0D0',borderWidth:1,flexDirection:'row',alignItems:'center',gap:7,marginTop:12}}>
                        <Entypo onPress={()=>setOption(!option)} name="circle" size={20} color="gray"/>
                        <Text>Cash on Delivery</Text>
                    </View>

                    <View style={{backgroundColor:'white',padding:8,borderColor:'#D0D0D0',borderWidth:1,flexDirection:'row',alignItems:'center',gap:7,marginTop:12}}>
                        <Entypo onPress={()=>setOption(!option)} name="circle" size={20} color="gray"/>
                        <Text>Debit Card</Text>
                    </View>

                </View>
            )}
        </ScrollView>
    )
}

export default ConfirmationScreen

const styles = StyleSheet.create({})