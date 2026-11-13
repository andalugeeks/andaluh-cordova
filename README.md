# Andaluh-cordova

Transliterate español (spanish) spelling to andaluz app transcriptor.


## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Description

The **Andalusian varieties of [Spanish]** (Spanish: *andaluz*; Andalusian) are spoken in Andalusia, Ceuta, Melilla, and Gibraltar. They include perhaps the most distinct of the southern variants of peninsular Spanish, differing in many respects from northern varieties, and also from Standard Spanish. Further info: https://en.wikipedia.org/wiki/Andalusian_Spanish.

This app uses the [Andaluh-js](https://github.com/andalugeeks/andaluh-js), for further info about transliteration functions to convert *español* (spanish) spelling to andaluz spelling proposals.

As there's no official or standard andaluz spelling, andaluh-py & andaluh-js is adopting the **EPA proposal (Er Prinzipito Andaluh)**. Further info: https://andaluhepa.wordpress.com. Other andaluz spelling proposals are planned to be added as well.

## Usage

The Angular 6 web layer and the Cordova Android layer need **different Node versions**:

- [NodeJS](https://github.com/nodejs) **10.x–14.x** for `npm install` and `ng build` (Angular CLI 6 uses `node-sass` 4, which does not build on newer Node).
- [NodeJS](https://github.com/nodejs) **>= 20.17 / 22.9** for the `cordova` commands ([cordova-android](https://github.com/apache/cordova-android) 15.1.0 requires it). Cordova CLI 13.0.0 (`npx cordova@13.0.0 ...`).

[Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

[cordova-android](https://github.com/apache/cordova-android) version 15.1.0 (targetSdk/compileSdk 36, minSdk 24, AGP 8.10.1, Gradle 8.14.2).

[cordova-ios](https://github.com/apache/cordova-ios) version 4.5.5.

Note: cordova-android 15 requires Java 17, Android SDK Platform 36 and Build-Tools 36.0.0
```
$ sudo apt install openjdk-17-jdk
$ sdkmanager "platforms;android-36" "build-tools;36.0.0"
$ sdkmanager --licenses # Accept the license
```

Note: Cordova needs a `gradle` binary in the `PATH` only to generate the Gradle wrapper (the wrapper then downloads Gradle 8.14.2). Any Gradle 8.14.x works, e.g. via SDKMAN (`sdk install gradle 8.14.3`).

Example build of the Play Store bundle (with nvm):
```
$ nvm use 10 && npm install && npx ng build --prod
$ nvm use 22 && npx cordova@13.0.0 build android --release -- --packageType=bundle
```

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `www/` directory. Use the `--prod` flag for a production build.

### Cordova Prepare
Once you have built the angular app (previous step), the following command will install the platforms (android, ios) and apply whatever config is found in the `config.xml` file.

`cordova prepare`


### Cordova Run
When running this comman with an andriod device plugged in USB, the app will be installed directly in the device, otherwise if no target specified it will try to find a simulator for the desired platform

Ensure JAVA_HOME and ANDROID_HOME env variables are set

```
$ export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
$ export ANDROID_HOME=/opt/android-sdk
```

`cordova run ios|android`

If you get the following error ...

```
> Failed to install the following SDK components:
      platforms;android-32 Android SDK Platform 32
  The SDK directory is not writable (/opt/android-sdk)
```

... this means your user has no write access to android-sdk. Weird, but required. So then do the following and run the `cordova` command after:

```
$ sudo chown -R `whoami`:`whoami` /opt/android-sdk/
```

### Cordova Build
The following command will build the app in the target platform (ios|android)

`cordova build ios|android`

If you get the following error ...

```
Unrecognized option: --illegal-access=permit
```

Then remove the `--illegal-access=permit` flag from `platforms/android/gradlew` line 165

Use `--release` to create a release

`$ cordoba build android --release`

### Cordova Emulate
`cordova emulate ios|android`



### Run with Docker
Run `ng build --prod` to build the project. Then run `docker-compose up --build` to build the docker image from `www/` built artifacts and running within a container with nginx. Edit the `docker-compose.yml` file with your preferences.


## Support

Please [open an issue](https://github.com/andalugeeks/andaluh-cordova/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and open a pull request.
