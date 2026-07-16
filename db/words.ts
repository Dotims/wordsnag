import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

const db = Platform.OS === "web" ? null : SQLite.openDatabaseSync("wordsnag.db");

export function getWords() {
  if (!db) return [];   
  return db.getAllSync("SELECT * FROM words ORDER BY createAt DESC");
}

export function initDb() {
    if (!db) return;
    db.execSync(`
        CREATE TABLE IF NOT EXISTS words (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT NOT NULL,
            translation TEXT NOT NULL,
            sourceLang TEXT NOT NULL,
            targetLang TEXT NOT NULL,
            createAt TEXT NOT NULL
            );
        `);
}

export function insertWord(
    word: string,
    translation: string,
    sourceLang: string,
    targetLang: string,
    createAt: string
) {
    if (!db) return;
    db.runSync(
        `INSERT INTO words (word, translation, sourceLang, targetLang, createAt) VALUES (?, ?, ?, ?, ?)`,
        [word, translation, sourceLang, targetLang, createAt]
    );
}