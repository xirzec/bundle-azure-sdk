# Bundling the Azure SDK for a browser

To use Azure SDK libraries on a website, you need to format your code to work inside the browser. You do this using a tool called a **bundler**. This process takes JavaScript code written using Node.js conventions and converts it into a format that is understood browsers.

This document will walk you through all of the steps required to bundl Azure SDK libraries for your website.

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
npm --save-dev @azure/storage-blob@latest
```

`--save-dev` is used to save the package as a "[dev dependency](https://docs.npmjs.com/files/package.json#devdependencies)", meaning it only needs to be installed when building your website. 

The tag `@latest` means to install the last published stable version of the package. If you wanted to install the last published *preview* version, you can use `@next` instead.

## Choosing a bundler

// some copy here on how to decide which bundler to use

#### Webpack


#### Rollup


#### Parcel



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

### Rollup with JavaScript

```
TODO: example here
```

### Rollup with TypeScript

```
TODO: example here
```

## Using Parcel

### Parcel with Javascript

```
TODO: example here
```

### Parcel with TypeScript

```
TODO: example here
```
