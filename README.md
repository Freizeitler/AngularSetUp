# Project: TCP P2P
Angular Frontend for "Regionaler Strommarkt". Ansprechpartner: Sybille Breunig, Ron Kunitzky, Janis Lütgemeier, Sebastian Eggers

## Folder and file structure
The relevant folders and files for the production are listed here.

```
src
│   index.html
│   main.ts
│
└───assets
│   │
│   ├───data
│   │   data.json
│   │
│   ├───scss
│   │   _settings.scss
│   │   styles.scss
│   │
│   └───index.html
│   
└───app
    │   app-routing.module.ts
    │   app.component.html
    │   app.module.ts
    │
    ├───patterns
    │   │
    │   ├───atoms
    │   │
    │   ├───molecules
    │   │
    │   ├───organisms
    │   │
    │   ├───pages
    │   │
    │   └───templates
    │
    ├───routes
    │   
    └───services  
```

## Common

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

For Production (also for testing SSR/Pre-rendering locally)

* **`npm run build:ssr && npm run serve:ssr`** - Compiles your application and spins up a Node Express to serve your Universal application on `http://localhost:4200`.

* **`npm run build:prerender && npm run serve:prerender`** - Compiles your application and pre-renders your applications files, spinning up a demo http-server so you can view it on `http://localhost:4200`

**Note**: To deploy your static site to a static hosting platform you will have to deploy the `dist/browser` folder, rather than the usual `dist`

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
