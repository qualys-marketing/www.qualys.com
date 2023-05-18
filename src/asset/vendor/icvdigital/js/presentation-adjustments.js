/*
 * Slide player up and down based on click on the "Enlarge Slide" button
 */
(function($) {
    'use strict';
    $(document).ready(function () {
        $("#btn_enlarge_slide").on("click", function (event) {
            $("#player_outer").addClass("expanded");
            $('iframe', window.parent.document).addClass("expanded");
            $('.video-presentation-overlay2', window.parent.document).addClass("expanded");
        });

        $("#btn_normal_slide").on("click", function (event) {
            $("#player_outer").removeClass("expanded");
            $('iframe', window.parent.document).removeClass("expanded");
            $('.video-presentation-overlay2', window.parent.document).removeClass("expanded");
        });
    });
}(jQuery));