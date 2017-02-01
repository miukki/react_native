# eic-react-native-ui

### follow the steps:
https://facebook.github.io/react-native/docs/getting-started.html

### launch AVD manager:
```
android avd
```

### Run app:
```
react-native run-android
```

### look to list of devices:
```
adb devices

#if you want sync with physical device, in adb list should be only one physical device
#$ adb devices
#14ed2fcc device         # Physical device
```


### Dev version
```
cd android
./gradlew installDebug
```

#### Release version
```
cd android
./gradlew installRelease
#OR
react-native run-android --configuration Release)
```

#### For successfully run apk on MIUI
in Developer options, scroll down to find Turn on MIUI optimization and disable it.

#### Access Gradle Daemon ([about](https://docs.gradle.org/2.4/userguide/gradle_daemon.html)
)
```
touch ~/.gradle/gradle.properties && echo "org.gradle.daemon=true" >> ~/.gradle/gradle.properties
```

#### Accessing console logs in terminal
```
adb logcat *:S ReactNative:V ReactNativeJS:V
```

#### Accessing console logs
https://facebook.github.io/react-native/docs/debugging.html
```
react-native log-android
```


#### Fast Emulator for android
https://www.genymotion.com/