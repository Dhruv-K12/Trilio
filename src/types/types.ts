export type alertConfigType = {
  alert: boolean;
  error: string;
};
export type authCtxType = {
  alertConfig: alertConfigType;
  setAlertConfig: React.Dispatch<
    React.SetStateAction<alertConfigType>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
