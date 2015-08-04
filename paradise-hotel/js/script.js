$(document).ready(function () {

    //placeholders remove on focus start
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

    //placeholders remove on focus end

    //select2 start
   
    function styleSelect(selectClass, additionClass) {
         $(selectClass).select2({
            minimumResultsForSearch: -1,
            containerCssClass: additionClass + "-drop",
            dropdownCssClass: additionClass + "-dropdown",
            dropdownAutoWidth: !0,
            placeholder: function(){
                $(this).data('placeholder');
            },
            width: "style"
        });
    }
    styleSelect('.select-dir', 'dir');
    styleSelect('.select-form', 'form');
    //select2 end

    //datepicker-range start
    $('.input-daterange').datepicker({
        format: 'mm/dd/yyyy',
        todayHighlight: true,
        startDate: new Date(),
        endDate: '+90d',
        autoclose: true
    });
    //datepicker-range end

    //owl carousel start
    $('.slider-basic').owlCarousel({
        loop: true,
        nav: true,
        navText: [
        "<i class='icon-arrow-40 prev-arrow'></i>",
        "<i class='icon-arrow-40 next-arrow'></i>"],
        items: 1
    })
    //owl carousel end
});

var expandMenuBtn = document.getElementById('expand-menu');
var mainNavMenu = document.getElementById('main-nav');

function showMenu(menu) {
    if (menu.style.display == '') {
        menu.style.display = 'block';
    } else if (menu.style.display == 'block') {
        menu.style.display = '';
    }
}

expandMenuBtn.addEventListener('click', function(e) {
    showMenu(mainNavMenu);
})

    