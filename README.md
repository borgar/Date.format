Date.format
===========

Provides a nearly full implementation of PHP style date formatting for JavaScript as outlined in the
PHP documentation: http://php.net/date. Missing is all timezone related functionality. This may get
added at a later date, but currently only outputs defaults for UTC zone.

The function comes attached to Date, and you may use it like that:

    var dt = new Date( 1975, 9, 16, 10, 45, 0 );
    Date.format( dt, 'l jS \of F Y h:i:s A' );

If you want to move the function to date prototype where, arguably, it may be more useful:

    Date.prototype.format = function () {
      return Date.format( this, arguments );
    };

That will allow you to do this:

    new Date( 2010, 4, 12, 12, 13, 0 ).format( 'c' );

Additionally, the function support a noConflict method which allows you to unassign it from 
Date and into whatever name or variable you want.

    $.dateFormat = Date.format.noConflict();