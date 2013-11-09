﻿ /* globals History */

$.modalDialog.iframeLoadTimeout = 1000;
$.modalDialog.animationDuration = 100;

describe("jQuery.moddalDialog.enableHistory()", function() {
    var assert = chai.assert;

    var DIALOG_PARAM_NAME = "testdialogparam";

    it("should open a dialog specified in the current URL", function(done) {
        var qs = "?" + DIALOG_PARAM_NAME + "=" + encodeURIComponent("node,#simpleDialog");

        if (document.location.search != qs) {
            History.pushState(null, null, document.location.pathname + qs);
        }

        var dialog;

        $.modalDialog.enableHistory(DIALOG_PARAM_NAME)
            .then(function() {
                var qs = $.currentQueryString();
                assert.isString(qs[DIALOG_PARAM_NAME], "The dialog is open: there should be dialog parameters in the URL");

                dialog = $.modalDialog.getCurrent();
                assert.isNotNull(dialog, "A current dialog should be returned");
            })
            .then(function() {
                return dialog.close();
            })
            .then(function() {
                done();
            });
    });

});
