import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';
import { Row, type RowProps } from './Row';
import { useSettingsTheme } from './theme';

export type TextInputRowProps = Omit<
  RowProps,
  'trailing' | 'onPress' | 'description'
> & {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  inputProps?: Omit<
    TextInputProps,
    'value' | 'onChangeText' | 'placeholder' | 'editable'
  >;
};

/**
 * Inline text input row. Label on the left, input fills the remaining space
 * and aligns to the right.
 */
export function TextInputRow({
  value,
  onChangeText,
  placeholder,
  inputProps,
  disabled,
  ...rowProps
}: TextInputRowProps) {
  const theme = useSettingsTheme();
  return (
    <Row
      {...rowProps}
      disabled={disabled}
      trailing={
        <View style={styles.inputWrapper}>
          <TextInput
            {...inputProps}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.placeholder}
            editable={!disabled}
            style={[
              styles.input,
              {
                color: theme.colors.primaryText,
                fontFamily: theme.fontFamily,
              },
              inputProps?.style,
            ]}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    minWidth: 120,
  },
  input: {
    fontSize: 17,
    textAlign: 'right',
    padding: 0,
  },
});
