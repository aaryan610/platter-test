import { theme } from '@platter/tokens';
import type { ButtonStyles, ButtonVariant } from './types';

export const getButtonStyles = ({
  variant,
  isDisabled,
}: {
  variant: ButtonVariant;
  isDisabled: boolean;
}): ButtonStyles => {
  const colors = theme.colors.action[variant];

  return {
    container: {
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderWidth: theme.border.width.thin,
      borderStyle: 'solid',
      borderRadius: theme.border.radius.medium,
      paddingTop: theme.spacing[2],
      paddingBottom: theme.spacing[2],
      paddingLeft: theme.spacing[4],
      paddingRight: theme.spacing[4],
      alignItems: 'center',
      opacity: isDisabled ? 0.5 : 1,
    },
    label: {
      color: colors.text,
      fontSize: theme.typography.fontSize[200],
      fontWeight: theme.typography.fontWeight.semibold,
    },
  };
};
