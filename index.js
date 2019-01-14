function loadScript(source, options, callback) {
  var __callback, __options, insertTo, scriptToInsert;
  scriptToInsert = document.createElement('script');
  
  if (typeof options === 'function') {
    __callback = options;
    __options = {};
  } else {
    __callback = callback || function(){};
    __options = options || {};
  }



  scriptToInsert.type = __options.type || 'text/javascript'
  scriptToInsert.charset = __options.charset || 'utf8';
  scriptToInsert.async = !!__options.async || false;
  scriptToInsert.src = source;
  
  if (__options.attrs) {
    for (var attribute in __options.attrs) {
      scriptToInsert.setAttribute(attribute, __options.attrs[attribute]);
    }
  }

  if (__options.text) {
    scriptToInsert = '' + __options.text;
  }
  

  var execute = 'onload' in scriptToInsert ? executeOnEnd : polyfillOnEnd;

  execute(scriptToInsert, __callback);

  if (!scriptToInsert.onload) {
    executeOnEnd(scriptToInsert, __callback);
  }

    // If inserting in body, status is 1 else insert in head
    if (__options.status === 1) {
      insertTo = document.body || document.getElementsByTagName('body')[0];
      insertTo.insertBefore(scriptToInsert, insertTo.firstChild);
    } else {
      insertTo = document.head || document.getElementsByTagName('head')[0];
      insertTo.appendChild(scriptToInsert);
    }
}

function executeOnEnd(script, callback) {
  script.onload = function () {
    this.onload = null;
    this.onerror = this.onload;
    callback(null, script);
  }
  script.onerror = function () {
    this.onload = null;
    this.onerror = this.onload;
    callback(new Error('Failed to load ' + this.src), script)
  }

}

function polyfillOnEnd(script, callback) {
  script.onreadystatechange = function () {
    if (this.readyState != 'complete' && this.readyState != 'loaded') {
      return
    }
    this.onreadystatechange = null
    callback(null, script)
  }
}


module.exports = loadScript