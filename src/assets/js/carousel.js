+(function($) {
  "use strict";

  var Carousel = $.fn.carousel.Constructor;

  Carousel.prototype.zoom = function() {
    var $this = $(this);
    var $src = $this.attr("src");
    var $title = $this
      .next(".carousel-caption")
      .text()
      .trim();
    console.log($title);
    var $modal = $this.attr("data-modal-picture");
    var $modalElement = $.find($modal);
    $($modalElement)
      .find(".modal-body")
      .find("img")
      .attr("src", $src);
    $($modalElement)
      .find(".modal-title")
      .text($title);

    //$($modal).modal("show");
    $($modal)
      .appendTo("body")
      .modal("show");
  };

  $(document).on(
    "click.bs.carousel.data-api",
    "[data-modal-picture]",
    Carousel.prototype.zoom
  );
})(jQuery);

