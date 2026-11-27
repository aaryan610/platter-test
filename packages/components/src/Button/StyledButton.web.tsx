import type { StyledButtonProps } from './types';

const StyledButton = ({ label, isDisabled, onPress, styles }: StyledButtonProps) => (
  <button
    type="button"
    disabled={isDisabled}
    onClick={onPress}
    style={{
      ...styles.container,
      ...styles.label,
      fontFamily: 'inherit',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }}
  >
    {label}
  </button>
);

export default StyledButton;
