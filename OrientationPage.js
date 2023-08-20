import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

export default function OrientationPage() {
const [orientationData, setOrientationData] = useState({ x: 0, y: 0, z: 0 });

const updateOrientation = (DeviceMotionMeasurement) => {

    setOrientationData({
        x: DeviceMotionMeasurement.rotation.alpha.toFixed(2),
        y: DeviceMotionMeasurement.rotation.beta.toFixed(2),
        z: DeviceMotionMeasurement.rotation.gamma.toFixed(2),
    });
};

useEffect(() => {

    const subscription = DeviceMotion.addListener(updateOrientation);

    // Set the update interval to 500 ms
    DeviceMotion.setUpdateInterval(500);

    return () => {
    subscription.remove();
    };
}, []);

return (
    <View style={styles.container}>
      <Text style={styles.text}>X: {orientationData.x}</Text>
      <Text style={styles.text}>Y: {orientationData.y}</Text>
      <Text style={styles.text}>Z: {orientationData.z}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    position:'absolute',
    top:'15%',
    left:'20%',
    flexDirection:'row',
    
    

},
text:{
    marginLeft:20,
    color:'white',
    fontWeight:'bold',
    fontSize:18
    
}
});
