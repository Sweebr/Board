$(document).foundation();

(function(window, body, privates, undefined) {
  var icons, colors;

  // Attach events
  privates.attach = function attach() {
    body.on( 'click', '.icon.columns', privates.pickIcon );
  };

  // Pick icons from the list
  icons = [ 'check-empty', 'refresh', 'group', 'check', 'ban-circle', 'time' ];
  colors = [ 'white', 'orange', 'blue', 'green', 'red', 'gray' ];
  privates.pickIcon = function pickIcon() {
    var elem = $(this).find( 'span' ) 
      , currentClass = elem.attr( 'class' ).substr(5);
    elem.removeAttr( 'class' );

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