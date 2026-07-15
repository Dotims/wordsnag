# WordSnag
Mobile app for readers. Hit a word you don't know in a book, snag it in a couple
seconds, get the translation, and it comes back later on a spaced-repetition
schedule so it actually sticks.

- Capture a word (type it or point the camera at it), instant translation
- Auto-tagged: part of speech, topic, difficulty
- Spaced repetition (SM-2), so words resurface right before you'd forget
- 5 new words a day, pushed via notification + a home-screen widget
- Pick your own language pair (PL->EN, EN->ES, whatever)
- Offline-first, syncs to the cloud

## Stack
- **Expo + TypeScript** (React Native), Expo Router
- **Supabase** (Postgres) for backend, auth, sync
- **SQLite** locally so it works offline first
- **TanStack Query** for server state, **Zustand** for client state
- **MyMemory** for translation (swappable), **Tatoeba** for example sentences
- **expo-notifications** for the daily batch
- **WidgetKit / SwiftUI** for the iOS widget
- **Jest + RNTL** for tests, **GitHub Actions** for CI

## Decisions worth noting
- Supabase exposes REST *and* GraphQL on the same DB, so I'm using both to compare.
- Server state and client state kept separate on purpose (TanStack Query vs Zustand).
- Saving a word + its sentences + tags is one transaction: all or nothing.
- Basically all TypeScript. Only the iOS widget is native Swift.

## Roadmap
1. Core: capture, translate, store, list (local SQLite)
2. Spaced repetition + first tests
3. Supabase: auth, RLS, transactions, REST vs GraphQL
4. Daily notifications
5. iOS widget
6. CI/CD pipeline
7. v2: Tatoeba sentences, song lyrics, state refactor