import { translate } from "@/lib/translation/translation";
import { useWordStore } from "@/store/words";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// hard offset, zero blur = 3D block shadow (neobrutalist) — same as Home
const blockShadow = {
  boxShadow: "5px 5px 0px #E0E3FF",
};

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
    <View className="flex-1 bg-surface">
      <ScrollView
        className="px-[20px] py-[10px]"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* header */}
        <View className="pb-6 pt-3">
          <Text className="text-sm font-medium text-muted">Capture a word</Text>
          <Text className="mt-1 text-3xl font-bold text-ink">Add new</Text>
        </View>

        {/* input card */}
        <Animated.View entering={FadeInDown.duration(450)}>
          <View
            className="rounded-3xl border border-line bg-white p-6"
            style={blockShadow}
          >
            <Text className="text-xs font-semibold uppercase tracking-widest text-muted">
              Word
            </Text>
            <TextInput
              value={word}
              onChangeText={setWord}
              placeholder="Type a word…"
              placeholderTextColor="#A1A1AA"
              autoCapitalize="none"
              className="mt-2 rounded-2xl border border-line bg-surface px-4 py-3 text-lg font-semibold text-ink"
            />

            {/* translate button (3D block, same pattern as Home) */}
            <Pressable className="mt-5" onPress={handleTranslate}>
              {({ pressed }) => (
                <View style={{ height: 56 }}>
                  <View
                    className="absolute inset-x-0 rounded-2xl bg-primary-dark"
                    style={{ bottom: 0, height: 52 }}
                  />
                  <View
                    className="absolute inset-x-0 items-center justify-center rounded-2xl bg-primary"
                    style={{ top: pressed ? 4 : 0, height: 52 }}
                  >
                    <Text className="text-base font-semibold text-white">
                      Translate
                    </Text>
                  </View>
                </View>
              )}
            </Pressable>

            {/* result — shown only after a translation */}
            {result ? (
              <View className="mt-5 rounded-2xl bg-primary-tint px-4 py-3">
                <Text className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Translation
                </Text>
                <Text className="mt-1 text-lg font-bold text-ink">{result}</Text>
              </View>
            ) : null}
          </View>
        </Animated.View>

        {/* saved words */}
        <Animated.View entering={FadeInDown.delay(90).duration(450)}>
          <Text className="mb-3 mt-7 text-xs font-semibold uppercase tracking-widest text-muted">
            Saved words · {words.length}
          </Text>

          {words.map((item) => (
            <View
              key={item.id}
              className="mb-3 flex-row items-center justify-between rounded-2xl border border-line bg-white p-4"
              style={blockShadow}
            >
              <Text className="text-base font-semibold text-ink">{item.word}</Text>
              <Text className="text-base font-medium text-muted">
                {item.translation}
              </Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
