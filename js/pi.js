/**
 * Created by Kush Patel on 12/03/2015.
 */

$(document).ready(function() {
    var modelModule = createModelModule();
    var viewModule = createViewModule();
    var piModel = new modelModule.PiModel();
    var piView = new viewModule.PiView(piModel);

    var intervalTime = 100;
    var interval = setInterval(function() {
        piModel.nextDigit();
    }, intervalTime);

    $("#toggle").click(function(event) {
        event.preventDefault();
        if(interval != undefined) {
            clearInterval(interval);
            interval = undefined;
            $(this).removeClass("icon-pause2");
            $(this).addClass("icon-play3");
        } else {
            interval = setInterval(function() {
                piModel.nextDigit();
            }, intervalTime);
            $(this).removeClass("icon-play3");
            $(this).addClass("icon-pause2");
        }
    });

    $("#reset").click(function(event) {
        event.preventDefault();
        piModel.reset();
    });

    $( ".slider" ).slider({
        value: 1399,
        min: 1250,
        max: 1500,
        slide: function(event, ui) {
            intervalTime = 1500 - ui.value + 1;
            if(interval != undefined) {
                clearInterval(interval);
                interval = setInterval(function () {
                    piModel.nextDigit();
                }, intervalTime);
            }
        }
    });

    $("#header-pi").click(function(event) {
        event.preventDefault();
        $(".pieModal").dialog({
            modal: true,
            width: '620px',
            dialogClass: 'titleMod'
        });
    });
});