
---

# This is a fork

Original : https://github.com/jbakse/grunt-cropthumb

---

How to install :

```bash
$port install GraphicsMagick
$npm install
$grunt
```

---

# Original below

---


# grunt-cropthumb

> Crops and scales down image to create thumbnails.

This plugin was built quickly for personal use and has had very little testing. Because of this, this plugin is not published to the npm registry.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install git+http://github.com/jbakse/grunt-cropthumb.git --save-dev
```


Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cropthumb');
```

## The "cropthumb" task

### Overview
In your project's Gruntfile, add a section named `cropthumb` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  cropthumb: {

    options: {
      width: 200,
      height: 200,
      cropAmount: 0.5,
      overwrite: false
    },
    files: [{
      expand: true,
      dot: true,
      cwd: 'source/',
      dest: 'dest/',
      src: [
          'image.png'
      ]
    }]
  },
})
```

### Options

#### options.width
Type: `Integer`
Default value: `200`

With of the resulting thumbnail.

#### options.height
Type: `Integer`
Default value: `200`

Height of the resulting thumbnail.

#### options.cropAmount
Type: `Float`
Default value: `0.5`

How much to crop versus scale to acheive desired thumbnail size from 0.0 to 1.0. If cropAmount is 0.0, the thumbnail will show the whole image scaled down. If cropAmount is 1.0, the image will be croped to the desired size. A value of 0.5 will result in some scaling and some cropping. 

#### options.overwrite
Type: `boolean`
Default value: `false`

Set to true to overwrite existing files with the same name as the new cropthumb.

#### options.changeName
Type: `boolean`
Default value: `true`

changes `image.jpg` to `image.200.jpg` (referencing width of thumb)

#### options.upscale
Type: `boolean`
Default value: `false`

should images be upscaled if smaller than width/height?


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
