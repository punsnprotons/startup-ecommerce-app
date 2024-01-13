import { StyleSheet, Text, View,Pressable,TextInput,ScrollView} from 'react-native'
import { AntDesign, Feather, Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const AddAddressScreen = () => {

    const navigation = useNavigation()


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