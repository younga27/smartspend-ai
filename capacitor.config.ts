import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.subsmartspend',
  appName: 'SubSmartSpend',
  webDir: 'dist',
  server: {
    // Point the native shell at your published Lovable site so server
    // functions (auth, AI, database) keep working.
    url: 'https://subsmartspend.lovable.app',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
