# Mobile App Deployment Walkthrough

Expo mobile app for deployment using EAS (Expo Application Services).

## Changes Made

1.  **Modified `app.json`**: Added `android.package` and `ios.bundleIdentifier` set to `com.tatakstudio.tatakpay`.
2.  **Created `eas.json`**: Defined build profiles for `development`, `preview`, and `production`.
3.  **Updated `package.json`**: Added `eas-cli` as a development dependency.

## How to Deploy

### Prerequisites

You need an Expo account. If you don't have one, sign up at [expo.dev](https://expo.dev).

1.  **Login to EAS**:

    ```bash
    cd apps/mobile
    npx eas login
    ```

2.  **Configure Project on Expo Dashboard**:
    This step might happen automatically when you run the first build, or you might need to register.
    ```bash
    npx eas build:configure
    ```
    _Note: Since I already created `eas.json`, this might just verify the project ID._

### Building the App

#### Android

To build an APK for testing (side-loading):

```bash
npx eas build --platform android --profile preview
```

To build for the Google Play Store (AAB):

```bash
npx eas build --platform android --profile production
```

#### iOS

To build for internal distribution (Ad Hoc / TestFlight):

```bash
npx eas build --platform ios --profile preview
```

To build for the App Store:

```bash
npx eas build --platform ios --profile production
```

### Next Steps

- **Credentials**: EAS will ask to generate Keystores (Android) and Distribution Certificates (iOS) for you. It is highly recommended to let EAS manage credentials unless you have specific enterprise requirements.
- **Submit**: After a successful production build, you can use `npx eas submit` to upload to the stores.
