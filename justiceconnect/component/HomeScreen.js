// component/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook

export default function HomeScreen() {
  // Initialize navigation object
  const navigation = useNavigation();

  const handleGetStarted = () => {
    // Navigate to the screen named 'LoginSignup' defined in App.js
    navigation.navigate('LoginSignup');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/mainlogo.png')} // your logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>JUSTICE</Text>
      <Text style={styles.subtitle}>CONNECT</Text>
      <Text style={styles.description}>
        Your smart link to justice.{"\n"}“Smart answers. Stronger decisions.”
      </Text>

      {/* Attach the navigation handler to the button */}
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // (Your existing styles here remain unchanged)
  container: {
    flex:1,
    backgroundColor: '#EAF0FA',
    justifyContent:'center',
    alignItems:'center',
    padding:20
  },
  logo:{
    width:150,
    height:150,
    marginBottom:20
  },
  title:{
    fontSize:32,
    fontWeight:'bold',
    color:'#FEC12D'
  },
  subtitle:{
    fontSize:32,
    fontWeight:'bold',
    color:'#00275B'
  },
  description:{
    textAlign:'center',
    fontSize:16,
    color:'#333',
    marginVertical:20
  },
  button:{
    backgroundColor:'#00275B',
    paddingVertical:12,
    paddingHorizontal:30,
    borderRadius:10
  },
  buttonText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  }
});