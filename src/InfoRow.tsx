import { Text } from 'react-native';
import { Row, type RowProps } from './Row';
import { useSettingsTheme } from './theme';

export type InfoRowProps = Omit<RowProps, 'trailing' | 'onPress'> & {
  /** Read-only value displayed on the right. */
  value: string;
};

/** Read-only key/value row, e.g. for "Version" or "Build". */
export function InfoRow({ value, ...rowProps }: InfoRowProps) {
  const theme = useSettingsTheme();
  return (
    <Row
      {...rowProps}
      trailing={
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
      }
    />
  );
}
