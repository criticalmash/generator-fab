'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var FabGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.projectName = '';
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fine FAB (Foundation, Assemble and Bower) generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message : 'Your project name',
      default: this.appname
    },
    {
      type: 'input',
      name: 'description',
      message: 'project description',
      default: this.description
    },
    {
      type: 'confirm',
      name: 'shouldRunInstall',
      message: 'Install Dependencies?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.description = props.description;
      this.shouldRunInstall = props.shouldRunInstall;

      done();
    }.bind(this));
  },

  writing: {
    projectfiles: function () {
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('editorconfig', '.editorconfig');
      this.template('jshintrc', '.jshintrc');
      this.template('_README.md', 'README.md');
      //this.template('_travis.yml', '.travis.yml');
      //this.template('README.md');
      this.src.copy('gitignore', '.gitignore');
    },

    /**
     * takes a template file in the source directory, inserts
     * variables from 'this' and outputs the altered file in
     * the destination directory
     */
    // templates: function () {
    //   //this.src.copy('editorconfig', 'app/templates/editorconfig');
    //   //this.src.copy('jshintrc', 'app/templates/jshintrc');
    //   this.src.copy('app/templates/_package.json', 'app/templates/_package.json');
    //   //this.src.copy('app/templates/_bower.json', 'app/templates/_bower.json');
    // },

    app: function () {
      //this.dest.mkdir('app');
      //this.dest.mkdir('app/templates');

      //this.src.copy('_package.json', 'package.json');
      //this.src.copy('_bower.json', 'bower.json');
    }

  },

  end: function () {
    if (this.shouldRunInstall) {
      this.installDependencies();
    }
  }
});

module.exports = FabGenerator;
