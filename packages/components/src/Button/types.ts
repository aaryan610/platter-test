export type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = {
  children: string;
  variant?: ButtonVariant;
  isDisabled?: boolean;
  onPress?: () => void;
};

// Only properties that mean the same thing in CSS and in React Native styles,
// so one object can be handed to either renderer.
export type ButtonStyles = {
  container: {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    borderStyle: 'solid';
    borderRadius: number;
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
    alignItems: 'center';
    opacity: number;
  };
  label: {
    color: string;
    fontSize: number;
    fontWeight: 400 | 600;
  };
};

export type StyledButtonProps = {
  label: string;
  isDisabled: boolean;
  onPress?: () => void;
  styles: ButtonStyles;
};
