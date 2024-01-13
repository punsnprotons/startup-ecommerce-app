import { StyleSheet, Text, View,ScrollView,Pressable,TextInput,Image } from 'react-native'
import React from 'react'
import { AntDesign, Feather, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import {useSelector} from 'react-redux'

const CartScreen = () => {

    const cart = useSelector((state)=>state.cart.cart)
    const total = cart.map((item)=>item.price * item.quantity).reduce((curr,prev)=>curr + prev,0)
    console.log(total)
    
    

    return (
        <ScrollView style={{marginTop:55,flex:1,backgroundColor:'white'}}>
            <View style={styles.searchheader}>
                <Pressable style={styles.searchbar}>
                    <AntDesign style={{ paddingLeft: 10 }} name="search1" size={24} color="black" />
                    <TextInput placeholder="Search store..." />
                </Pressable>
                <Feather name="mic" size={24} color="black" />
            </View>

            <View style={{padding:10,flexDirection:'row',alignItems:'center'}}>
                <Text style={{fontSize:18,fontWeight:'400'}}>Subtotal: </Text>
                <Text style={{fontSize:18,fontWeight:'500'}}>Total : PKR {total}</Text>
            </View>
            <Pressable style={{backgroundColor:'#FFC72C',padding:10,borderRadius:5,justifyContent:'center',alignItems:'center',marginHorizontal:10,marginTop:10}}>
                <Text>Proceed to Buy ({cart.length}) items</Text>
            </Pressable>
            <Text style={{height:1,borderColor:'#D0D0D0',borderWidth:1,marginTop:16}}/>
            
            <View style={{marginHorizontal:10,marginTop:10}}>
                {cart?.map((item,index)=>(
                    <View key={index} style={{backgroundColor:'white',marginVertical:10,borderBottomColor:'#F0F0F0',borderWidth:2,borderLeftWidth:0,borderTopWidth:0,borderRightWidth:0}}>
                        <Pressable style={{marginVertical:10,flexDirection:'row',justifyContent:'space-between'}}>
                            <View>
                                <Image style={{width:100,height:100,resizeMode:'contain'}}source={{uri: item?.image}}/>
                            </View>
                            <View style={{marginLeft:10}}>
                                <Text numberOfLines={2} style={{width:150,marginTop:10}}>{item?.title}</Text>
                                <Text style={{fontSize:20,fontWeight:'600',marginTop:7}}>{item?.price}</Text>
                                <Image style={{width:30,height:30,resizeMode:'contain'}} source={{uri:'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png'}}/>
                                <Text style={{color:'green'}}>In stock</Text>
                                <Text style={{fontWeight:'500',marginTop:6}}>{item?.rating?.rate} ratings</Text>
                            </View>
                        </Pressable>

                        <Pressable style={{marginTop:15,marginBottom:10,flexDirection:'row',alignItems:'center',gap:10}}>
                            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:7}}>
                                <Pressable style={{backgroundColor:'#D8D8D8', padding:7,borderTopLeftRadius:6, borderBottomLeftRadius:6}}>
                                    <AntDesign name="delete" size={24} color="black"/>
                                </Pressable>
                                <Pressable style={{backgroundColor:'white',paddingHorizontal:18,paddingVertical:6}}>
                                    <Text>{item?.quantity}</Text>
                                </Pressable>
                                <Pressable style={{backgroundColor:'#D8D8D8', padding:7,borderTopLeftRadius:6, borderBottomLeftRadius:6}}>
                                    <Feather name="plus" size={24} color="black" style/>
                                </Pressable>
                            </View>
                            <Pressable style={{backgroundColor:'white',paddingHorizontal:8,paddingVertical:10,borderRadius:5,borderColor:'#C0C0C0',borderWidth:0.6}}>
                                <Text>Delete</Text>
                            </Pressable>
                        </Pressable>
                        <Pressable style={{flexDirection:'row',alignItem:'center',gap:10,marginBottom:10}}>
                            <Pressable  style={{backgroundColor:'white',paddingHorizontal:8,paddingVertical:10,borderRadius:5,borderColor:'#C0C0C0',borderWidth:0.6}}>
                                <Text>Save for later</Text>
                            </Pressable>

                            <Pressable  style={{backgroundColor:'white',paddingHorizontal:8,paddingVertical:10,borderRadius:5,borderColor:'#C0C0C0',borderWidth:0.6}}>
                                <Text>See more </Text>
                            </Pressable>
                        </Pressable>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    searchheader: { backgroundColor: '#00CED1', padding: 10, flexDirection: 'row', alignItems: 'center' },
    searchbar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 7, gap: 10, backgroundColor: 'white', borderRadius: 3, height: 38, flex: 1 },
})