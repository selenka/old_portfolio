$(function () {
    $('.header__navbar').stickyNavbar({
        activeClass: "active",
        sectionSelector: "scrollto",
        animDuration: 350,
        startAt: 0,
        easing: "linear",
        jqueryEffects: true,
        jqueryAnim: "slideDown",
        selector: "a",
        mobile: false,
        mobileWidth: 480,
        zindex: 9999,
        stickyModeClass: "sticky",
        unstickyModeClass: "unsticky"
    });
});