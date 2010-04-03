/*
 *  PHP style date formatting for javascript
 *
 *  Version 1.0
 *  URL: http://github.com/borgar/dateformat/
 *  Description: Provides PHP style date formatting for javascript as outlined here: http://php.net/date
 *  Author: Borgar Þorsteinsson
 *  Copyright: Copyright (c) 2009 Borgar Þorsteinsson under MIT license.
 *
 */
/*global Date */
(function(){

  function pad ( n, l ) {
    var s = ( '00000000' + n );
    return s.substring( s.length -( l || 2 ) );
  }

  function date ( d, fmt ) {
    d = d || new Date();
    for ( var r=[], c, i=0; i<fmt.length; i++ ) {
      c = fmt.charAt( i );
      // format characters
      if ( c !== '\\' ) {
        r.push( date.fn[ c ] ? date.fn[ c ]( d ) : c );
      }
      // escpaed characters & unreconized characters
      else {
        c = i < fmt.length ? fmt.charAt( ++i ) : c;
        r.push( c );
      }
    }
    return r.join( '' );
  }

  date.months = 'January February March April May June July August September October November December'.split(' ');
  date.days = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');
  date.fn = {

    // Day of the month, 2 digits with leading zeros
    d: function (d) {
      return pad( d.getDate() );
    },

    // A textual representation of a day, three letters
    D: function (d) {
      return date.days[ d.getDay() ].substr( 0, 3 );
    },

    // Day of the month without leading zeros
    j: function (d) {
      return d.getDate();
    },

    // A full textual representation of the day of the week
    l: function (d) {
      return date.days[ d.getDay() ];
    },

    // ISO-8601 numeric representation of the day of the week
    N: function (d) {
      return d.getDay() || 7;
    },

    // English ordinal suffix for the day of the month, 2 characters
    S: function (d) {
      var a = d.getDate() % 10,
          b = d.getDate() % 100;
      return (a == 1) && (b !== 11) && 'st' || 
             (a == 2) && (b !== 12) && 'nd' || 
             (a == 3) && (b !== 13) && 'rd' || 'th';
    },

    // Numeric representation of the day of the week
    w: function (d) { return d.getDay(); },

    // The day of the year (starting from 0)
    z: function (d) {
      return ~~( ( d.getTime() - (new Date(d.getFullYear(), 0, 1)).getTime() ) / 86400000 );
    },

    // ISO-8601 week number of year, weeks starting on Monday 
    W: function (d) {
      var target = new Date( d.valueOf() );
      var dayNr = (d.getDay() + 6) % 7;
      target.setDate(target.getDate() - dayNr + 3);
      var jan4 = new Date( target.getFullYear(), 0, 4 );
      var dayDiff = (target - jan4) / 86400000;
      return pad( Math.ceil( dayDiff / 7 ) );
    },

    // A full textual representation of a month
    F: function (d) {
      return date.months[ d.getMonth() ];
    },

    // Numeric representation of a month, with leading zeros
    m: function (d) {
      return pad( d.getMonth() + 1 );
    },

    // A short textual representation of a month, three letters
    M: function (d) {
      return date.months[ d.getMonth() ].substr( 0, 3 );
    },

    // Numeric representation of a month, without leading zeros
    n: function (d) {
      return d.getMonth() + 1;
    },

    // Number of days in the given month
    t: function (d) {
      return 32 - new Date( d.getFullYear(), d.getMonth(), 32 ).getDate();
    },

    // Whether it's a leap year (0 = yes, 1 = no)
    L: function (d) {
      return ( 
            ( (d.getFullYear() % 4 === 0) && (d.getFullYear() % 100 !== 0) ) || 
            ( d.getFullYear() % 400 === 0 )
          ) * 1;
    },

    // ISO-8601 year number
    o: function (d) {
      var t = new Date( d.valueOf() );
      t.setDate( t.getDate() - ((d.getDay() + 6) % 7) + 3 );
      return t.getFullYear();
    },

    // A full numeric representation of a year, 4 digits
    Y: function (d) {
      return d.getFullYear();
    },

    // A two digit representation of a year
    y: function (d) {
      return pad( d.getFullYear() % 100 );
    },

    // Lowercase Ante meridiem and Post meridiem
    a: function (d) {
      return d.getHours() >= 12 ? 'pm' : 'am'; 
    },

    // Uppercase Ante meridiem and Post meridiem
    A: function (d) {
      return d.getHours() >= 12 ? 'PM' : 'AM';
    },

    // Swatch Internet time
    B: function (d) {
      var mo = 0; // isDST*60 + timeZoneOffsetInMinutes
      return Math.round( (d.getUTCHours() * 3600 + ((d.getUTCMinutes() - mo + 60) * 60) + d.getUTCSeconds()) * 1000 / 86400 ) % 1000;
    },

    // 12-hour format of an hour without leading zeros
    g: function (d) {
      return d.getHours() % 12 || 12;
    },

    // 24-hour format of an hour without leading zeros
    G: function (d) {
      return d.getHours();
    },

    // 12-hour format of an hour with leading zeros
    h: function (d) {
      return pad( d.getHours() % 12 || 12 );
    },

    // 24-hour format of an hour with leading zeros
    H: function (d) {
      return pad( d.getHours() );
    },

    // Minutes with leading zeros
    i: function (d) {
      return pad( d.getMinutes() );
    },

    // Seconds, with leading zeros
    s: function (d) {
      return pad( d.getSeconds() );
    },

    // Microseconds
    u: function (d) {
      return pad( d.getMilliseconds(), 6 );
    },

    // TODO: Timezone identifier
    e: function (d) {
      return 'UTC';
    },

    // TODO: Whether or not the date is in daylight saving time: 1 if Daylight Saving Time, 0 otherwise.
    I: function (d) {
      return 0;
    },

    // TODO: Difference to Greenwich time (GMT) in hours  Example: +0200
    O: function (d) {
      return '+0000';
    },

    // TODO: Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3)     Example: +02:00
    P: function (d) {
      return '+00:00';
    },

    // TODO: Timezone abbreviation    Examples: EST, MDT ...
    T: function (d) {
      return 'UTC';
    },

    // TODO: Timezone offset in seconds
    Z: function (d) {
      return 0;
    },

    // ISO 8601 date
    c: function (d) {
      return date( d, 'Y-m-d\\TH:i:sP' );
    },

    // RFC 2822 formatted date
    r: function (d) {
      return date( d, 'D, d M Y H:i:s O' );
    },

    // Seconds since the Unix Epoch
    U: function (d) {
      return ~~( d.getTime() / 1000 );
    }

  };

  // expose formatting function to the world
  var safe = Date.format;
  Date.format = date;
  Date.format.noConflict = function () {
    if ( typeof safe === 'undefined' ) {
      delete Date.format;
    }
    else {
      Date.format = safe;
    }
    return date;
  };

})();