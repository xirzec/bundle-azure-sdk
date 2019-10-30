# Bundling the Azure SDK for a browser

This document is intended to provide concrete examples for using the Azure SDK inside a browser.

The Azure SDK is published to [npm](https://npmjs.com) and usable inside the [Node.js runtime](https://nodejs.org/en/). 

In order to use the SDK on a website, you will first need to make sure it is formatted to work inside the browser. You do this by a process referred to as **bundling**. This process takes JavaScript code written for Node.js and converts it into a format that be used in modern browsers.

This document will walk you through all of the steps required in order to bundle the SDK for your website.

## Install prerequisites

In order to use the Azure SDK, you will need to install some software onto your development machine.

### Node.js

First, download and install Node.js from the official website: https://nodejs.org/en/

Once it is installed correctly, you will be able to use it with the `node` command on the command-line:

```
node --version
```

### NPM

The [Node Package Manager](https://npmjs.com) (npm) is included when you install Node. You can access it from the command-line, similar to Node:

```
npm --version
```

npm is also able to upgrade itself:

```
npm install -g npm@latest
```

The `-g` flag installs packages globally on your development machine. We will use it when installing a bundler.


## Setting up your project

First, let's make a new directory for your project, and change into it.

```
mkdir example
cd example
```

Now let's [set up a package.json file](https://docs.npmjs.com/creating-a-package-json-file) to configure npm:

```
npm --init
```

Follow the prompts and npm will generate a starter [package.json](https://docs.npmjs.com/files/package.json) for you.

Now we can install the Azure SDK. The Azure SDK is composed of many separate packages, but you can pick and choose which you need based on the services you intend to use.

For example, if you wish to use the Blob functionality provided by Azure's Storage service, you can install the `@azure/storage-blob` package:

```
npm install --save-dev @azure/storage-blob@latest
```

`--save-dev` is used to save the package as a "[dev dependency](https://docs.npmjs.com/files/package.json#devdependencies)", meaning it only needs to be installed when building your website. 

The tag `@latest` means to install the last published stable version of the package. If you wanted to install the last published *preview* version, you can use `@next` instead.

## Choosing a bundler

Below we show examples of using three fairly popular bundlers: [Webpack](https://webpack.js.org), [Rollup](https://rollupjs.org/), and [Parcel](https://parceljs.org/). The JavaScript ecosystem has a number of other bundlers available as well. Choosing a bundler for your library or application can be complex, but any will work for simple projects.

Webpack is a popular option in the ecosystem today and has a large community following. Rollup tends to be better suited for libraries rather than web applications, and is the bundler used by the Azure SDK. Parcel is a newer bundler that offers a great getting started experience.


## Using Webpack

First, you need to install [webpack](https://webpack.js.org/) globally:

```
npm install -g webpack webpack-cli
```

Once this is done, you can use webpack by configuring your project in the way that webpack expects.

### Webpack with JavaScript

In order to use the AzureSDK inside JS, you need to import code from the package you installed earlier. By default, Webpack will look for a file named `index.js` inside of a `src` folder from where it is run.

```js
// src\index.js
const { BlobServiceClient } = require("@azure/storage-blob");
// Now do something interesting with BlobServiceClient :)
```

Now you are able to invoke webpack on the command-line:

```
webpack --mode=development
```

This will create a **bundled** version of your code plus the Azure SDK functionality that your code depends on and write it out to a `dist` subfolder inside a file named `main.js` by default.

Now you are able to use this bundled output file inside an html page via a script tag:

```html
<script src="./dist/main.js"></script>
```

If you want to customize the name or location of your input file, the bundled files, or many other options that webpack provides, you can [create a webpack.config.js configuration file](https://webpack.js.org/concepts/configuration/#simple-configuration).


### Webpack with TypeScript

First, you need to install [TypeScript](https://typescriptlang.org) and a [Webpack loader](https://webpack.js.org/loaders/) for TypeScript:

```
npm install --save-dev typescript ts-loader
```

Now let's create a very basic [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file to configure TypeScript:

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "strict": true,
    "module": "es6",
    "moduleResolution": "node",
    "target": "es6"
  }
}
```

For more information on using Webpack with TypeScript, check out the TypeScript guide in Webpack's documentation: https://webpack.js.org/guides/typescript/

Similar to our JS example above, let's create an `index.ts` file that imports from `@azure/storage-blob`:

```ts
// src\index.ts
import { BlobServiceClient } from "@azure/storage-blob";
// Now do something interesting with BlobServiceClient :)
```

The last step we need to perform before we can run `webpack` and produce bundled output is set up a basic `webpack.config.js` file:

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

Now you are able to invoke webpack on the command-line:

```
webpack --mode=development
```

This will create a **bundled** version of your code plus the Azure SDK functionality that your code depends on and write it out to a `dist` subfolder inside a file named `bundle.js` (as configured in `webpack.config.js`.)

Now you are able to use this bundled output file inside an html page via a script tag:

```html
<script src="./dist/bundle.js"></script>
```

## Using Rollup

First, you need to install [rollup](https://rollupjs.org/) globally:

```
npm install -g rollup
```

Once this is done, you can use rollup by configuring your project in the way that rollup expects.

### Rollup with JavaScript


### Rollup with TypeScript

```
TODO: example here
```

## Using Parcel

First, you need to install [parcel](https://parceljs.org/) globally:

```
npm install -g parcel-bundler
```

Once this is done, you can use parcel by configuring your project in the way that parcel expects.

### Parcel with Javascript

Parcel uses [browserslist](https://github.com/browserslist/browserslist) to configure what polyfills are needed when bundling. The Azure SDK uses some modern features of JavaScript, including [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), so let's edit `package.json` to target the latest version of three popular browsers:

```json
"browserslist": [
    "last 1 Chrome version",
    "last 1 Firefox version",
    "last 1 Edge version"
  ],
```

In order to use the AzureSDK inside JS, you need to import code from the package you installed earlier.

To accomplish this, let's create two files, `index.js` and `index.html`:

```js
// index.js
const { BlobServiceClient } = require("@azure/storage-blob");
// Now do something interesting with BlobServiceClient :)
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<body>
  <script src="./index.js"></script>
</body>
</html>
```

Now you are able to invoke parcel on the command-line:

```
parcel index.html
```

This will bundle your code and create a local development server for your page at `http://localhost:1234`. Changes you make to `index.js` will automatically get reflected on the dev server.

If you wish to bundle your page without using the local development server, you can do this by passing the `build` command:

```
parcel build index.html
```

This will emit a compiled version of `index.html`, as well as any included script files, to the `dist` directory.

### Parcel with TypeScript

Parcel uses [browserslist](https://github.com/browserslist/browserslist) to configure what polyfills are needed when bundling. The Azure SDK uses some modern features of JavaScript, including [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), so let's edit `package.json` to target the latest version of three popular browsers:

```json
"browserslist": [
    "last 1 Chrome version",
    "last 1 Firefox version",
    "last 1 Edge version"
  ],
```

Next, you need to install [TypeScript](https://typescriptlang.org):

```
npm install --save-dev typescript
```

Now let's create a very basic [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) file to configure TypeScript:

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "strict": true,
    "module": "es6",
    "moduleResolution": "node",
    "target": "es2017"
  }
}
```

For more information on using Parcel with TypeScript, check out the TypeScript guide in Parcel's documentation: https://parceljs.org/typeScript.html

Similar to our JS example above, let's create an `index.ts` file that imports from `@azure/storage-blob`:

```ts
// index.ts
import { BlobServiceClient } from "@azure/storage-blob";
// Now do something interesting with BlobServiceClient :)
```

and also an `index.html` that references it:

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<body>
  <script src="./index.ts"></script>
</body>
</html>
```

Now you are able to invoke parcel on the command-line:

```
parcel index.html
```

This will bundle your code and create a local development server for your page at `http://localhost:1234`. Changes you make to `index.js` will automatically get reflected on the dev server.

If you wish to bundle your page without using the local development server, you can do this by passing the `build` command:

```
parcel build index.html
```

This will emit a compiled version of `index.html`, as well as any included script files, to the `dist` directory.
