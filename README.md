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

[NodeJS](https://github.com/nodejs) version 14.17.0.

[Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

[cordova-android](https://github.com/apache/cordova-android) version 13.0.0.

[cordova-ios](https://github.com/apache/cordova-ios) version 4.5.5.

Note: Cordova 13.0.0 requires Java 17 (Oracle JDK 17 or OpenJDK 17) and Android Build-Tools 34.0.0
```
$ sudo apt install openjdk-17-jdk
$ sudo update-alternatives --config javac # Select openjdk-17
$ sudo apt install sdkmanager
$ sudo sdkmanager "build-tools;34.0.0"
$ sudo sdkmanager --licenses # Accept the license
```

Note: Cordova 13.0.0 requires Gradle 8.7. I use SDKMAN to install but you can use your preferred install mechansim
```
$ curl -s "https://get.sdkman.io" | bash
$ source "/home/fontanon/.sdkman/bin/sdkman-init.sh"
$ sdk install gradle 8.7

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

### Cordova Emulate
`cordova emulate ios|android`



### Run with Docker
Run `ng build --prod` to build the project. Then run `docker-compose up --build` to build the docker image from `www/` built artifacts and running within a container with nginx. Edit the `docker-compose.yml` file with your preferences.


## Support

Please [open an issue](https://github.com/andalugeeks/andaluh-cordova/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and open a pull request.
