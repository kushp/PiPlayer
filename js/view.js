'use strict';

/**
 * A function that creates and returns all of the model classes and constants.
  */
function createViewModule() {

    var PiView = function(piModel) {
        piModel.addListener(function(eventType, piAppend, countSet) {
            if(eventType == "RESET") {
                $("#content-pi").text("");
                $("#header-count").text("0");
            } else {
                $("#content-pi").append(piAppend);
                $("#header-count").text(countSet);
                window.scrollTo(0, document.body.scrollHeight);
            }
        });
    };

    // Return an object containing all of our classes and constants
    return {
        PiView: PiView
    };
}