// Shared across platforms. `./StyledButton` has no suffix on purpose: the build resolves it to
// StyledButton.web.tsx or StyledButton.native.tsx (see extensionsByPlatform in rollup.config.mjs).
import StyledButton from './StyledButton';
import { getButtonStyles } from './getButtonStyles';
import type { ButtonProps } from './types';

export const Button = ({ children, variant = 'primary', isDisabled = false, onPress }: ButtonProps) => (
  <StyledButton
    label={children}
    isDisabled={isDisabled}
    onPress={onPress}
    styles={getButtonStyles({ variant, isDisabled })}
  />
);
