import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinkRow } from './LinkRow';
import type { RowProps } from './Row';
import { useSettingsTheme } from './theme';

export type SelectOption<T extends string | number> = {
  label: string;
  value: T;
};

export type SelectRowProps<T extends string | number> = Omit<
  RowProps,
  'trailing' | 'onPress'
> & {
  value: T;
  options: ReadonlyArray<SelectOption<T>>;
  onChange: (value: T) => void;
  /** Title for the picker sheet. Falls back to the row label. */
  pickerTitle?: string;
};

/**
 * Row that opens a modal list picker. Pure-JS implementation — no native
 * dependencies. The displayed trailing text is the label of the selected
 * option (or the raw value if not in `options`).
 */
export function SelectRow<T extends string | number>({
  value,
  options,
  onChange,
  pickerTitle,
  label,
  disabled,
  ...rowProps
}: SelectRowProps<T>) {
  const theme = useSettingsTheme();
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);
  const displayValue = selected ? selected.label : String(value);
  const title = pickerTitle ?? (typeof label === 'string' ? label : 'Select');

  return (
    <>
      <LinkRow
        {...rowProps}
        label={label}
        disabled={disabled}
        value={displayValue}
        hideChevron
        onPress={disabled ? undefined : () => setOpen(true)}
      />
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable
            style={[
              styles.sheet,
              {
                backgroundColor: theme.colors.card,
                borderRadius: theme.radius,
              },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <Text
              style={[
                styles.title,
                {
                  color: theme.colors.tertiaryText,
                  fontFamily: theme.fontFamily,
                },
              ]}
            >
              {title}
            </Text>
            <ScrollView bounces={false}>
              {options.map((opt, index) => {
                const isSelected = opt.value === value;
                const isLast = index === options.length - 1;
                return (
                  <Pressable
                    key={String(opt.value)}
                    onPress={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                  >
                    {({ pressed }) => (
                      <View
                        style={[
                          styles.option,
                          {
                            backgroundColor: pressed
                              ? theme.colors.cardPressed
                              : 'transparent',
                            borderBottomWidth: isLast
                              ? 0
                              : StyleSheet.hairlineWidth,
                            borderBottomColor: theme.colors.separator,
                            paddingHorizontal: theme.rowPaddingHorizontal,
                            minHeight: theme.rowMinHeight,
                          },
                        ]}
                      >
                        <Text
                          style={{
                            fontSize: 17,
                            color: theme.colors.primaryText,
                            fontFamily: theme.fontFamily,
                            flex: 1,
                          }}
                        >
                          {opt.label}
                        </Text>
                        {isSelected ? (
                          <Text
                            style={{
                              fontSize: 18,
                              color: theme.colors.accent,
                              fontFamily: theme.fontFamily,
                            }}
                          >
                            {'✓'}
                          </Text>
                        ) : null}
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sheet: {
    maxHeight: '70%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },
});
