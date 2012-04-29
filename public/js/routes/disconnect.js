// Generated by CoffeeScript 1.3.1
(function() {

  define(["smog/server", "smog/notify"], function(server, notify) {
    return function() {
      return server.disconnect(function(err, res) {
        if (err != null) {
          return notify.error("Error disconnecting: " + err);
        }
        return window.location = '/';
      });
    };
  });

}).call(this);
