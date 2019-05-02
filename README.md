# NgElectron

This project shows how to integrate a standard [Angular](https://angular.io)-Application into [Electron](https://electronjs.org). 

## Build and run (default Angular way)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

### Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `npm run build:web` to build the project. The build artifacts will be stored in the `dist/` directory.
Run `npm run build:web:prod` for a production build. 

### Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `npm run test:ci` to execute unit tests in a CI environment.

## Build and run (Electron way)

### Development server

Run `electron:serve` to serve your app via electron.
Notice that you have to serve your app via the Angular-way before that.

### Build

Run `build:electron` to build the project.
Run `npm run build:electron:prod` for a production build.
Run `npm run electron:windows` to build the windows app. The build artifacts will be stored in the `release/` directory.
Run `npm run electron:mac` to build the windows app. Notice that you need a macos-based OS to run this step. The build artifacts will be stored in the `release/` directory.

### Run

Run `npm run electron:local` to run the electron app locally.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
To get more help how to build and run electron go check out the [official Electron-Website](https://electronjs.org).
