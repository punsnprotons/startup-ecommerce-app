import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React,{useState} from 'react'
import { addToCart } from '../redux/CartReducer'
import { useDispatch } from 'react-redux'



const ProductItem = ({ item,index }) => {

    const [addedToCart,setAddedToCart] = useState(false)

    const dispatch = useDispatch()
    const addItemToCart = (item) => {
        setAddedToCart(true)
        dispatch(addToCart(item))
        setTimeout(() => {
            setAddedToCart(false)
        }, 10000)
    }
    return (
        <Pressable key={index} style={{ marginHorizontal: 20,marginVertical:25 }}>
            <Image style={{ width: 150, height: 150, resizeMode: 'contain' }} source={{ uri: item?.image }} />
            <Text numberOfLines={1} style={{width:150,marginTop:10}}>{item?.title}</Text>
            <View style={{marginTop:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between',}}>
                <Text style={{fontSize:15,fontWeight:'bold'}}> PKR {item?.price}</Text>
                <Text style={{color:'#FFC72C',fontWeight:'500'}}>{item?.rating.rate} ratings</Text>
            </View>
            <Pressable onPress={()=>addItemToCart(item)}style={{backgroundColor:'#FFC72C', padding:10,borderRadius:20,justifyContent:'center',alignItems:'center',marginHorizontal:10,marginTop:10}}>
            {addedToCart ? (
                    <View>
                        <Text>Added to Cart</Text>
                    </View>
                ) : (
                    <Text>Add to Cart</Text>
                )}

            </Pressable>
        </Pressable>
    )
}

export default ProductItem

const styles = StyleSheet.create({})