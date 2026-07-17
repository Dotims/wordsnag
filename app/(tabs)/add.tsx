import { translate } from "@/lib/translation/translation";
import { useWordStore } from "@/store/words";
import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function Add() {
  const [word, setWord] = useState("slowo");
  const [result, setResult] = useState("");

  const words = useWordStore((s) => s.words);
  const addWord = useWordStore((s) => s.addWord);
  
  async function handleTranslate() {
    const t = await translate(word, "pl", "en");
    setResult(t);
    addWord({
      id: Date.now().toString(),
      word,
      translation: t,
      sourceLang: "pl",
      targetLang: "en",
      createAt: new Date().toISOString(),
    });
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
      <FlatList
        data={words}
        renderItem={({ item }) => (
          <View style={{ marginTop: 10 }}>
            <Text>{item.word}</Text>
            <Text>{item.translation}</Text>
          </View>
        )}
      />
    </View>
  );
}
