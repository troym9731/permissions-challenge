var baseUrl = 'http://localhost:3000/';

var allUsers = $.get(baseUrl + 'users');

$(function() {

  var source = $('#user-list-items').html();
  var userTmpl = Handlebars.compile(source);

  $('.users').on('click', function() {
    $('section').html('<ul></ul>');

    var arr = [];

    allUsers
      .done(function(users) {
        users.forEach(function(user) {
          var item = userTmpl(user);

          arr.push(item);
        })
        var html = arr.join('');
        $('ul').append(html);
      })
  })

  var source2 = $('#permissions').html();
  var permissionsTmpl = Handlebars.compile(source2);

  $('section').on('click', 'button', function() {
    $('section').html('');
    var userId = $(this).data('id');
    var permissions = [];
    var obj = {};

    allUsers
      .done(function(users) {
        users.forEach(function(user) {
          if (userId == user.id) {
            obj.name = user.name
          }
        })
      })
    $.get(baseUrl + 'permissions')
      .done(function(userPermissions) {
        userPermissions.forEach(function(userPermission) {
          if (userId == userPermission.userId) {
            permissions.push(userPermission.permissions);
          }
        })

        obj.permissions = permissions;

        var html = permissionsTmpl(obj);
        $('section').append(html);
      })
  })

})