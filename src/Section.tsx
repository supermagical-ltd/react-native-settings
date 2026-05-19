import { Children, isValidElement, type ReactNode } from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSettingsTheme } from './theme';

export type SectionProps = {
  title?: string;
  footer?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Grouped section of settings rows. Renders an optional title above, an
 * optional footer below, and draws separators between child rows.
 */
export function Section({ title, footer, children, style }: SectionProps) {
  const theme = useSettingsTheme();
  const items = Children.toArray(children).filter(isValidElement);
  const lastIndex = items.length - 1;

  return (
    <View
      style={[styles.wrapper, { marginBottom: theme.sectionSpacing }, style]}
    >
      {title ? (
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.tertiaryText,
              paddingHorizontal: theme.rowPaddingHorizontal,
              fontFamily: theme.fontFamily,
            },
          ]}
        >
          {title.toUpperCase()}
        </Text>
      ) : null}
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            borderRadius: theme.radius,
          },
        ]}
      >
        {items.map((child, index) => (
          <View key={index}>
            {child}
            {index < lastIndex ? (
              <View
                style={{
                  height: StyleSheet.hairlineWidth,
                  marginLeft: theme.rowPaddingHorizontal,
                  backgroundColor: theme.colors.separator,
                }}
              />
            ) : null}
          </View>
        ))}
      </View>
      {footer ? (
        <Text
          style={[
            styles.footer,
            {
              color: theme.colors.tertiaryText,
              paddingHorizontal: theme.rowPaddingHorizontal,
              fontFamily: theme.fontFamily,
            },
          ]}
        >
          {footer}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  title: {
    fontSize: 13,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  card: {
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  footer: {
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
});
