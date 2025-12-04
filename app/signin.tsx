import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter email and password");
      return;
    }
    // TODO: authenticate
    router.replace("/inventory"); // navigate to inventory after sign in
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f9fafb" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  input: { width: "100%", padding: 12, borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, marginBottom: 12 },
  button: { backgroundColor: "#4f46e5", padding: 14, borderRadius: 12, width: "100%", alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
});
