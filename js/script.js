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
    var currentIndex = icons.indexOf( currentClass );
    if( (currentIndex+1) > (icons.length-1) ) {
      elem.addClass( icons[0] );
    }
    else {
      elem.addClass( icons[(currentIndex+1)] );
    }
  };

  return privates;
})(window, $( 'body' ), {}).attach();