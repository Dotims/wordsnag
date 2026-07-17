import { getWords, initDb } from "@/db/words";
import { useWordStore } from "@/store/words";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {
  const setWords = useWordStore((s) => s.setWords);

  useEffect(() => {
    initDb();
    setWords(getWords());
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
