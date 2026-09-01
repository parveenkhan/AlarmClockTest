# Wayk — Alarm Clock

Expo (SDK 55) React Native app that recreates **[Wayk: Alarm Clock to Wake Up](https://apps.apple.com/in/app/wayk-alarm-clock-to-wake-up/id6758021281)**.

One alarm, one mission, then the day starts. There is **no bottom tab bar**.

**Git:** https://github.com/parveenkhan/AlarmClockTest.git

---

## Run

```bash
git clone https://github.com/parveenkhan/AlarmClockTest.git
cd AlarmClockTest
npm install
npx expo run:ios
```

Android:

```bash
npx expo run:android
```

Use a development build (`expo run:ios` / `expo run:android`). Expo Go will miss native modules such as `ExpoAsset`.

---

## What’s included

- Onboarding: splash, quizzes, time wheels, mission + sound, signature commitment, setup progress, morning plan, referral, create account
- Home: streak, next-alarm hero, alarm list, add / edit alarm, sound library
- Missions: object hunt / camera, shake, push-ups, math, read-aloud
- Insights, groups, settings, sleep tracking
- Alarm ringing via local notifications
- Local state with Redux + redux-persist

---

## Animation note

The App Store app and the provided walkthrough video include richer motion: screen transitions, the 5x gauge, signature success rings, setup percent counter, checklist reveals, and other micro-interactions.

Those animations can be added in this codebase. They were **not fully matched in this delivery because of limited time**. Matching production / video motion is the first polish pass.

---

## Architecture

```
Src/
  Assets/             Colors, fonts, images, strings, app constants
  Component/          Shared UI
  Navigation/         AuthStack, HomeStack, MainNavigation, NavigationService
  NetworkController/  WebApi, WebConstant (shells — no live backend yet)
  Redux/
    Actions/
    Reducers/
    Saga/
    Services/
    Store/
  Screens/
    AuthScreen/       Onboarding
    HomeScreen/
    AlarmScreen/
    MissionScreen/
    InsightsScreen/
    GroupsScreen/
    SettingScreen/
    SleepScreen/
  Utils/
```

Stack: React Native 0.83, React 19, Expo SDK 55, React Navigation native stack, Redux Toolkit, redux-saga, redux-persist, TypeScript.

---

## Improvement areas

1. **Animation parity** — finish motion from the App Store app and walkthrough video.
2. **Reliable wake-up audio** — lock-screen / killed-state ringing needs a native alarm path, not only Expo notifications.
3. **Missions** — object hunt is shutter-complete (not real detection); push-ups should count reps; read-aloud should score speech.
4. **Auth & paywall** — Apple / Google sign-in and IAP are demo-only.
5. **Sounds** — preview and play real audio files.
6. **Backend** — `WebApi` / sagas are ready to sync alarms, streak, and receipts.
7. **QA** — device tests on physical iOS + Android; end-to-end flows for onboarding, alarm fire, and mission complete.

---

## Future scope

- Finish animation parity with production Wayk
- Cloud sync and multi-device alarms
- Real wake receipts (photo + share card)
- Referral rewards that unlock exclusive sounds
- HealthKit / Health Connect sleep tracking
- Groups with live member status
- Widgets, Live Activities, full-screen alarm
- Analytics and localization
- Android foreground service for exact alarms
