$(document).foundation();

(function(window, body, privates, undefined) {
  var icons;

  // Attach events
  privates.attach = function attach() {
    body.on( 'click', '.icon.columns', privates.pickIcon );
  };

  // Pick icons from the list
  icons = [ 'check-empty', 'refresh', 'group', 'check', 'ban-circle', 'time' ];
  pickIcon = function pickIcon() {
    var elem = $(this).find( 'span' ) 
      , currentClass = elem.attr( 'class' );
    elem.removeAttr( 'class' );

    // Find current active icon
    privates.pickClass(currentClass, icons, elem);
  };

  // Pick the next class in this list
  pickClass = function pickClass(currentClass, list, elem) {
    elem.removeAttr( 'class' );
    var currentIndex = list.indexOf( currentClass );
    if( (currentIndex+1) > (list.length-1) ) {
      elem.addClass( list[0] );
    }
    else {
      elem.addClass( list[(currentIndex+1)] );
    };
  };

  return privates;
})(window, $( 'body' ), {}).attach();