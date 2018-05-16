(function(global) {

  function ajax(args) {
    // args { url, params, json, method, before, success, error, always }
    // For POST args.params must be a formData
    if(args.before) {
      args.before();
    }
    var request = new XMLHttpRequest();
    if(args.method && args.method.toLowerCase() == "post") {
      request.open(args.method, args.url, true);
    } else {
      args.method = 'GET';
      args.params = args.params ? ((args.url.indexOf('?') === -1 ? '?' : '&') + args.params) : '';
      request.open(args.method, encodeURI(args.url + args.params), true);
    }
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = args.json ? JSON.parse(request.responseText) : request.responseText;
        if(args.success) {
          args.success(data);
        }
        if(args.always) {
          args.always(data);
        }
      } else {
        // We reached our target server, but it returned an error
        if(args.error) {
          args.error();
        }
        if(args.always) {
          args.always(false);
        }
      }
    };
    request.onerror = function() {
      // There was a connection error of some sort
      if(args.error) {
        args.error();
      }
      if(args.always) {
        args.always(false);
      }
    };
    if(args.method.toLowerCase() == "post") {
      request.send(args.params);
    } else {
      request.send();
    }
  }

  if(global.ff) global.ff.ajax = ajax;
  else global.ff = { "ajax": ajax };

})(this);
