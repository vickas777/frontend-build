# Frontend build system

## Introduction
This is simple build system for creating sites( HTML, SSS, JS). It is based on [Gulp](http://gulpjs.com/). It has web-server with LiveReload, to see changes imediately, SASS compiller, Rigger to "include" files one into another and the simpliest inteface to use.

## Instalation and usage
System uses from command line. You need [Node.js](https://nodejs.org) to be installed.
First clone this to the folder you want to use, and go it's path into a command line(terminal).
Install system:

		npm i

If you use Bower edit "bower.json" file to add plugins (default is jQuery and normalize.css) and run:

    	bower i

After all installations run this system by command:

    	npm start

It clears build folder,if it was creaded previosly, and then start to build your project.

Source maps are written by default. If you need clear files without sourcemaps just run:

		NODE_ENV=production npm start

To install some plugins you need C++ compiller and Python 2.7. If you have errors in installation check it.

## Structure
Folder "src" contain your source code.
In root path save your HTML files.
Subfolders cotain:

     - fonts: to save your custom fonts;
     - img: folder for images;
     - js|
         | - partials|
         |           |app.js: your JS code;
         |main.js: all JS connections and includes;
     - style|
            | - partials|
            |           | _app.scss: your SCSS code;
            |           | _mixins.scss: your SCSS mixins;
            |           | _variables.scss: your SCSS variables;
												| _fonts.scss: custom fonts connections;
            | main.scss: all CSS connections and includes used for project;
     - template: template HTML files such as headers, footers etc.

## For future user
Firstly I created this system to make my web-developing easier. If you have some improvements of this system, I'll be very glad to see it.
