import { getWords, initDb, insertWord } from "@/db/words";
import { translate } from "@/lib/translation/translation";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function Add() {
  const [word, setWord] = useState("slowo");
  const [result, setResult] = useState("");
  const [words, setWords] = useState<any[]>([]);

  useEffect(() => {
    initDb();
    setWords(getWords());
  }, []);

  async function handleTranslate() {
    const t = await translate(word, "pl", "en");
    setResult(t);
    insertWord(word, t, "pl", "en", new Date().toISOString());
    setWords(getWords());
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
