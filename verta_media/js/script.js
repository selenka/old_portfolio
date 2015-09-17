$(document).ready(function () {
    //owl carousel start
    $('.owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        dots: true
    })
    //owl carousel end

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
    styleSelect('.select-lang', 'lang');

    //select2 end

});

    