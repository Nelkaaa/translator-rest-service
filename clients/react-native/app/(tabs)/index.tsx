import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  const [inputText, setInputText] = useState("");
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const translate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setTranslation("");
    setError("");

    try {
      const credentials = btoa("noha:noha123!");

      const response = await fetch(
        "http://localhost:8080/translator-rest-service/api/translator/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + credentials,
          },
          body: JSON.stringify({
            text: inputText,
            targetLanguage: "Moroccan Arabic Darija",
          }),
        }
      );

      const data = await response.json();
      if (data.translation) {
        setTranslation(data.translation);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Darija Translator</Text>
      <Text style={styles.subtitle}>English → Moroccan Arabic</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter English text..."
        value={inputText}
        onChangeText={setInputText}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={translate}>
        <Text style={styles.buttonText}>Translate</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />}

      {translation !== "" && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Translation:</Text>
          <Text style={styles.resultText}>{translation}</Text>
        </View>
      )}

      {error !== "" && (
        <Text style={styles.error}>Error: {error}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultBox: {
    marginTop: 24,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
  },
  resultLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 22,
    color: "#333",
    textAlign: "right",
  },
  error: {
    marginTop: 16,
    color: "red",
    fontSize: 14,
  },
});
