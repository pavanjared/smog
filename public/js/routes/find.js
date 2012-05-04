// Generated by CoffeeScript 1.3.1
(function() {
  var getCreated;

  getCreated = function(id) {
    return prettyDate(parseInt(id.slice(0, 8), 16) * 1000) || "Unknown";
  };

  define(["smog/server", "smog/notify", "smog/editor", "templates/edit", "templates/collection"], function(server, notify, editor, templ, grid) {
    return function(_arg) {
      var edit, find, name, realname, setup;
      name = _arg.name;
      realname = name.toLowerCase();
      find = function(query, cb) {
        return server.collection({
          collection: realname,
          type: 'find',
          query: query,
          options: {
            limit: 10000
          }
        }, function(err, docs) {
          var doc, idx, _i, _len;
          if (err != null) {
            return notify.error("Error retrieving documents: " + err);
          }
          if (docs.length >= 9999) {
            notify.alert("Document limit reached - only displaying first 10000");
          }
          for (idx = _i = 0, _len = docs.length; _i < _len; idx = ++_i) {
            doc = docs[idx];
            doc.created = getCreated(doc._id);
          }
          $('#content').html(grid({
            name: name,
            documents: docs
          }));
          return cb();
        });
      };
      setup = function() {
        return $('#datagrid').dataTable({
          sDom: "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
          sPaginationType: "bootstrap",
          sScrollX: "100%",
          bScrollCollapse: true,
          bStateSave: true,
          bAutoWidth: true,
          oLanguage: {
            sSearch: "",
            sLengthMenu: "_MENU_ records per page"
          }
        });
      };
      $('#content').append(templ({
        title: 'Find',
        id: realname,
        button: 'Execute'
      }));
      edit = editor.create("" + realname + "-edit-view", {
        wrap: 100,
        worker: false
      });
      $('#edit-modal').modal();
      $('#edit-modal').on('hidden', function() {
        edit.destroy();
        return $('#edit-modal').remove();
      });
      return $('#edit-button').click(function() {
        $('#edit-modal').modal('hide');
        return find(edit.getSession().getValue(), setup);
      });
    };
  });

}).call(this);
