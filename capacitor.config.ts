import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.raff.entrapwa',
  appName: 'RaffApp',
  webDir: 'dist',
  server: {
    // For dev: use this to point Capacitor at your local Vite dev server
    // url: 'http://10.0.2.2:3000', // Android emulator
    // cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#0f172a',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
  },
  android: {
    buildOptions: {
      releaseType: 'APK',
    },
  },
}

export default config
