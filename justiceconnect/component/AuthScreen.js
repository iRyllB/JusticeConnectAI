import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase/firebase";
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

export default function AuthScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const mode = route.params?.mode || "login";

  // Input fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Confirm password toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error messages per field
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Email & phone validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10,15}$/.test(phone);

  // Signup
  const handleSignup = async () => {
    let hasError = false;
    let errors = { username: "", email: "", password: "", confirmPassword: "" };

    if (!username) {
      errors.username = "Username required";
      hasError = true;
    }

    if (!email) {
      errors.email = "Email or phone required";
      hasError = true;
    } else if (!validateEmail(email) && !validatePhone(email)) {
      errors.email = "Enter valid email or phone number";
      hasError = true;
    }

    if (!password) {
      errors.password = "Password required";
      hasError = true;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      hasError = true;
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password required";
      hasError = true;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    setErrorMessage(errors);
    if (hasError) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch (err) {
      setErrorMessage({ ...errors, email: err.message });
    }
  };

  // Login
  const handleLogin = async () => {
    let errors = { username: "", email: "", password: "", confirmPassword: "" };
    let hasError = false;

    if (!username) {
      errors.username = "Username required";
      hasError = true;
    }
    if (!password) {
      errors.password = "Password required";
      hasError = true;
    }

    setErrorMessage(errors);
    if (hasError) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace("Home");
    } catch (err) {
      setErrorMessage({ ...errors, password: "Invalid username or password" });
    }
  };

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

          {/* ---------- SIGNUP ---------- */}
          {mode === "signup" && (
            <>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
              {errorMessage.username ? (
                <Text style={styles.errorText}>{errorMessage.username}</Text>
              ) : null}

              <Text style={styles.label}>Email / Phone:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
              {errorMessage.email ? (
                <Text style={styles.errorText}>{errorMessage.email}</Text>
              ) : null}

              <Text style={styles.label}>Password:</Text>
              <TextInput
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              {errorMessage.password ? (
                <Text style={styles.errorText}>{errorMessage.password}</Text>
              ) : null}

              <Text style={styles.label}>Confirm Password:</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  secureTextEntry={!showConfirmPassword}
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
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
              {errorMessage.confirmPassword ? (
                <Text style={styles.errorText}>{errorMessage.confirmPassword}</Text>
              ) : null}

              <TouchableOpacity style={styles.mainButton} onPress={handleSignup}>
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

          {/* ---------- LOGIN ---------- */}
          {mode === "login" && (
            <>
              <Text style={styles.label}>Username:</Text>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
              />
              {errorMessage.username ? (
                <Text style={styles.errorText}>{errorMessage.username}</Text>
              ) : null}

              <View style={styles.passwordRow}>
                <Text style={styles.label}>Password:</Text>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </View>

              <TextInput
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
              {errorMessage.password ? (
                <Text style={styles.errorText}>{errorMessage.password}</Text>
              ) : null}

              <TouchableOpacity style={styles.mainButton} onPress={handleLogin}>
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
  scrollContainer: { flexGrow: 1, paddingBottom: 40, backgroundColor: "#E9F3FF" },
  container: { flex: 1, backgroundColor: "#E9F3FF", paddingHorizontal: 25, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30 },
  backBtn: { marginBottom: 10 },
  backText: { fontSize: 24, color: "#0B3C6C" },
  logo: { width: 115, height: 115, alignSelf: "center", marginTop: 5, marginBottom: 10 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 18, color: "#0B3C6C" },
  label: { fontSize: 14, marginTop: 10, marginBottom: 4, color: "#444" },
  input: { backgroundColor: "#DFE3EB", borderRadius: 6, paddingVertical: 12, paddingHorizontal: 12, marginBottom: 4 },
  passwordContainer: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  eyeButton: { paddingHorizontal: 10 },
  eyeText: { fontSize: 20 },
  passwordRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  forgotText: { color: "red", fontSize: 12, marginTop: 2 },
  mainButton: { backgroundColor: "#0B3C6C", paddingVertical: 12, borderRadius: 10, marginTop: 18, alignItems: "center" },
  mainButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  orText: { textAlign: "center", marginVertical: 14, color: "#333" },
  googleBtn: { backgroundColor: "#0B3C6C", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  googleBtnText: { color: "white", fontWeight: "600" },
  bottomText: { textAlign: "center", marginTop: 16, fontSize: 13, color: "#444", marginBottom: 20 },
  link: { color: "#0B3C6C", fontWeight: "bold" },

  errorText: { color: "red", fontSize: 12, marginTop: 2 },
});
