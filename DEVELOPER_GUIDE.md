# Developer Guide

**Note -** This application is still in alpha development and this guide will likely be inaccurate due to frequent changes in our system.

## Introduction

Hello, and thank you for taking an interest to contribute to the video player. We have worked towards making the developer experience for the video player easy and fun! Please read through the principles in this guide carefully to avoid issues that you don't know how to solve.

## How does it work?

The video player system can be seen as daunting at first, mainly due to the differences in our system compared to many others. Here is a basic overview of how the system works, so you can understand further concepts in this guide.

### Technologies & Languages

The main technology the video player uses is Electron, this allows developers to use HTML, CSS and JavaScript to quickly and easily develop the software. You are welcome to use your own languages that compile to any of these.

### Views

The video player uses views to display content in the application. Views are to developers who wish to change the video player to their own liking and share it with language learners around the world. There is a settings file that is loaded which determines which view the user has selected. Each view is a folder containing HTML, CSS and JavaScript. By default, the standard view is loaded, which has been built and developed by the contributers to the video player. Alongside this, views also allow the developer to interact with our API functions. Using our API is optional, but highly recommended for developers who do not want to reinvent the wheel.

### The API

The API can be used to develop views quickly and easily. We have designed our API to be useful to view developers, for if they wish to implement already existing features to their own view. We have included every feature of the standard view into our API, so developers can do whatever they want with it! The API is bundled into a single file with Webpack, this allows developers to easily utilise the API functions to their liking.

## View Development

As previously mentioned, views are what we use to display content to the application. Views are developed in classic HTML, CSS, and JavaScript. Views generally work with any supported file you would use on the web. The only requirement is that there is an `index.html` entry point in the root of your plugin's folder and that you specify the source files in a `miru.config.js` file.

**Sample File Structure**

```
/plugin_name
    ├─ index.html
    ├─ index.js
    ├─ index.css
    └─ image.jpg
```

### Make Your First View

Now we are going to create our first view from scratch. Firstly, think of a name for your view and create a folder with that name in a chosen directory.

Create an `index.html` file inside that folder.

Add the following to the `index.html` file, feel free to change it up to your liking!

```html
<!DOCTYPE html>
<html>
    <head></head>
    <body>
        <h1>Hello, world!</h1>
    </body>
</html>
```

Pull from the master branch of this repository.

Move the view folder into the views folder of the pulled repository.

Change the view name in the `settings.json` file to your own.

Open your terminal and go into the root directory of the pulled repository.

Execute `npm i`.

Execute `npm i -D`.

Execute `npm run dev-start`.

Your view should appear!

### Adding Scripts

Let's now add a script to our view, firstly create an `index.js` file.

Add the following to the `index.js` file:

```js
// Setup default keyboard event listeners
api.registerKeyEvents();
// Create and setup our media player for use
api.mediaPlayerManager.create();

// When the video has loaded, remove all body elements except for the media player
addEventListener("videoload", () => api.clearSurroundings());
```

This will add the basic functionality we need for a media.

Create a `miru.config.js` file.

Add the following to the `miru.config.js` file:

```js
module.exports = {
    useApi: true, // optional but good practise
    srcFiles: ["./index.js"],
};
```

This will tell the view processor where our script is, and if we are using the Miru API or not.

Now run the program with `npm run dev-start` and press `o`, you should now have a working media player!

## API

### Using the API

All functions and features of our API start with the `api` prefix and are stored inside the `api` object. There is no need to include any script files, simple ensure that `useApi` is not `false` in the `miru.config.js` file. By default `useApi` will be set to `true`.

Example use: `api.someFunctionOrFeature`.

### Functions

`mediaPlayer.create()` - create the media player element using the DOM
