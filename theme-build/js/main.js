/* ==========================================================
 * app.js
 * Angular app
 *
 * Author: Yann Gouffon, hello@yago.io
 *
 * Copyright 2014 Yann Gouffon
 * Licensed under MIT
 ========================================================== */

(function(){
  var app = angular.module('cortana', ['mgcrea.ngStrap', 'ui.bootstrap']);

  app.controller('MainController', function($scope) {
  });

})();
(function($) {

  var codeIndex = 0;

  $('.codeExample').each(function () {
    var $output = $('.exampleOutput'),
      $markup = $('.codeBlock');

    codeIndex += 1;
    $(this).find($output).append('<button type="button" class="btn btn-xs btn-info show-code" data-toggle="collapse" data-target="#codeBlock-' + codeIndex + '">&lt;/&gt;</button>');
    $(this).find($markup).addClass('collapse').attr('id', 'codeBlock-' + codeIndex);
  });

  $('.cortana-content > table').addClass('table table-bordered');

}) (jQuery_no_conflict);
