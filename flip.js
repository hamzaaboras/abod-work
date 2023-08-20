import React, { useState, useEffect } from 'react';
import { Text, View, Button,Image, StyleSheet,TouchableOpacity } from 'react-native';

import markerImage from './assets/icons8-flip-50.png';

export default function flip(){

function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
}

return (
    <View style={styles.container}>
        <TouchableOpacity style={   {
        width:50,
        height:50,
        borderRadius:20,
        borderColor:'white',
        backgroundColor:location ? 'rgb(19, 91, 207)' : 'white',
        justifyContent:'center',
        alignItems:'center'

        }}  onPress={getLocation}>  

        <Image
        source={markerImage}
        style={styles.image}
        />

        </TouchableOpacity> 
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        top:50,
        flexDirection:'row',
        margin:20
    },


    image:{
        width:40,
        height:40,
        resizeMode:'contain'
    },

    locationInfo: {
        marginTop: 20,
        alignItems: 'center',
        
    },
    
    text:{
        color:'white',
        fontWeight:'600',
        transform: [{ translateY: -20 }],
        
    }
});
