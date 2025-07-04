export type buttonProps = {
  text: string;
  color?: string;
  backgroundColor: string;
  onPress: () => void;
};
export type inputProps = {
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
};
