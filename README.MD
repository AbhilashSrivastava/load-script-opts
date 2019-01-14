# load-script (with body and head insertion support)
    Inspired from: https://github.com/eldargab/load-script 
    Dynamic script loading in head or body depending on options.

## Installation

via npm

```
$ npm install load-script-opts
```

## API
`load-script` appends a `script` node to the `<head>` or `<body>` element in the dom.

`require('load-script-opts')` returns a function of the following interface:  `function(url[, opts][, cb]) {}`


### [, opts]
A map of options.  Here are the currently supported options:

* `status`- Used to determine whether script is to be inserted in body or head.
            IF STATUS IS 1, INSERT IN BODY.
            IF STATUS IS 0 or NOT PROVIDED, INSERT IN HEAD.
            By default, script will be inserted in head.
* `async` - A boolean value used for `script.async`.  By default this is `true`.
* `attrs` - A map of attributes to set on the `script` node before appending it to the DOM.  By default this is empty.
* `charset` - A string value used for `script.charset`.  By default this is `utf8`.
* `text` - A string of text to append to the `script` node before it is appended to the DOM.  By default this is empty.
* `type` - A string used for `script.type`.  By default this is `text/javascript`.

### [, cb]
A callback function of the following interface: `function(err, script) {}` where `err` is an error if any occurred and `script` is the `script` node that was appended to the DOM.

## Example Usage

```javascript
var load = require('load-script-opts')

load('something.js', function (err, script) {
  if (err) {
    // print useful message
  }
  else {
    console.log(script.src);// Prints 'foo'.js'
    // use script
    //in IE8 and below loading error wouldn't be reported
  }
})
```
