import React from "react";
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
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

              <Text style={styles.label}>Phone Number:</Text>
              <TextInput style={styles.input} />

              <Text style={styles.label}>Password:</Text>
              <TextInput secureTextEntry style={styles.input} />

              <Text style={styles.label}>Confirm Password:</Text>
              <TextInput secureTextEntry style={styles.input} />

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
    paddingBottom: 40, // so content doesn’t get cut
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
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#0B3C6C",
  },

  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
    color: "#444",
  },

  input: {
    backgroundColor: "#DFE3EB",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 12,
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
    marginTop: 18,
    fontSize: 13,
    color: "#444",
    marginBottom: 20,
  },

  link: {
    color: "#0B3C6C",
    fontWeight: "bold",
  },
});
