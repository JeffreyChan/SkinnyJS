describe("jquery.url", function () {
    var assert = chai.assert;
    var UNDEFINED;

    describe("#ctor()", function () {
        it("should parse a URL with all parts specified", function () {
            var URL = "http://www.vistaprint.com:80/vp/mypath/mypage.htm?val1=1&val2=2#myhash";

            var url = new $.Url(URL);

            assert.strictEqual(url.protocol(), "http:");
            assert.strictEqual(url.host(), "www.vistaprint.com:80");
            assert.strictEqual(url.hostname(), "www.vistaprint.com");
            assert.strictEqual(url.port(), "80");
            assert.strictEqual(url.pathname(), "/vp/mypath/mypage.htm");
            assert.strictEqual(url.search(), "?val1=1&val2=2");
            assert.strictEqual(url.hash(), "#myhash");
            assert.strictEqual(url.getItem("val1"), "1");
            assert.deepEqual(url.queryString, {
                val1: "1",
                val2: "2"
            });

            assert.strictEqual(url.toString(), URL);
        });

        it("should parse a virtual path", function () {
            var URL = "/vp/mypath/mypage.htm?val1=1&val2=2#myhash";

            var url = new $.Url(URL);

            assert.strictEqual(url.pathname(), "/vp/mypath/mypage.htm");
            assert.strictEqual(url.search(), "?val1=1&val2=2");
            assert.strictEqual(url.hash(), "#myhash");
            assert.strictEqual(url.getItem("val1"), "1");
            assert.deepEqual(url.queryString, {
                val1: "1",
                val2: "2"
            });

            assert.strictEqual(url.toString(), URL);
        });

        it("should parse a host only", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);

            assert.strictEqual(url.host(), "www.vistaprint.com");

            assert.strictEqual(url.toString(), URL);
        });

        it("should parse a host with port", function () {
            var URL = "http://www.vistaprint.com:8020";

            var url = new $.Url(URL);

            assert.strictEqual(url.host(), "www.vistaprint.com:8020");
            assert.strictEqual(url.pathname(), "");

            assert.strictEqual(url.toString(), URL);
        });

        it("should parse a host with port and trailing slash", function () {
            var URL = "http://www.vistaprint.com:8020/";

            var url = new $.Url(URL);

            assert.strictEqual(url.host(), "www.vistaprint.com:8020");
            assert.strictEqual(url.pathname(), "/");

            assert.strictEqual(url.toString(), URL);
        });

        it("should parse a simple string as a pathname", function () {
            var URL = "foo";

            var url = new $.Url(URL);

            assert.strictEqual(url.host(), "");
            assert.strictEqual(url.pathname(), "foo");

            assert.strictEqual(url.toString(), URL);
        });

        it("should parse a url with a question mark only", function () {
            var URL = "foo?";

            var url = new $.Url(URL);

            assert.strictEqual(url.host(), "");
            assert.strictEqual(url.pathname(), "foo");
            assert.strictEqual(url.search(), "");

            assert.strictEqual(url.toString(), "foo");
        });

        it("should parse a url with a querystring", function () {
            var URL = "foo?bar=baz";

            var url = new $.Url(URL);

            assert.strictEqual(url.host(), "");
            assert.strictEqual(url.pathname(), "foo");
            assert.strictEqual(url.search(), "?bar=baz");

            assert.strictEqual(url.toString(), "foo?bar=baz");
        });

        it("should parse a url with a hash", function () {
            var URL = "foo#somehash";

            var url = new $.Url(URL);

            assert.strictEqual(url.host(), "");
            assert.strictEqual(url.pathname(), "foo");
            assert.strictEqual(url.search(), "");
            assert.strictEqual(url.hash(), "#somehash");
            assert.strictEqual(url.toString(), "foo#somehash");
        });

        it("should parse a url with a trailing colon", function () {
            var URL = "http://www.vistaprint.com:/foo";

            var url = new $.Url(URL);

            assert.strictEqual(url.host(), "www.vistaprint.com");
            assert.strictEqual(url.pathname(), "/foo");
            assert.strictEqual(url.port(), "");
        });

        it("should support no arguments", function () {
            var url = new $.Url();
            url.host("www.vistaprint.com");

            assert.strictEqual(url.toString(), "http://www.vistaprint.com");
        });
    });

    describe("#protocol()", function () {
        it("should act as a setter with an argument", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.protocol("https:");

            assert.strictEqual(url.protocol(), "https:");
            assert.strictEqual(url.toString(), "https://www.vistaprint.com");
        });

        it("should convert null to empty string", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.protocol(null);

            assert.strictEqual(url.protocol(), "");
            assert.strictEqual(url.toString(), "http://www.vistaprint.com");
        });

        it("should append colon if not present", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.protocol("https");

            assert.strictEqual(url.protocol(), "https:");
            assert.strictEqual(url.toString(), "https://www.vistaprint.com");
        });
    });

    describe("#hostname()", function () {
        it("should act as a setter with an argument", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.hostname("www.vp.com");

            assert.strictEqual(url.hostname(), "www.vp.com");
            assert.strictEqual(url.toString(), "http://www.vp.com");
        });
    });

    describe("#port()", function () {
        it("should act as a setter with an argument", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.port("8080");

            assert.strictEqual(url.host(), "www.vistaprint.com:8080");
            assert.strictEqual(url.port(), "8080");
            assert.strictEqual(url.toString(), "http://www.vistaprint.com:8080");
        });
    });

    describe("#host()", function () {
        it("should act as a setter with an argument", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.host("www.vp.com");

            assert.strictEqual(url.hostname(), "www.vp.com");
            assert.strictEqual(url.host(), "www.vp.com");
            assert.strictEqual(url.toString(), "http://www.vp.com");
        });

        it("should act as a setter with an argument and port", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.host("www.vp.com:8080");

            assert.strictEqual(url.hostname(), "www.vp.com");
            assert.strictEqual(url.host(), "www.vp.com:8080");
            assert.strictEqual(url.port(), "8080");
            assert.strictEqual(url.toString(), "http://www.vp.com:8080");
        });

        it("should convert a null to an empty string for hostname and port", function () {
            var URL = "http://www.vistaprint.com:8080";

            var url = new $.Url(URL);
            url.host(null);

            assert.strictEqual(url.hostname(), "");
            assert.strictEqual(url.host(), "");
            assert.strictEqual(url.port(), "");
            assert.strictEqual(url.toString(), "");
        });

        it("should convert 0 to a string for hostname and port", function () {
            var URL = "http://www.vistaprint.com:8080";

            var url = new $.Url(URL);
            url.host(0);

            assert.strictEqual(url.hostname(), "0");
            assert.strictEqual(url.host(), "0");
            assert.strictEqual(url.port(), "");
            assert.strictEqual(url.toString(), "http://0");
        });


        it("should delete port if not passed", function () {
            var URL = "http://www.vistaprint.com:8080";

            var url = new $.Url(URL);
            url.host("www.vp.com");

            assert.strictEqual(url.hostname(), "www.vp.com");
            assert.strictEqual(url.host(), "www.vp.com");
            assert.strictEqual(url.port(), "");
            assert.strictEqual(url.toString(), "http://www.vp.com");
        });

        it("should delete trailing colon", function () {
            var URL = "http://www.vistaprint.com:8080";

            var url = new $.Url(URL);
            url.host("www.vp.com:");

            assert.strictEqual(url.hostname(), "www.vp.com");
            assert.strictEqual(url.host(), "www.vp.com");
            assert.strictEqual(url.port(), "");
            assert.strictEqual(url.toString(), "http://www.vp.com");
        });
    });

    describe("#pathname()", function () {
        it("should act as a setter with an argument", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.pathname("/foo/bar/");

            assert.strictEqual(url.pathname(), "/foo/bar/");
            assert.strictEqual(url.toString(), "http://www.vistaprint.com/foo/bar/");
        });

        it("should treat null as empty string", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.pathname(null);

            assert.strictEqual(url.pathname(), "");
            assert.strictEqual(url.toString(), "http://www.vistaprint.com");
        });
    });

    describe("#search()", function () {
        it("should act as a setter with an argument", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.search("?arg1=foo&arg2=bar");

            assert.strictEqual(url.search(), "?arg1=foo&arg2=bar");
            assert.deepEqual(url.queryString, {
                arg1: "foo",
                arg2: "bar"
            });
            assert.strictEqual(url.toString(), "http://www.vistaprint.com?arg1=foo&arg2=bar");
        });

        it("should act as a setter with an argument passing null", function () {
            var URL = "http://www.vistaprint.com?foo=bar";

            var url = new $.Url(URL);
            url.search(null);

            assert.strictEqual(url.search(), "");
            assert.deepEqual(url.queryString, {});
            assert.strictEqual(url.toString(), "http://www.vistaprint.com");
        });

        it("should act as a setter with an argument passing 0", function () {
            var URL = "http://www.vistaprint.com?foo=bar";

            var url = new $.Url(URL);
            url.search(0);

            assert.strictEqual(url.search(), "?0=");
            assert.deepEqual(url.queryString, {
                "0": ""
            });
            assert.strictEqual(url.toString(), "http://www.vistaprint.com?0=");
        });

        it("should act as a setter with an argument passing NaN", function () {
            var URL = "http://www.vistaprint.com?foo=bar";

            var url = new $.Url(URL);
            url.search(NaN);

            assert.strictEqual(url.search(), "?NaN=");
            assert.deepEqual(url.queryString, {
                "NaN": ""
            });
            assert.strictEqual(url.toString(), "http://www.vistaprint.com?NaN=");
        });

        it("should act as a setter with an argument passing a string without a ?", function () {
            var URL = "http://www.vistaprint.com?foo=bar";

            var url = new $.Url(URL);
            url.search("foo=bar");

            assert.strictEqual(url.search(), "?foo=bar");
            assert.deepEqual(url.queryString, {
                foo: "bar"
            });
            assert.strictEqual(url.toString(), "http://www.vistaprint.com?foo=bar");
        });

        it("should act as a setter with an argument passing a string without a ?, key only", function () {
            var URL = "http://www.vistaprint.com?foo=bar";

            var url = new $.Url(URL);
            url.search("foo");

            assert.strictEqual(url.search(), "?foo=");
            assert.deepEqual(url.queryString, {
                foo: ""
            });
            assert.strictEqual(url.toString(), "http://www.vistaprint.com?foo=");
        });
    });

    describe("#hash()", function () {
        it("should convert a null value to an empty string", function () {
            var URL = "http://www.vistaprint.com";
            var url = new $.Url(URL);

            url.hash(null);

            assert.strictEqual(url.hash(), "");
            assert.strictEqual(url.toString(), "http://www.vistaprint.com");
        });

        it("should take a 0 value", function () {
            var URL = "http://www.vistaprint.com";
            var url = new $.Url(URL);

            url.hash(0);

            assert.strictEqual(url.hash(), "#0");
            assert.strictEqual(url.toString(), "http://www.vistaprint.com#0");
        });

        it("should take a value with a # prefix", function () {
            var URL = "http://www.vistaprint.com";
            var url = new $.Url(URL);

            url.hash("#foo");

            assert.strictEqual(url.hash(), "#foo");
            assert.strictEqual(url.toString(), "http://www.vistaprint.com#foo");
        });

        it("should take a value with no # prefix", function () {
            var URL = "http://www.vistaprint.com";
            var url = new $.Url(URL);

            url.hash("foo");

            assert.strictEqual(url.hash(), "#foo");
            assert.strictEqual(url.toString(), "http://www.vistaprint.com#foo");
        });
    });

    describe("#set()", function () {
        it("should set a null item and convert to empty string when deserialized", function () {
            var URL = "http://www.vistaprint.com";

            var url = new $.Url(URL);
            url.set("foo", null);

            assert.strictEqual(url.search(), "?foo=");
            assert.deepEqual(url.queryString, {
                foo: null
            });
            assert.strictEqual(url.toString(), "http://www.vistaprint.com?foo=");
        });

        it("should set a undefined item and convert to empty string when deserialized", function () {
            var URL = "http://www.vistaprint.com";
            var url = new $.Url(URL);
            url.set("foo", UNDEFINED);

            assert.strictEqual(url.search(), "?foo=");
            assert.deepEqual(url.queryString, {
                foo: UNDEFINED
            });
            assert.strictEqual(url.toString(), "http://www.vistaprint.com?foo=");
        });

        it("should throw an exception when passed a null key", function () {
            var url = new $.Url();

            assert.throws(function () {
                url.set(null, null);
            });
        });

        it("should throw an exception when passed an undefined key", function () {
            var url = new $.Url();

            assert.throws(function () {
                url.set(UNDEFINED, null);
            });
        });

        it("should throw an exception when passed an empty string key", function () {
            var url = new $.Url();

            assert.throws(function () {
                url.set("", null);
            });
        });

        it("should take 0 as a key", function () {
            var URL = "http://www.vistaprint.com";
            var url = new $.Url(URL);
            url.set(0, UNDEFINED);

            assert.strictEqual(url.search(), "?0=");
            assert.deepEqual(url.queryString, {
                "0": UNDEFINED
            });
            assert.strictEqual(url.toString(), "http://www.vistaprint.com?0=");
        });

        it("should take NaN as a key", function () {
            var URL = "http://www.vistaprint.com";
            var url = new $.Url(URL);
            url.set(NaN, UNDEFINED);

            assert.strictEqual(url.search(), "?NaN=");
            assert.deepEqual(url.queryString, {
                "NaN": UNDEFINED
            });
            assert.strictEqual(url.toString(), "http://www.vistaprint.com?NaN=");
        });
    });

    describe("#get()", function () {
        it("an item set null should be returned as an empty string", function () {
            var url = new $.Url("/thing");
            url.set("foo", null);

            assert.strictEqual(url.get("foo"), "");
        });

        it("an item set undefined should be returned as an empty string", function () {
            var url = new $.Url("/thing");
            url.set("foo", UNDEFINED);

            assert.strictEqual(url.get("foo"), "");
        });

        it("an item set 0, with a default value passed should return 0", function () {
            var url = new $.Url("/thing");
            url.set("foo", 0);

            assert.strictEqual(url.get("foo", "default"), "0");
        });

        it("an item set undefined, with a default value passed should return empty string", function () {
            var url = new $.Url("/thing");
            url.set("foo", UNDEFINED);

            assert.strictEqual(url.get("foo", "default"), "");
        });

        it("an non-existent item, with a default value passed should return empty string", function () {
            var url = new $.Url("/thing");

            assert.strictEqual(url.get("foo", "default"), "default");
        });

        it("a number should be converted to a string", function () {
            var url = new $.Url("/thing");
            url.set("foo", 1);

            assert.strictEqual(url.get("foo"), "1");
        });
    });

});
