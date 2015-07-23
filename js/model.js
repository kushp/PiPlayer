'use strict';

/**
 * A function that creates and returns all of the model classes and constants.
 */
function createModelModule() {

    /**
     * PiModel keeps track of next/current pi output and stuff.
     * @constructor
     */
    var PiModel = function() {
        var self = this;
        this.spigotCallback = function(digit) {
            self.digitCounter++;
            var toAppend = self.digitCounter == 2 ? "." + digit : digit;
            _.each(self.listeners, function(listener) {
                listener("NEW", toAppend, self.digitCounter);
            });
        };
        this.spigot = new SpigotPi(this.spigotCallback);
        this.initial = this.spigot.save();
        this.digitCounter = 0;
        this.listeners = [];
    };

    _.extend(PiModel.prototype, {

        /**
         * Adds a listener to be notified of when the model changes.
         * @param listener_fn A function with the signature: (eventData),
         * where eventType is type of event, piAppend is string to be appended, countSet is digit count to be set.
         */
        addListener: function(listener_fn) {
            if (!_.isFunction(listener_fn)) {
                throw new Error("Invalid arguments to ImageModel.addListener: " + JSON.stringify(arguments));
            }
            this.listeners.push(listener_fn);
        },

        /**
         * Removes the given listener from this object.
         * @param listener_fn
         */
        removeListener: function(listener_fn) {
            if (!_.isFunction(listener_fn)) {
                throw new Error("Invalid arguments to ImageModel.removeListener: " + JSON.stringify(arguments));
            }
            this.listeners = _.without(this.listeners, listener_fn);
        },

        /*
         * Gen next pi digit.
         */
        nextDigit: function() {
            this.spigot.next_();
        },

        /*
         * Reset spigot
         */
        reset: function() {
            this.spigot.load(this.initial);
            this.digitCounter = 0;
            _.each(this.listeners, function(listener) {
                listener("RESET", undefined, 0);
            });
        }
    });

    // Return an object containing all of our classes and constants
    return {
        PiModel: PiModel
    };
}