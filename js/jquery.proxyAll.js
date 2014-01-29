(function ($) {
    // Given an object, will bind its methods' context to the object using $.proxy()
    $.proxyAll = function (obj, methods) {
        // If no methods are specified, use all properties of obj that are functions
        if (!methods) {
            methods = [];
            for (var prop in obj) {
                if (typeof obj[prop] == "function") {
                    methods.push(prop);
                }
            }
        }
        // If methods is not an array, parse arguments as a param array
        else if (!$.isArray(methods)) {
            methods = Array.prototype.slice.call(arguments, 1);
        }

        // Create a bound proxy function for specified methods on obj
        $.each(methods, function (i, method) {
            obj[method] = $.proxy(obj[method], obj);
        });
    };

})(jQuery);
