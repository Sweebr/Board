$(document).foundation();

var App = (function(window, body, privates, undefined) {
  var icons, colors, assignees;

  // Get unique number for this row
  privates.generateNumber = function() {
    var newId = 'task:' + Object.keys(localStorage).length;
    localStorage.setItem( newId, JSON.stringify({ 'text': '', 'date': '', 'icon': 'check-empty', 'avatar': 'rene' }) );
    return newId;
  };
  privates.findNumber = function(elem) {
    return elem.closest( '.row.item' ).attr( 'id' );
  };
  privates.updateItem = function(elem, type, item) {
    var id = privates.findNumber(elem);

    // Get localStorage item
    var currentLocalItem = JSON.parse(localStorage.getItem( id ));
    currentLocalItem[( type )] = item;
    localStorage.setItem( id, JSON.stringify(currentLocalItem) );
  };

  // Create a new row
  privates.create = function(id) {
    var example = body.find( '.row.item.clone' ).clone();
    example.removeClass( 'clone' );
    example.attr( 'id', ( id || privates.generateNumber() ) );
    example.appendTo( 'body' );
    return example;
  };

  // Read localStorage
  privates.read = function() {
    Object.keys(localStorage).forEach(function(keyName){
      var item = JSON.parse(localStorage.getItem( keyName ))
        , elem = privates.create(keyName);

      // Update inputs
      elem.find( '.name.columns input' ).val( item.text );
      elem.find( '.date.columns input' ).val( item.date );

      // Update icon
      privates.pickIcon.apply(elem.find( '.icon.columns' ), [item.icon]);
      privates.pickAvatar.apply(elem.find( '.assignee.columns' ), [item.avatar]);
    });
    privates.attach();
    return privates;
  };

  // Attach events
  privates.attach = function attach() {
    body.on( 'click', '.icon.columns', privates.pickIcon );
    body.on( 'click', '.assignee.columns', privates.pickAvatar );
  };

  // Pick avatar from the list
  assignees = [ 'chase', 'rene' ];
  privates.pickAvatar = function pickAvatar(currentItem) {
    var elem = $(this).find( 'span' ) 
      , currentClass = elem.attr( 'class' ).replace( 'avatar ', '' )
      , picker = function(elem, list, index){
          // Update localStorage
          privates.updateItem( elem, 'avatar', list[( index )] );

          // Update local class
          elem.addClass( 'avatar ' + list[( index )] );
        };

    // Overwrite current class
    if( 'string' == typeof currentItem ) {
      elem.removeAttr( 'class' );
      return picker(elem, assignees, assignees.indexOf(currentItem));
    }

    // Find current active icon
    privates.pickClass(currentClass, assignees, elem, picker);
  };

  // Pick icons from the list
  icons = [ 'check-empty', 'refresh', 'group', 'check', 'ban-circle', 'time' ];
  colors = [ 'white', 'orange', 'blue', 'green', 'red', 'gray' ];
  privates.pickIcon = function pickIcon(currentItem) {
    var elem = $(this).find( 'span' ) 
      , currentClass = elem.attr( 'class' ).substr(5)
      , picker = function(elem, list, index){
          // Update localStorage
          privates.updateItem( elem, 'icon', list[( index )] );

          // Update local class
          elem.addClass( 'icon-' + list[( index )] ).closest( '.row.item' ).removeAttr( 'class' ).addClass( colors[( index )] + ' row item' );
        };

    // Overwrite current class
    if( 'string' == typeof currentItem ) {
      elem.removeAttr( 'class' );
      return picker(elem, icons, icons.indexOf(currentItem));
    }

    // Find current active icon
    privates.pickClass(currentClass, icons, elem, picker);
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
})(window, $( 'body' ), {}).read();