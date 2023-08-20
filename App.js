import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect, } from 'react';
import * as Permissions from 'expo-permissions';
import { StyleSheet, Text, TouchableOpacity, View ,Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import LocationComponent from './LocationComponent';
import markerImage from './assets/icons8-flip-50.png';
import OrientationPage from './OrientationPage';



export default function App() {
  const [cameraRef, setCameraRef] = useState(null);
  const[flag,setFlag]=useState(false);
  const [type, setType] = useState(CameraType.back);

  useEffect(() => {
    // Request audio recording permission when the component mounts
    const askForPermissions = async () => {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING, Permissions.MEDIA_LIBRARY,);
      if (status !== 'granted') {
        console.error('Audio recording permission not granted!');
      }
    };

    askForPermissions();
  }, []);




  const handleRecord = async () => {
    if (cameraRef) {
      console.log("Starting recording...");
      if (flag) {
        setFlag(false);
        console.log("Stopping recording...");
        cameraRef.stopRecording();
        
      } else {
        console.log("Initiating recording...");
        try {
          setFlag(true);
          const { uri } = await cameraRef.recordAsync();
          console.log("Recorded video URI:", uri);
          saveVideo(uri);
        } catch (error) {
          console.error("Error recording video:", error);
        }
      }
    
    }
  };
  


  const saveVideo = async (localUri) => {
    if (localUri) {
      try {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('.')[0].replace(/[-:T]/g, '');
        const newFilename = `Video_${formattedDate}.mp4`;
  
        // Move the video to a new path with the desired filename
        const newVideoUri = `${FileSystem.documentDirectory}${newFilename}`;
        await FileSystem.moveAsync({
          from: localUri,
          to: newVideoUri,
        });
  
        // Save the new video URI to the media library
        const asset = await MediaLibrary.createAssetAsync(newVideoUri);
  
        console.log("Video saved with new filename:", asset);
      } catch (error) {
        console.error("Error saving video:", error);
      }
    } else {
      console.log("No localUri provided for saving.");
    }
  };
  
  
  function toggleCameraType() {
    console.log(type);
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    console.log(type);
  }
  return (
    <View style={styles.container}>

      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => setCameraRef(ref)}
        />



      <TouchableOpacity
        onPress={handleRecord}
        style={ 
          { 
            position: 'absolute',
            width: 100,
            top:'80%',
            left:'40%',
            height:100,
            borderRadius:100,           
            backgroundColor: flag ? 'rgb(53, 126, 242)' : 'rgba(247,247,247, 0.5)',
            borderColor:'white',
            borderWidth:2,
          }
          
        }
      >
      </TouchableOpacity>





        
      <View style={styles.container1}>
        <TouchableOpacity onPress={toggleCameraType}
        style={   
          {
            width:50,
            height:50,
            borderRadius:20,
            borderColor:'white',
            backgroundColor:type=="front" ? 'rgb(53, 126, 242)' : 'white',
            justifyContent:'center',
            alignItems:'center'
          }}>  

        <Image
        source={markerImage}
        style={styles.image}
        />



        </TouchableOpacity> 
        </View>
      
      <LocationComponent />
      
      <OrientationPage />





    </View>

    
  );


  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

  },
  camera: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignContent:'flex-end',
  },
  
  container1: {
    position:'absolute',
    top:50,

    flexDirection:'row',
    margin:20,
    left:'79%',
},


image:{
    width:40,
    height:40,
    resizeMode:'contain'
},


});