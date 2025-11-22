// component/loginscreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function LoginSignupScreen() {
  return (
    <View style={styles.outerContainer}>
      {/* Use a background color or image to mimic your drawable */}
      <View style={styles.backgroundContainer}>
        <Text style={styles.header}>Ready to Connect?</Text>///////NOT FINAL

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Matches the vector fill color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundContainer: {
    width: 362, // Matches the inner rectangle width in XML
    height: 834, // Matches the inner rectangle height in XML
    borderRadius: 40, // Matches the corner radius from the clip-path
    backgroundColor: '#F0F8FF', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    shadowColor: '#000', // Optional: subtle shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Android shadow
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00275B',
    marginBottom: 50,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#FEC12D',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00275B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#00275B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButtonText: {
    color: '#00275B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
