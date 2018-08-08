$(document).ready(function() {
  $("nav div ul li a").on("click", function(evt) {
    evt.preventDefault();
    var offset = $(this.hash).offset();
    if (offset) {
      $("html, body").animate({
        scrollTop: offset.top
      });
    }
  });

  if ($.browser.msie && $.browser.version <= 7) {
    $("#unsupported-browser-alert").show();
  }

  // Pagination
  // Show first page by default
  $("#page-1").show();

  $("#services-events-pagination")
    .bootpag({
      total: 5
    })
    .on("page", function(event, num) {
      console.log("...in 1...");
      $("#services-events-content div").hide();
      var current_page = "#page-" + num;
      $(current_page).show();
    });

  $("#services-prints-table").DataTable({
    order: [[3, "desc"]]
  });

  // Fixes a problem with the pagination div content dissappearing after navigating to an admin page.
  $("#myhomepage").click(function(num = "1") {
    $("#services-events-pagination")
      .bootpag({
        total: 5
      })
      .on("page", function(event, num) {
        console.log("...in 2...");
        $("#services-events-content div").hide();
        var current_page = "#page-" + num;
        $(current_page).show();
      });
  });
});
