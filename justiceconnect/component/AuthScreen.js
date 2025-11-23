import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function AuthScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const mode = route.params?.mode || "login";

  // 👁 STATE FOR CONFIRM PASSWORD TOGGLE
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#E9F3FF" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.container}>

          {/* Back Button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>{"<"}</Text>
          </TouchableOpacity>

          {/* Logo */}
          <Image
            source={require("../assets/mainlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Title */}
          <Text style={styles.title}>
            {mode === "signup" ? "Register" : "Welcome"}
          </Text>

          {/* ========== SIGN UP SCREEN ========== */}
          {mode === "signup" && (
            <>
              <Text style={styles.label}>Username:</Text>
              <TextInput style={styles.input} />

              <Text style={styles.label}>Email:</Text>
              <TextInput style={styles.input} />

              <Text style={styles.label}>Password:</Text>
              <TextInput secureTextEntry style={styles.input} />

              <Text style={styles.label}>Confirm Password:</Text>

              {/* 🔐 Confirm Password with Eye Toggle */}
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={!showConfirmPassword}
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                />

                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Text style={styles.eyeText}>
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>SIGN UP</Text>
              </TouchableOpacity>

              <Text style={styles.orText}>OR</Text>

              <TouchableOpacity style={styles.googleBtn}>
                <Text style={styles.googleBtnText}>Continue with Google</Text>
              </TouchableOpacity>

              <Text style={styles.bottomText}>
                Already have an account?{" "}
                <Text
                  style={styles.link}
                  onPress={() => navigation.replace("Auth", { mode: "login" })}
                >
                  Sign In
                </Text>
              </Text>
            </>
          )}

          {/* ========== LOGIN SCREEN ========== */}
          {mode === "login" && (
            <>
              <Text style={styles.label}>Username:</Text>
              <TextInput style={styles.input} />

              <View style={styles.passwordRow}>
                <Text style={styles.label}>Password:</Text>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </View>

              <TextInput secureTextEntry style={styles.input} />

              <TouchableOpacity style={styles.mainButton}>
                <Text style={styles.mainButtonText}>LOGIN</Text>
              </TouchableOpacity>

              <Text style={styles.orText}>OR</Text>

              <TouchableOpacity style={styles.googleBtn}>
                <Text style={styles.googleBtnText}>Continue with Google</Text>
              </TouchableOpacity>

              <Text style={styles.bottomText}>
                Don’t have an account?{" "}
                <Text
                  style={styles.link}
                  onPress={() => navigation.replace("Auth", { mode: "signup" })}
                >
                  Sign Up
                </Text>
              </Text>
            </>
          )}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
    backgroundColor: "#E9F3FF",
  },

  container: {
    flex: 1,
    backgroundColor: "#E9F3FF",
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
  },

  backBtn: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 24,
    color: "#0B3C6C",
  },

  logo: {
    width: 115,
    height: 115,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
    color: "#0B3C6C",
  },

  label: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 4,
    color: "#444",
  },

  input: {
    backgroundColor: "#DFE3EB",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  eyeButton: {
    paddingHorizontal: 10,
  },

  eyeText: {
    fontSize: 20,
  },

  passwordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  forgotText: {
    color: "red",
    fontSize: 12,
    marginTop: 2,
  },

  mainButton: {
    backgroundColor: "#0B3C6C",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 18,
    alignItems: "center",
  },

  mainButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  orText: {
    textAlign: "center",
    marginVertical: 14,
    color: "#333",
  },

  googleBtn: {
    backgroundColor: "#0B3C6C",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  googleBtnText: {
    color: "white",
    fontWeight: "600",
  },

  bottomText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 13,
    color: "#444",
    marginBottom: 20,
  },

  link: {
    color: "#0B3C6C",
    fontWeight: "bold",
  },
});
