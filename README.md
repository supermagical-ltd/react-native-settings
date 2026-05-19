# @supermagical/react-native-settings

Declarative, iOS-style grouped settings UI for React Native. Compose a screen out of `<Section>`s and pre-built row components — switches, links, text inputs, selects, info rows, destructive actions — with a themed look that adapts to light and dark mode.

## Installation

```sh
npm install @supermagical/react-native-settings
# or
yarn add @supermagical/react-native-settings
```

Peer dependencies: `react` and `react-native`. No native modules — the library is pure JS.

## Quick start

```tsx
import { useState } from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';
import {
  Settings,
  Section,
  SwitchRow,
  LinkRow,
  InfoRow,
} from '@supermagical/react-native-settings';

export default function SettingsScreen() {
  const scheme = useColorScheme();
  const [pushEnabled, setPushEnabled] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Settings mode={scheme === 'dark' ? 'dark' : 'light'}>
        <Section title="Notifications" footer="Choose how we reach you.">
          <SwitchRow
            label="Push notifications"
            value={pushEnabled}
            onValueChange={setPushEnabled}
          />
        </Section>

        <Section title="About">
          <InfoRow label="Version" value="1.0.0" />
          <LinkRow label="Terms of Service" onPress={() => {}} />
        </Section>
      </Settings>
    </SafeAreaView>
  );
}
```

A full working example lives in [`example/src/App.tsx`](./example/src/App.tsx).

## Components

| Component      | Use for                                                       |
|----------------|---------------------------------------------------------------|
| `Settings`     | Root scroll container — provides the theme and background.    |
| `Section`      | Grouped container with optional `title` and `footer` text.    |
| `Row`          | Base row primitive — use directly for fully custom rows.      |
| `SwitchRow`    | Boolean toggle (`value` + `onValueChange`).                   |
| `LinkRow`      | Navigation row with chevron and optional `value` text.        |
| `ActionRow`    | Tappable action (supports `destructive` and `center`).        |
| `InfoRow`      | Read-only label + value pair.                                 |
| `TextInputRow` | Inline text input with a leading label.                       |
| `SelectRow`    | Choose one value from a set of `options`.                     |

All row variants extend `Row` and share `label`, `description`, `leading`, `disabled`, `destructive`, `accent`, `testID`, and `style`. Pass a string to `label`/`description` to get themed typography, or pass any `ReactNode` to render custom content.

### `<Settings>` props

- `mode?: 'light' | 'dark'` — shortcut for the built-in light/dark palettes.
- `theme?: Partial<SettingsTheme>` — override or extend the resolved theme.
- All `ScrollViewProps` except `children` (e.g. `contentContainerStyle`).

### `<Section>` props

- `title?: ReactNode` — section header text.
- `footer?: ReactNode` — section footer text shown below the group.
- `children` — typically one or more row components.

## Theming

The theme covers colors, fonts, spacing, and row dimensions. The simplest path is `mode="light" | "dark"`. For finer control, pass a `theme` prop — only the fields you provide are overridden:

```tsx
<Settings
  mode="dark"
  theme={{
    colors: { accent: '#FF6A00' },
    sectionSpacing: 32,
  }}
>
  {/* ... */}
</Settings>
```

You can also read the resolved theme from any descendant via `useSettingsTheme()`:

```tsx
import { useSettingsTheme } from '@supermagical/react-native-settings';

function CustomTrailing() {
  const theme = useSettingsTheme();
  return <Text style={{ color: theme.colors.tertiaryText }}>3 items</Text>;
}
```

Helpers: `buildTheme(mode, overrides)`, `defaultTheme`, `lightColors`, `darkColors`, and the `SettingsThemeContext` React context are all exported for advanced cases.

## Running the example

```sh
yarn install
yarn example start
```

The example is an Expo app — see [`example/`](./example) for iOS/Android run scripts.

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
