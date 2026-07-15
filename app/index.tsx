import { translate } from "@/lib/translation/translation";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Index() {
  const [word, setWord] = useState("slowo");
  const [result, setResult] = useState("");

  async function handleTranslate() {
    const t = await translate(word, "pl", "en");
    setResult(t);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput value={word} onChangeText={setWord} />
      <Button title="translate" onPress={handleTranslate} />
      <Text style={{ marginTop: 20 }}>{result}</Text>
    </View>
  );
}
