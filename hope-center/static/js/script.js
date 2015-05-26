$(document).ready(function () {
	var $body = $('body');
	$body.on('focusin', 'input', function() {
        var input = $(this);
        input.data('place-holder-text', input.attr('placeholder'));
        input.attr('placeholder', '');
    });

    $body.on('focusout', 'input', function() {
        var input = $(this);
        input.attr('placeholder', input.data('place-holder-text'));
    });
    $('.carousel').carousel({
        interval: 6000,
        cycle: false,
        pause: 'hover'
    });
    fakewaffle.responsiveTabs(['xs', 'sm']);
    $('#myTab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
  });