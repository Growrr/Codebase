// Generated by CoffeeScript 1.12.2

/*
 * RESET OVERLAY
 * • Used by popovers, dropdowns, off-canvas sidebar and anything else that
 * needs to be dismissed by "clicking outside" the open/active element.
 * • Put everything that needs `.reset-overlay` activity into this function.
REDEPLOYMENT
• [ ] off-canvas
• [√] popover
• [√] showhide--is-resettable
• [√] dropdown
 */

(function() {
  $.fn.cb_reset_overlay = function() {
    return $(this).prepend("<span class='reset-overlay'></span>");
  };

  $.fn.cb_debounce = function(fn, delay) {
    var debounceTimer;
    debounceTimer = null;
    return function() {
      var args, context;
      context = this;
      args = arguments;
      clearTimeout(debounceTimer);
      return debounceTimer = setTimeout((function() {
        return fn.apply(context, args);
      }), delay);
    };
  };

  $.fn.cb_showhide_toggle = function() {
    var cb_showhide;
    cb_showhide = function() {

      /* jshint validthis: true */
      if ($(this).closest(".showhide").hasClass("showhide--is-resettable")) {
        if (!$(".reset-overlay").hasClass("reset-overlay--is-raised")) {
          $(".reset-overlay").addClass("reset-overlay--is-raised");
        } else {
          $(".reset-overlay").removeClass("reset-overlay--is-raised");
        }
        $(this).closest(".showhide__content").addClass("showhide__content--is-revealed");
      }
      $(this).toggleClass("showhide__toggle--is-toggled");
      if ($(this).closest(".showhide").hasClass("showhide--accordion")) {
        $(this).next(".showhide__content").slideToggle(300).toggleClass("showhide__content--is-revealed").siblings(".showhide__content").slideUp(300).removeClass("showhide__content--is-revealed").siblings(".showhide__toggle").removeClass("showhide__toggle--is-toggled");
      } else {
        $(this).siblings(".showhide__content").slideToggle(300).toggleClass("showhide__content--is-revealed");
      }
      return $(".reset-overlay--is-raised").click(function() {
        $(".showhide__toggle").removeClass("showhide__toggle--is-toggled");
        $(".showhide__content").removeClass("showhide__content--is-revealed").slideUp(300);
        return $(".reset-overlay").removeClass("reset-overlay--is-raised");
      });
    };
    $(".showhide--show-start > .showhide__content").addClass("showhide__content--is-revealed").css({
      "display": "block"
    });
    return $(this).on("click", cb_showhide);
  };

  $.fn.cb_showhide_dismiss = function() {
    var cb_showhide_dismiss_x;
    cb_showhide_dismiss_x = function() {

      /* jshint validthis: true */
      $(this).closest(".showhide__content").slideUp(300).removeClass("showhide__content--is-revealed");
    };
    return $(this).on("click", cb_showhide_dismiss_x);
  };

  $.fn.cb_dropdown_toggle = function() {
    var cb_dropdown, cb_dropdown_close;
    cb_dropdown_close = function() {
      $(".dropdown__toggle").removeClass("dropdown__toggle--is-toggled");
      $(".dropdown__content").removeClass("dropdown__content--is-revealed");
      return $(".reset-overlay").removeClass("reset-overlay--is-raised");
    };
    cb_dropdown = function(e) {
      if ($(".reset-overlay").hasClass("reset-overlay--is-raised")) {
        return cb_dropdown_close;
      } else {
        if ($(".dropdown__toggle").hasClass("dropdown__toggle--is-toggled")) {
          return cb_dropdown_close;
        } else {
          e.preventDefault();

          /* jshint validthis: true */
          $(this).addClass("dropdown__toggle--is-toggled").next(".dropdown__content").addClass("dropdown__content--is-revealed");
          $(".reset-overlay").addClass("reset-overlay--is-raised");
          $(".reset-overlay--is-raised").on("click", cb_dropdown_close);
          return $(".dropdown__content").click(function(e) {
            return e.stopPropagation();
          });
        }
      }
    };
    return $(this).on("click", cb_dropdown);
  };

  (function($) {
    "use strict";
    return $.fn.cb_menu_marker = function() {
      var menu_marker, menu_marker_1, menu_marker_bottom, menu_marker_section, menu_marker_top;
      menu_marker = $(".menu-marker");
      menu_marker_1 = $(".menu-marker:first-of-type");
      menu_marker_top = $(".menu-marker-wrap").offset().top;
      menu_marker_bottom = $(".menu-marker-wrap").outerHeight();
      menu_marker_section = $(".menu-marker-section");
      menu_marker.find("a:first").addClass("active");
      return $(window).on("scroll", function() {
        var current_position;
        current_position = $(this).scrollTop();
        if (current_position >= menu_marker_top && current_position <= menu_marker_bottom) {
          menu_marker.find("a").removeClass("active");
        }
        return menu_marker_section.each(function() {
          var menu_marker_section_bottom, menu_marker_section_top;
          menu_marker_section_top = $(this).offset().top;
          menu_marker_section_bottom = menu_marker_section_top + $(this).outerHeight();
          if (current_position >= menu_marker_section_top && current_position <= menu_marker_section_bottom) {
            menu_marker.find("a").removeClass("active");
            return menu_marker.find("a[href='#" + $(this).attr("id") + "']").addClass("active");
          }
        });
      });
    };
  })(jQuery);

  $.fn.cb_off_canvas_sidebar = function() {
    var cb_off_canvas_close, cb_off_canvas_open;
    cb_off_canvas_close = function() {
      $(".off-canvas-navicon, .off-canvas--right, .off-canvas--left").removeClass("off-canvas--is-open");
      return $(".reset-overlay").removeClass("reset-overlay--is-raised");
    };
    cb_off_canvas_open = function(e) {
      var off_canvas;
      e.preventDefault();
      if ($(".off-canvas-navicon").hasClass("off-canvas--is-open")) {
        return cb_off_canvas_close;
      } else {

        /* jshint validthis: true */
        off_canvas = $(this).data("off-canvas");
        $(".reset-overlay").addClass("reset-overlay--is-raised");
        $("[data-off-canvas=" + off_canvas + "]").addClass("off-canvas--is-open");
        $("#" + off_canvas).addClass("off-canvas--is-open");
        $(".off-canvas--xs, .off-canvas--sm, .off-canvas--md, .off-canvas--lg").scrollTop(0);
        return $(".reset-overlay--is-raised, .off-canvas--is-open a[href*='#'], .off-canvas__close").on("click", cb_off_canvas_close);
      }
    };
    $("[class*='off-canvas--xs']").prev().addClass("show--xs-only");
    $("[class*='off-canvas--sm']").prev().addClass("show--sm-down");
    $("[class*='off-canvas--md']").prev().addClass("show--md-down");
    $("[class*='off-canvas--lg']").prev().addClass("show--lg-down");
    $(".off-canvas-navicon").on("click", cb_off_canvas_open);
    return $(".off-canvas-navicon").on("touchstart", cb_off_canvas_open);
  };

  $.fn.cb_pagination = function() {
    return $(".pagination__current a, .pagination__current").click(function(e) {
      return e.preventDefault();
    });
  };

  $.fn.cb_popover = function() {
    var cb_popover_open;
    cb_popover_open = function(e) {
      var cb_popover_close, popover_id;
      e.preventDefault();

      /* jshint validthis: true */
      $(this).blur();
      popover_id = $(this).attr("data-popover");
      $("#" + popover_id).scrollTop(0).parent().addClass("popover__wrap--is-open");
      $(".reset-overlay").addClass("reset-overlay--is-raised-higher reset-overlay--darken");
      $(".popover").click(function(e) {
        return e.stopPropagation();
      });
      cb_popover_close = function() {
        $(".popover__wrap").removeClass("popover__wrap--is-open");
        return $(".reset-overlay").removeClass("reset-overlay--is-raised-higher reset-overlay--darken");
      };
      $(".popover__wrap--is-open").on("click", cb_popover_close);
      $(".popover__close").on("click", cb_popover_close);
      return popover_id = null;
    };
    $(this).wrap("<div class='popover__wrap' />");
    return $(".popover__open").on("click", cb_popover_open);
  };

  $.fn.cb_table_wide = function() {
    return $(".table").each(function() {
      $(this).parent().parent().removeClass("table--wide");
      if ($(this).parent()[0].scrollWidth - 1 > $(".table--wrap-inner").innerWidth()) {
        return $(this).parent().parent().addClass("table--wide");
      } else {
        return $(this).parent().parent().removeClass("table--wide");
      }
    });
  };

  $.fn.cb_table = function() {
    $(this).wrap("<div class='table--wrap-outer'><div class='table--wrap-inner' /></div>");
    $.fn.cb_table_wide();
    return $(window).resize($.fn.cb_debounce((function() {
      return $.fn.cb_table_wide();
    }), 250));
  };

  $.fn.cb_slideshow = function() {
    var cb_slideshow_next, cb_slideshow_prev, slideCount, slideLeftPos, slideTotal, slideWidth;
    $(this).prepend('<div class="slideshow__prev"><span></span></div><div class="slideshow__next"><span></span></div>');
    $(this).append('<div class="slideshow__pager-wrap" />');
    $('.slideshow__item').each(function() {
      return $('.slideshow__pager-wrap').append('<div class="slideshow__pager" />');
    });
    slideLeftPos = $('.slideshow__inner').scrollLeft();
    slideWidth = $('.slideshow').width();
    slideTotal = $('.slideshow__inner').children().length;
    slideCount = 1;
    $(window).resize($.fn.cb_debounce((function() {
      slideLeftPos = $('.slideshow__inner').scrollLeft();
      slideWidth = $('.slideshow').width();
      return $('.slideshow__inner').animate({
        scrollLeft: slideWidth * slideCount - slideWidth
      }, 250);
    }), 250));
    cb_slideshow_prev = function() {
      if (slideCount > 1) {
        $('.slideshow__inner').animate({
          scrollLeft: slideLeftPos - slideWidth
        }, {
          duration: 500,
          complete: function() {
            slideLeftPos = $('.slideshow__inner').scrollLeft();
            return slideCount = slideCount - 1;
          }
        });
        $('.slideshow__pager').removeClass('is-current');
        return $('.slideshow__pager:nth-of-type(' + (slideCount - 1) + ')').addClass('is-current');
      } else if ($('.slideshow').hasClass('slideshow--looping') && slideCount === 1) {
        $('.slideshow__inner').animate({
          scrollLeft: slideWidth * slideTotal
        }, {
          duration: 500,
          complete: function() {
            slideLeftPos = $('.slideshow__inner').scrollLeft();
            return slideCount = slideTotal;
          }
        });
        $('.slideshow__pager').removeClass('is-current');
        return $('.slideshow__pager:nth-of-type(' + slideTotal + ')').addClass('is-current');
      }
    };
    $('.slideshow__prev span').on('click', function() {
      return cb_slideshow_prev();
    });
    cb_slideshow_next = function() {
      if (slideCount < slideTotal) {
        $('.slideshow__inner').animate({
          scrollLeft: slideLeftPos + slideWidth
        }, {
          duration: 500,
          complete: function() {
            slideLeftPos = $('.slideshow__inner').scrollLeft();
            return slideCount = slideCount + 1;
          }
        });
        $('.slideshow__pager').removeClass('is-current');
        return $('.slideshow__pager:nth-of-type(' + (slideCount + 1) + ')').addClass('is-current');
      } else if ($('.slideshow').hasClass('slideshow--looping') && slideCount === slideTotal) {
        $('.slideshow__inner').animate({
          scrollLeft: 0
        }, {
          duration: 500,
          complete: function() {
            slideLeftPos = $('.slideshow__inner').scrollLeft();
            return slideCount = 1;
          }
        });
        $('.slideshow__pager').removeClass('is-current');
        return $('.slideshow__pager:nth-of-type(' + 1 + ')').addClass('is-current');
      }
    };
    $('.slideshow__next span').on('click', function() {
      return cb_slideshow_next();
    });
    $('.slideshow__pager:nth-of-type(' + slideCount + ')').addClass('is-current');
    return $('.slideshow__pager').on('click', function() {
      slideCount = $(this).index() + 1;
      slideLeftPos = slideWidth * (slideCount - 1);
      $('.slideshow__inner').animate({
        scrollLeft: slideWidth * (slideCount - 1)
      }, 500);
      $('.slideshow__pager').removeClass('is-current');
      return $(this).addClass('is-current');
    });
  };

  $.fn.cb_tabs = function() {
    var cb_tabs_left_height, cb_tabs_operation, tabsLeft_minHeight;
    cb_tabs_operation = function() {

      /* jshint validthis: true */
      var tab_id;
      tab_id = $(this).attr("data-tabs");
      $(this).siblings().removeClass("tabs__label--is-front").removeClass("tabs__card--is-front");
      $(this).addClass("tabs__label--is-front");
      return $("#" + tab_id).addClass("tabs__card--is-front");
    };
    cb_tabs_left_height = function() {
      var tabsLeft_height;
      tabsLeft_height = $(".tabs--left .tabs__card--is-front").height();
      $(".tabs--left .tabs__card--is-front .tabs__card-content").css({
        "min-height": tabsLeft_minHeight * 1.2
      });
      tabsLeft_height = $(".tabs--left .tabs__card--is-front").height();
      return $(".tabs--left").height(tabsLeft_height);
    };
    $(".tabs__label:first-of-type").addClass("tabs__label--is-front");
    $(".tabs__label:first-of-type + .tabs__card").addClass("tabs__card--is-front");
    $(".tabs__label").on("click", cb_tabs_operation);
    $(".tabs__label").on("touchstart", cb_tabs_operation);
    tabsLeft_minHeight = 0;
    $(".tabs--left .tabs__label").each(function() {
      return tabsLeft_minHeight += $(this).outerHeight();
    });
    cb_tabs_left_height();
    $(".tabs--left .tabs__label").on("click", cb_tabs_left_height);
    $(".tabs--left .tab__label").on("touchstart", cb_tabs_left_height);
    return $(window).resize($.fn.cb_debounce((function() {
      return cb_tabs_left_height();
    }), 250));
  };


  /*
  CODEBASE 2.x PREVIEW || MIT Licence
  ===========================
  http://simonpadbury.github.io/Codebase/
   */


  /*
  CODEBASE MASTER PLUGIN
   */

  "use strict";

  $.fn.codebase = function() {
    return $(document).ready(function() {
      $("body").cb_reset_overlay();
      $(".showhide__toggle").cb_showhide_toggle();
      $(".showhide__dismiss").cb_showhide_dismiss();
      $(".dropdown__toggle").cb_dropdown_toggle();
      $(".off-canvas-navicon").cb_off_canvas_sidebar();
      $(".pagination").cb_pagination();
      $(".popover").cb_popover();
      $(".slideshow").cb_slideshow();
      $(".tabs").cb_tabs();
      $(".table").cb_table();
      return $(".menu-marker").cb_menu_marker();
    });
  };

  $(document).codebase();

}).call(this);
