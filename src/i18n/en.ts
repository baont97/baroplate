export const en = {
  common: {
    hi: "Hi",
    save: "Save",
    continue: "Continue",
    signOut: "Sign Out",
  },
  biometric: {
    FaceID: {
      title: "Secure Your Account\nwith Face ID",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Face ID",
    },
    TouchID: {
      title: "Secure Your Account\nwith Touch ID",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Touch ID",
    },
    Biometrics: {
      title: "Secure Your Account\nwith Fingerprint Authentication",
      message:
        "This is how we make sure that only you can\naccess your wallet.",
      enableBTN: "Enable Fingerprint",
    },
    promtMessage: "Confirm your fingerprint",
    cancelButtonText: "Cancel",
  },
  form: {
    username: {
      label: "Username",
      placeholder: "Enter your username",
    },
    password: {
      label: "Password",
      placeholder: "Enter your password",
    },
  },
  language: {
    title: "Language",
  },
  signIn: {
    title: "Sign In",
    submitButton: "Sign In",
  },
  home: {
    title: "Home",
  },
};

export type TTranslations = typeof en;
