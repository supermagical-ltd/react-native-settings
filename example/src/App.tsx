import { useState } from 'react';
import { Alert, SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import {
  ActionRow,
  InfoRow,
  LinkRow,
  Section,
  SelectRow,
  Settings,
  SwitchRow,
  TextInputRow,
} from '@supermagical/react-native-settings';

const THEME_OPTIONS = [
  { label: 'System', value: 'system' as const },
  { label: 'Light', value: 'light' as const },
  { label: 'Dark', value: 'dark' as const },
];

const FONT_SIZE_OPTIONS = [
  { label: 'Small', value: 14 },
  { label: 'Medium', value: 16 },
  { label: 'Large', value: 18 },
  { label: 'Huge', value: 22 },
];

export default function App() {
  const systemScheme = useColorScheme();

  const [themePref, setThemePref] = useState<'system' | 'light' | 'dark'>(
    'system'
  );
  const [fontSize, setFontSize] = useState(16);
  const [displayName, setDisplayName] = useState('Josh');
  const [email, setEmail] = useState('');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [betaFeatures, setBetaFeatures] = useState(false);

  const resolvedMode: 'light' | 'dark' =
    themePref === 'system'
      ? systemScheme === 'dark'
        ? 'dark'
        : 'light'
      : themePref;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={resolvedMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Settings mode={resolvedMode}>
        <Section title="Account" footer="Used across your devices.">
          <TextInputRow
            label="Name"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Your name"
          />
          <TextInputRow
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            inputProps={{
              keyboardType: 'email-address',
              autoCapitalize: 'none',
              autoCorrect: false,
            }}
          />
          <LinkRow
            label="Subscription"
            value="Pro"
            onPress={() =>
              Alert.alert('Subscription', 'Open subscription details')
            }
          />
        </Section>

        <Section title="Appearance">
          <SelectRow
            label="Theme"
            value={themePref}
            options={THEME_OPTIONS}
            onChange={setThemePref}
          />
          <SelectRow
            label="Font size"
            value={fontSize}
            options={FONT_SIZE_OPTIONS}
            onChange={setFontSize}
          />
        </Section>

        <Section title="Notifications" footer="Choose how we reach you.">
          <SwitchRow
            label="Push notifications"
            value={pushEnabled}
            onValueChange={setPushEnabled}
          />
          <SwitchRow
            label="Weekly email digest"
            description="A summary every Monday at 9am."
            value={emailDigest}
            onValueChange={setEmailDigest}
            disabled={!pushEnabled}
          />
        </Section>

        <Section title="Privacy">
          <SwitchRow
            label="Share usage analytics"
            description="Helps us improve product quality."
            value={analytics}
            onValueChange={setAnalytics}
          />
          <SwitchRow
            label="Enable beta features"
            value={betaFeatures}
            onValueChange={setBetaFeatures}
          />
        </Section>

        <Section title="About">
          <InfoRow label="Version" value="0.1.0" />
          <InfoRow label="Build" value="2026.05.18" />
          <LinkRow
            label="Terms of Service"
            onPress={() => Alert.alert('Terms', 'Open terms')}
          />
          <LinkRow
            label="Privacy Policy"
            onPress={() => Alert.alert('Privacy', 'Open privacy policy')}
          />
        </Section>

        <Section>
          <ActionRow
            label="Sign Out"
            center
            destructive
            onPress={() =>
              Alert.alert('Sign out', 'Are you sure?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Sign Out', style: 'destructive' },
              ])
            }
          />
        </Section>
      </Settings>
    </SafeAreaView>
  );
}
