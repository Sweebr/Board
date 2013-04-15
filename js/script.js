$(document).foundation();

(function(window, body, privates, undefined) {
  var icons, colors, assignees;

  // Attach events
  privates.attach = function attach() {
    body.on( 'click', '.icon.columns', privates.pickIcon );
    body.on( 'click', '.assignee.columns', privates.pickAvatar );
  };

  // Pick avatar from the list
  assignees = [ 'chase', 'rene' ];
  privates.pickAvatar = function pickAvatar() {
    var elem = $(this).find( 'span' ) 
      , currentClass = elem.attr( 'class' ).replace( 'avatar ', '' );

    // Find current active icon
    privates.pickClass(currentClass, assignees, elem, function(elem, list, index){
      elem.addClass( 'avatar ' + list[( index )] );
    });
  };

  // Pick icons from the list
  icons = [ 'check-empty', 'refresh', 'group', 'check', 'ban-circle', 'time' ];
  colors = [ 'white', 'orange', 'blue', 'green', 'red', 'gray' ];
  privates.pickIcon = function pickIcon() {
    var elem = $(this).find( 'span' ) 
      , currentClass = elem.attr( 'class' ).substr(5);

    // Find current active icon
    privates.pickClass(currentClass, icons, elem, function(elem, list, index){
      elem.addClass( 'icon-' + list[( index )] ).parent().parent().parent().parent().removeAttr( 'class' ).addClass( colors[( index )] + ' row item' );
    });
  };

  // Pick the next class in this list
  privates.pickClass = function pickClass(currentClass, list, elem, cb) {
    elem.removeAttr( 'class' );
    var currentIndex = list.indexOf( currentClass );
    if( (currentIndex+1) > (list.length-1) ) {
      cb(elem, list, 0);
    }
    else {
      cb(elem, list, (currentIndex+1));
    };
  };

  return privates;
})(window, $( 'body' ), {}).attach();