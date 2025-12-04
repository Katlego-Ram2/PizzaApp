import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SignInLanding() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/auth/SignIn"); // Navigate to your actual SignIn screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍕 Pizza Pantry</Text>
      <Text style={styles.subtitle}>
        Track stock, manage ingredients, and keep the kitchen running smoothly.
      </Text>

      <TouchableOpacity style={styles.signInBtn} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 40,
    textAlign: "center",
  },
  signInBtn: {
    backgroundColor: "#4f46e5",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  signInText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
