/*
Navbar (Component)
-------------------
• Using navbar dropdowns (see herein below).
*/

(function ($) {

  'use strict';

  $.fn.cb_navbar = function () {
    // called by $('.navbar').cb_navbar();

    $(this).wrap('<div class="navbar__has-wrap"></div>');
    $('.navbar--fixed').parent().addClass('navbar__has-wrap--is-fixed');
    if ($(this).hasClass('navbar--fixed')) {
      $('body').addClass('body--navbar-is-fixed');
    }

    // navbar Navicon
    // ---------------
    // For revealing collapsed navbar on sm screens.

    function cb_navbar_navicon(e) {
      /*jshint validthis: true */
      if (!$(this).parent('.navbar').hasClass('navbar--is-open')) {
        $(this).parent('.navbar').addClass('navbar--is-open');
        $('.reset-overlay').addClass('reset-overlay--is-raised');
        $(this).siblings('.navbar__content').slideDown();
      } else {
        $.fn.cb_reset();
      }
      e.preventDefault();
    }

    $('.navbar__navicon').on('click', cb_navbar_navicon);
    $('.navbar__navicon').on('touchstart', cb_navbar_navicon);

    // Navbar Dropdowns
    // -----------------
    // Below the navbar breakpoint, parent links are followable/
    // Above the navbar breakpoint, clicking a parent link *once* will open the
    // dropdown, and clicking it *a second time* will follow the parent link.
    // The dropdown can be dismissed by 'clicking outside', i.e. cb_reset().

    $('.navbar ul ul')
      .addClass('dropdown__content')
      .parent().find('>a').addClass('dropdown__toggle').cb_dropdown_toggle();

    $('.navbar .dropdown__toggle').on('click', function () {
      location.href = $(this).attr('href');
    });

  };
}(jQuery));
