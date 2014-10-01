#<%= appname %>

<%= description %>

##Project Tools
Project created using the Yeoman FAB Generator to create static websites using Foundation, Assemble and Bower.

[Generator FAB Homepage](https://github.com/criticalmash/generator-fab)

Zurb Foundation: A Stylesheet framework for building responsive websites using SASS.

[Foundation Website](http://foundation.zurb.com)

Assmeble: Static site generator for Node and Grunt using Handlebars templates

[Assemble Website](http://assemble.io)

Bower: Manages (fetch, install and updates) front-end components for your site.

[Bower Website](http://bower.io)


## Starting your project
If Yeoman didn't install modules or compentents, install them first before proceeding.

npm install; bower install

Run `Grunt setup` to copy some additional boilerplate from Foundation into your project.

The project root file should contain a `_config.yml` file with some default settings, like the name of the site and a spot for a Google Analytics tracking id. Edit those defaults or add new variables to suit your needs.

## Grunt tasks
`grunt` or `grunt build`: build a distrubution (production) version of the site. Your static site should appear in a new directory named `dist`. You can copy these files alone to your production server.

`grunt server`: Builds a development version of the site and serves it from port 9000 (set in _config.yml). Will watch files (sass, hbs, md, etc.) and rebuild the site (with live reload) whenever they change.

`grunt setup`: For preforming setup tasks after installation of Bower components. Copies a few scss files from Foundation Framework. Shold only need to be run once at the begining of the project.

## Editing your site
FAB borrows from a wide range of projects to create an integrated tools. Unfortunatly, that means helpful documentation is spread accross the web. But here are a few hints to get you started.

### Foundation and SASS
`app.scss` is your starting point. This file includes all the other files that wind up inside the `app.css` file that styles your site. Some other notes...

- The underscore character '_' is used by SASS to denote an included file vs. a file that needs to be compilied. Any SCSS files you add should start with an underscore unless you want that file to be compiled into a css file. An exception might be if you want to create a print stylesheet.
- `_settings.scss`: contains sass variables used throughout the Foundation framework. Edit these to change font settings, default colors, and much more. Usually, you won't need to change the files in the component's directory at all with creative use.
- `_foundation.scss`: A grand include file for the Foundation library. By default, it includes every component of the Foundation framework. Commenting out unused components will reduce the eventual file size of your `app.css` file. I found that commenting out all components except `grid`, `block-grid`, `type` and `visibility` is a good place to start. Adding in `top-bar` is good for multipage sites with complex menus. See the [Foundation documentation](http://foundation.zurb.com/docs/) to learn what each component does and how to use it.





