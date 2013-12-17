/*
 * grunt-cropthumb
 * https://github.com/jbakse/grunt-cropthumb
 *
 * Copyright (c) 2013 Justin Bakse
 * Licensed under the MIT license.
 *
 * this code references https://github.com/excellenteasy/grunt-image-resize/blob/master/tasks/image_resize.js
 *
 */

'use strict';

var fs = require('fs');
var gm = require('gm');
var path = require('path');


module.exports = function(grunt) {

  grunt.registerMultiTask('cropthumb', 'Crops and scales image to create thumbnail.', function() {

    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      width: 200,
      height: 200,
      cropAmount: 0.5,
      overwrite: false,
      changeName: true,
      upscale: false
    });

    // Iterate over all specified file groups.
    grunt.util.async.forEachSeries(this.files, function(f, callback) {

      var dest_dir = path.dirname(f.dest),
        dest_ext = path.extname(f.dest),
        dest_name = path.basename(f.dest, dest_ext),
        source_file = f.src[0],
        dest_file = dest_dir + "/" + dest_name + dest_ext;

      if (options.changeName){
        dest_file = dest_dir + "/" + dest_name + "." + options.width + dest_ext;
      }

      if (!grunt.file.isDir(dest_dir)) {
        grunt.file.mkdir(dest_dir);
      }

      if (f.src.length !== 1) {
        return grunt.fail.fatal("Can not create a single thumb for more than one image.\n" +
          "You need to use a different 'files' format in your Gruntfile.");
      }

      if (options.overwrite === false && grunt.file.isFile(dest_file)) {
//        return grunt.log.writeln("Skipping " + source_file + " because destination already exists.\n" + "Set options 'overwrite' to true to enable overwriting of files.");
        callback();
        return;
      }


      grunt.log.writeln("cropthumb: " + dest_file);
      var image = gm(source_file);
      image
        .size(function(err, size) {
        if (err) {
          grunt.log.error("error reading image size: "+source_file);
          grunt.log.error(err);
          callback(err);
        }

        var source_aspect = size.width/size.height;
        if (options.width == null) {
          options.width = options.height * source_aspect;
        }
        if (options.height == null) {
          options.height = options.width / source_aspect;
        }

        var target_aspect = options.width / options.height;

        if (!options.upscale){
          if (size.width < options.width) {
            options.width = size.width;
            options.height = options.width / target_aspect;
          }
          if (size.height < options.height) {
            options.height = size.height;
            options.width = options.height * target_aspect;
          }
        }

        var w = size.width;
        var h = size.height;
        var left = (w * 0.5 - options.width * 0.5);
        var top = (h * 0.5 - options.height * 0.5);

        var grow = left - (left * options.cropAmount);
        left -= grow;
        top -= grow/target_aspect;

        var right = w - left;
        var bottom = h - top;
        var width = right - left;
        var height = bottom - top;



        image
          .crop(width, height, left, top)
          .resize(options.width, options.height)
          .quality(95)
          .write(dest_file, function(err) {
          if (err) {
            grunt.log.error("error creating cropthumb");
            callback(err);
          } else {
            grunt.log.writeln('Cropthumb "' + dest_file + '" created.');
            callback();
          }
        });
      });


    }, function(err) {
      done(!err);
    });
  });
};
