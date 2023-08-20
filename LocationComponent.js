import React, { useState, useEffect } from 'react';
import { Text, View, Button,Image, StyleSheet,TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import markerImage from './assets/icons8-location-50.png';

export default function LocationComponent() {

const [location, setLocation] = useState(null);

const getLocation = async () => {
    if(location){
        setLocation(null);
        return;
    }
    try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
    }
    } catch (error) {
    console.error("Error fetching location:", error);
    }
};



return (
    <View style={styles.container}>
    <TouchableOpacity style={   {
        width:50,
        height:50,
        borderRadius:20,
        borderColor:'white',
        backgroundColor:location ? 'rgb(53, 126, 242)' : 'white',
        justifyContent:'center',
        alignItems:'center'

    }}  onPress={getLocation}>  
    <Image
        source={markerImage}
        style={styles.image}
    />
    </TouchableOpacity> 
    {location && (
        <View style={styles.locationInfo}>
            <Text style={styles.text}>Latitude: {location.latitude}</Text>
            <Text style={styles.text}>Longitude: {location.longitude}</Text>
            <Text style={styles.text}>Altitude: {location.altitude || 'N/A'}</Text>
        </View>
    )}
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
