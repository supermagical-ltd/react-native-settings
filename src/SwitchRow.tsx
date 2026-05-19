import { Switch, type SwitchProps } from 'react-native';
import { Row, type RowProps } from './Row';
import { useSettingsTheme } from './theme';

export type SwitchRowProps = Omit<RowProps, 'trailing' | 'onPress'> & {
  value: boolean;
  onValueChange: (value: boolean) => void;
  switchProps?: Omit<SwitchProps, 'value' | 'onValueChange' | 'disabled'>;
};

/** Row with a native Switch on the right. Toggling the row taps the switch. */
export function SwitchRow({
  value,
  onValueChange,
  switchProps,
  disabled,
  ...rowProps
}: SwitchRowProps) {
  const theme = useSettingsTheme();
  return (
    <Row
      {...rowProps}
      disabled={disabled}
      trailing={
        <Switch
          {...switchProps}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          trackColor={{
            true: theme.colors.accent,
            false: theme.colors.separator,
            ...(switchProps?.trackColor ?? {}),
          }}
        />
      }
    />
  );
}
