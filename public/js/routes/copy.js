// Generated by CoffeeScript 1.3.1
(function() {

  define(["smog/notify", "smog/editor", "templates/copy"], function(notify, editor, templ) {
    return function(_arg) {
      var edit, id, name, realname;
      name = _arg.name, id = _arg.id;
      realname = name.toLowerCase();
      $('#content').append(templ({
        id: id,
        name: realname,
        value: $("#" + id + "-value").text()
      }));
      edit = editor.create("" + id + "-copy-view", "json");
      $('#copy-modal').modal('show');
      $('#copy-modal').on('shown', function() {
        return edit.resize();
      });
      return $('#copy-modal').on('hidden', function() {
        return $('#copy-modal').remove();
      });
    };
  });

}).call(this);
