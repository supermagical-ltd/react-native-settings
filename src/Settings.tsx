import type { ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {
  SettingsThemeContext,
  buildTheme,
  useSettingsTheme,
  type SettingsTheme,
} from './theme';

export type SettingsProps = Omit<ScrollViewProps, 'children'> & {
  children: ReactNode;
  /** Theme mode shortcut. Use `theme` for full control. */
  mode?: 'light' | 'dark';
  /** Override or extend the built-in theme. */
  theme?: Partial<SettingsTheme> & {
    colors?: Partial<SettingsTheme['colors']>;
  };
  contentContainerStyle?: StyleProp<ViewStyle>;
};

/**
 * Root scroll container that provides the settings theme and a grouped
 * background to its children. Compose with `<Section>` and row components.
 */
export function Settings({
  children,
  mode,
  theme,
  contentContainerStyle,
  style,
  ...scrollProps
}: SettingsProps) {
  const resolved = buildTheme(mode ?? 'light', theme);
  return (
    <SettingsThemeContext.Provider value={resolved}>
      <ScrollView
        {...scrollProps}
        style={[
          styles.scroll,
          { backgroundColor: resolved.colors.groupedBackground },
          style,
        ]}
        contentContainerStyle={[
          { paddingVertical: resolved.sectionSpacing / 2 },
          contentContainerStyle,
        ]}
      >
        {children}
      </ScrollView>
    </SettingsThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
});

export { useSettingsTheme };
