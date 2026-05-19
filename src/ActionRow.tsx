import { Row, type RowProps } from './Row';

export type ActionRowProps = Omit<RowProps, 'trailing'> & {
  /** Center the label horizontally (common for destructive actions like "Sign Out"). */
  center?: boolean;
};

/**
 * Button-style row. Use with `destructive` for delete/sign-out actions or
 * `accent` for primary actions.
 */
export function ActionRow({
  center,
  accent = !center,
  ...rowProps
}: ActionRowProps) {
  return (
    <Row
      {...rowProps}
      center={center}
      accent={!rowProps.destructive && accent}
      style={rowProps.style}
    />
  );
}
