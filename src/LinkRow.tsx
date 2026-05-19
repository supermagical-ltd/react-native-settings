import { Text, View } from 'react-native';
import { Row, type RowProps } from './Row';
import { useSettingsTheme } from './theme';

export type LinkRowProps = Omit<RowProps, 'trailing'> & {
  /** Optional value text displayed before the chevron (e.g. current selection). */
  value?: string;
  /** Hide the trailing chevron. */
  hideChevron?: boolean;
};

/**
 * Navigation row with optional value text and a trailing chevron — for
 * pushing to a sub-screen.
 */
export function LinkRow({
  value,
  hideChevron,
  onPress,
  ...rowProps
}: LinkRowProps) {
  const theme = useSettingsTheme();
  return (
    <Row
      {...rowProps}
      onPress={onPress}
      trailing={
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {value ? (
            <Text
              style={{
                fontSize: 17,
                color: theme.colors.tertiaryText,
                fontFamily: theme.fontFamily,
              }}
              numberOfLines={1}
            >
              {value}
            </Text>
          ) : null}
          {!hideChevron ? (
            <Text
              style={{
                fontSize: 18,
                color: theme.colors.tertiaryText,
                fontFamily: theme.fontFamily,
              }}
            >
              {'›'}
            </Text>
          ) : null}
        </View>
      }
    />
  );
}
