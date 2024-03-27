# To update the splash screen
yarn react-native generate-bootsplash assets/logo.png \
  --platforms=android,ios,web \
  --background=134097 \
  --logo-width=100 \
  --assets-output=assets 

# To update app icon
npx icon-set-creator create assets/logo.png