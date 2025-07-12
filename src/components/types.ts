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
export type swibeableBtnProps = {
  choose: "All" | "Favourites";
  setChoose: React.Dispatch<
    React.SetStateAction<"All" | "Favourites">
  >;
};
export type labelInputProps = {
  value: string;
  onChangeText: (val: string) => void;
  title: string;
  multiline?: boolean;
  length: number;
};

export type serversProps = {
  uri: string;
  title: string;
  des: string;
  code: string;
};
