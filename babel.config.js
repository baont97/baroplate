module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@navigators": "./src/navigators",
          "@store": "./src/store",
          "@hooks": "./src/hooks",
          "@utils": "./src/utils",
          "@services": "./src/services",
          "@models": "./src/models",
          "@i18n": "./src/i18n",
          "@assets": "./assets",
        },
      },
    ],
  ],
};
