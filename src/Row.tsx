import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSettingsTheme } from './theme';

export type RowProps = {
  /** Primary label shown on the left. */
  label?: ReactNode;
  /** Center the label horizontally (common for destructive actions like "Sign Out"). */
  center?: boolean;
  /** Secondary text shown beneath the label. */
  description?: ReactNode;
  /** Icon or other element rendered before the label. */
  leading?: ReactNode;
  /** Element rendered on the right (e.g. a Switch, chevron, value). */
  trailing?: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  /** Tint the primary label with the destructive color. */
  destructive?: boolean;
  /** When true, label color uses the theme accent. */
  accent?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Base row primitive. All higher-level rows (SwitchRow, LinkRow, ...) build
 * on this. Use it directly for fully custom rows.
 */
export function Row({
  label,
  center,
  description,
  leading,
  trailing,
  onPress,
  disabled,
  destructive,
  accent,
  testID,
  style,
}: RowProps) {
  const theme = useSettingsTheme();
  const labelColor = destructive
    ? theme.colors.destructive
    : accent
      ? theme.colors.accent
      : theme.colors.primaryText;

  const content = (pressed: boolean) => (
    <View
      style={[
        styles.row,
        {
          minHeight: theme.rowMinHeight,
          paddingHorizontal: theme.rowPaddingHorizontal,
          paddingVertical: theme.rowPaddingVertical,
          backgroundColor: pressed ? theme.colors.cardPressed : 'transparent',
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}
    >
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <View style={styles.center}>
        {typeof label === 'string' ? (
          <Text
            style={{
              fontSize: 17,
              color: labelColor,
              fontFamily: theme.fontFamily,
              textAlign: center ? 'center' : 'left',
            }}
            numberOfLines={1}
          >
            {label}
          </Text>
        ) : (
          label
        )}
        {description ? (
          typeof description === 'string' ? (
            <Text
              style={{
                fontSize: 13,
                color: theme.colors.tertiaryText,
                marginTop: 2,
                fontFamily: theme.fontFamily,
                textAlign: center ? 'center' : 'left',
              }}
            >
              {description}
            </Text>
          ) : (
            description
          )
        ) : null}
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable onPress={onPress} testID={testID}>
        {({ pressed }) => content(pressed)}
      </Pressable>
    );
  }
  return <View testID={testID}>{content(false)}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leading: {
    marginRight: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  trailing: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
