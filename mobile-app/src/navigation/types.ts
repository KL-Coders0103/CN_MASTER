export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  OTP: {
    userId: string;
  };
  Home: undefined;
  ModuleDetail:{
    title: string;
  };
  Tabs: {
    screen?: string;
    params?: any;
  };
  Lesson:{
    title: string;
  };
  QuizPlay: undefined;
  AIScreen: {
    topic?: string;
  };
  NoteDetail:{
    note:any;
  };
  CompleteProfile: undefined;
};