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

For example, if you wish to use the Blob functionality provided by Azure's Storage service, you can install the `@Azure/storage-blob` package:

```
npm --save-dev @Azure/storage-blob@latest
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

```
TODO: example here
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
