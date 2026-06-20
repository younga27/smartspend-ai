# Build an Android APK for SubSmartSpend

Your app is a TanStack Start app with server functions (auth, AI, database),
so it needs to stay online. The APK is a native shell that loads your
published site `https://subsmartspend.lovable.app` inside a WebView. It
installs from the Play Store, has its own icon, and runs full-screen.

The actual `.apk` file must be built on **your own machine** — Lovable's
cloud build can't produce Android binaries. Steps below take ~15 minutes
the first time.

## Prerequisites (one-time setup)

1. Install **Node.js 20+** and **bun** (or npm).
2. Install **Android Studio**: https://developer.android.com/studio
   - During setup it installs the Android SDK + emulator.
3. Install **Java JDK 21** (Android Studio bundles one; otherwise install separately).

## Build steps

```bash
# 1. Clone your project from GitHub (use the "Connect to GitHub" button in Lovable)
git clone <your-repo-url>
cd <your-repo>

# 2. Install dependencies
bun install

# 3. Add the Android platform (creates an android/ folder)
bunx cap add android

# 4. Sync config + web assets into the native project
bunx cap sync android

# 5. Open Android Studio
bunx cap open android
```

In Android Studio:

1. Wait for Gradle sync to finish (first time: several minutes).
2. **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
3. When done, click the "locate" link in the notification.
4. The file is at:
   `android/app/build/outputs/apk/debug/app-debug.apk`
5. Copy that `.apk` to your Android phone and install it (enable
   "Install unknown apps" for your file manager).

## Publishing to Google Play

For Play Store submission you need a **signed release build**:

1. Android Studio → **Build → Generate Signed Bundle / APK**.
2. Choose **Android App Bundle (.aab)** (Play Store requires AAB now).
3. Create a new keystore (keep the file + passwords safe — you'll need
   them for every future update).
4. Upload the `.aab` at https://play.google.com/console (one-time $25 fee).

## Updating the app

Since the APK just loads your published site, **most updates need no APK
rebuild** — just publish from Lovable and users see changes on next launch.

You only need to rebuild + reship the APK when you change:
- App name, icon, splash screen
- `capacitor.config.ts`
- Native plugins / permissions

## Customizing the icon & splash

After running `cap add android`, replace icons in
`android/app/src/main/res/mipmap-*/` or use a generator like
https://icon.kitchen and paste the output into the same folders.

## Troubleshooting

- **"SDK location not found"** → open Android Studio once and let it
  finish first-run setup.
- **Blank white screen in the app** → confirm your published URL loads
  in a regular browser on the phone.
- **Gradle errors** → File → Invalidate Caches → Restart in Android Studio.
