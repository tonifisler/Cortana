(function($) {

  var codeIndex = 0;

  $('.codeExample').each(function () {
    var $output = $('.exampleOutput'),
      $markup = $('.codeBlock');

    codeIndex += 1;
    $(this).find($output).append('<p class="styleguide show-code"><button type="button" class="btn btn-xs btn-info" data-toggle="collapse" data-target="#codeBlock-' + codeIndex + '">&lt;/&gt;</button></p>');
    $(this).find($markup).addClass('collapse').attr('id', 'codeBlock-' + codeIndex);
  });

  $('.cortana-content > table').addClass('table table-bordered');

}) (jQuery_no_conflict);
