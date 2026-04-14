type MetadataMessages = {
  title: string;
  description: string;
};

type NavigationMessages = {
  home: string;
};

type LanguageSwitcherMessages = {
  en: string;
  ko: string;
};

type SettingsMessages = {
  light: string;
  dark: string;
  system: string;
  lightDescription: string;
  darkDescription: string;
  systemDescription: string;
};

type ToastMessages = {
  success: string;
  error: string;
  info: string;
  warning: string;
  loading: string;
  copiedToClipboard: string;
  savedSuccessfully: string;
  deletedSuccessfully: string;
  updatedSuccessfully: string;
  somethingWentWrong: string;
  pleaseTryAgain: string;
};

type CommonMessages = {
  metadata: MetadataMessages;
  navigation: NavigationMessages;
  languageSwitcher: LanguageSwitcherMessages;
  settings: SettingsMessages;
  toast: ToastMessages;
};

type HomeMessages = {
  title: string;
  description: string;
  create: string;
};

type NotFoundMessages = {
  title: string;
  heading: string;
  description: string;
  backHome: string;
};

type ErrorMessages = {
  title: string;
  description: string;
  reset: string;
  backHome: string;
};

type ErrorsMessages = {
  notFound: NotFoundMessages;
  error: ErrorMessages;
};

type AuthMessages = {
  auth: {
    loginTitle: string;
    loginDescription: string;
    signupTitle: string;
    signupDescription: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    name: string;
    namePlaceholder: string;
    login: string;
    loggingIn: string;
    signup: string;
    signingUp: string;
    logout: string;
    loginFailed: string;
    signupFailed: string;
    noAccount: string;
    hasAccount: string;
    dashboard: string;
    dashboardWelcome: string;
  };
};

declare global {
  interface IntlMessages
    extends CommonMessages,
      HomeMessages,
      ErrorsMessages,
      AuthMessages {}
}

export {};
