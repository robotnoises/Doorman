# Doorman

Doorman is a small (~2kb minified) javascript library that identifies *older* browsers via **feature detection** and (politely) turns them away.

### This is not a polyfill library.

If Doorman detects that a *modern* feature is not supported natively in a user's browser, it will immediately redirect them to another page of your choosing. **Only use this if you do not wish to support older browsers at all**.

One example would be if you are developing an HTML5 game using the `canvas` element. Rather than injecting a dependency like [KineticJs](http://kineticjs.com/) to support older versions of Internet Explorer, you can use Doorman to check for `canvas` support. If the feature is not supported natively by the user's browser, they will be redirected to another page like [whatbrowser.org](http://www.whatbrowser.org), giving them information about upgrading.

> "I feel like people should be able to use whatever browser they want."

I agree, but I also think that developers have the right to refuse certain browsers if they don't want to support them.

> "Fine. But what if I really want to support older browsers?"

Please check-out [Modernizr](http://modernizr.com/docs/#whatis).

Modernizr is a much more feature-rich browser feature detection library that will optionally [allow you to add polyfills when a user's browser does not support a modern feature natively](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills).

### Feature detection vs. User-Agent

One technique to detect a user's browser is by reading the `User-Agent`. When a browser sends a request to a server, the server should be able to identify the requesting browser by reading the User-Agent string in the request header. However, since [it is very easy for a user to change their User-Agent](http://www.howtogeek.com/113439/how-to-change-your-browsers-user-agent-without-installing-any-extensions/) and that they are, well, [actually pretty weird to begin with](http://webaim.org/blog/user-agent-string-history/), it is a widely-held belief that User-Agent is unreliable and should not be used for this purpose.

**tl;dr**: you can ask a browser for its name, but it can lie.

`Feature detection` is a reliable technique because you are literally testing to see if the requesting browser can do specific things not commonly found in older versions.

### Getting started / Basic usage

1.) Get the latest version (note: this has not released yet!)

2.) Include the script inside the `<head>` tag:

```
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Browser Test Example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <script src="/path/to/doorman.min.js"></script>
    </head>
```

3.) At the bottom of your page, before the ending `</body>` tag:

```
...
  <script>
    // Redirect older browsers to foo.com
    doorman.check().redirect('http://www.foo.com');
  </script>
  </body>
</html>
```

### Special thanks

This project is mostly based on the excellent book [Dive Into HTML5](http://diveintohtml5.info/index.html) by Mark Pilgrim, most notably, [Chapter 2. Detecting HTML5 Features](http://diveintohtml5.info/detect.html).
