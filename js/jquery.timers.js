/*p.p1 {
 margin: 0;
 font: 16.0px Consolas;
 color: #a5b2b9
}p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px Consolas; min-height: 19.0px}p.p3 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px Consolas; color: #596972}p.p4 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px Consolas; color: #b58a00}p.p5 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px Consolas; color: #2eafa9}p.p6 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px Consolas; color: #da6c34}p.p7 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px Consolas; color: #ad5cff}p.p8 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px Consolas; color: #97a700}p.p9 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px Consolas; color: #3c7400}p.p10 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px Consolas; color: #596972; min-height: 19.0px}p.p11 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px Consolas; color: #6b82d9}span.s1 {color: #596972}span.s2 {color: #6b82d9}span.s3 {color: #97a700}span.s4 {color: #b58a00}span.s5 {color: #ad5cff}span.s6 {color: #3c7400}span.s7 {color: #000000}span.s8 {color: #2eafa9}span.s9 {color: #d8a100}span.Apple-tab-span {white-space:pre}

/**
 * jQuery.timers - Timer abstractions for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/02/08
 *
 * @author Blair Mitchelmore
 * @version 1.1.2
 *
 **/

jQuery.fn.extend({
 everyTime: function(interval, label, fn, times, belay) {
  return this.each(function() {
   jQuery.timer.add(this, interval, label, fn, times, belay);
  });
 },
 oneTime: function(interval, label, fn) {
  return this.each(function() {
   jQuery.timer.add(this, interval, label, fn, 1);
  });
 },
 stopTime: function(label, fn) {
  return this.each(function() {
   jQuery.timer.remove(this, label, fn);
  });
 }
});

jQuery.event.special

jQuery.extend({
 timer: {
  global: [],
  guid: 1,
  dataKey: "jQuery.timer",
  regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
  powers: {
   // Yeah this is major overkill...
   'ms': 1,
   'cs': 10,
   'ds': 100,
   's': 1000,
   'das': 10000,
   'hs': 100000,
   'ks': 1000000
  },
  timeParse: function(value) {
   if (value == undefined || value == null)
    return null;
   var result = this.regex.exec(jQuery.trim(value.toString()));
   if (result[2]) {
    var num = parseFloat(result[1]);
    var mult = this.powers[result[2]] || 1;
    return num * mult;
   } else {
    return value;
   }
  },
  add: function(element, interval, label, fn, times, belay) {
   var counter = 0;

   if (jQuery.isFunction(label)) {
    if (!times) 
     times = fn;
    fn = label;
    label = interval;
   }

   interval = jQuery.timer.timeParse(interval);

   if (typeof interval != 'number' || isNaN(interval) || interval <= 0)
    return;

   if (times && times.constructor != Number) {
    belay = !!times;
    times = 0;
   }

   times = times || 0;
   belay = belay || false;

   var timers = jQuery.data(element, this.dataKey) || jQuery.data(element, this.dataKey, {});

   if (!timers[label])
    timers[label] = {};

   fn.timerID = fn.timerID || this.guid++;

   var handler = function() {
    if (belay && this.inProgress) 
     return;
    this.inProgress = true;
    if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
     jQuery.timer.remove(element, label, fn);
    this.inProgress = false;
   };

   handler.timerID = fn.timerID;

   if (!timers[label][fn.timerID])
    timers[label][fn.timerID] = window.setInterval(handler,interval);

   this.global.push( element );

  },
  remove: function(element, label, fn) {
   var timers = jQuery.data(element, this.dataKey), ret;

   if ( timers ) {

    if (!label) {
     for ( label in timers )
      this.remove(element, label, fn);
    } else if ( timers[label] ) {
     if ( fn ) {
      if ( fn.timerID ) {
       window.clearInterval(timers[label][fn.timerID]);
       delete timers[label][fn.timerID];
      }
     } else {
      for ( var fn in timers[label] ) {
       window.clearInterval(timers[label][fn]);
       delete timers[label][fn];
      }
     }

     for ( ret in timers[label] ) break;
     if ( !ret ) {
      ret = null;
      delete timers[label];
     }
    }

    for ( ret in timers ) break;
    if ( !ret ) 
     jQuery.removeData(element, this.dataKey);
   }
  }
 }
});

jQuery(window).bind("unload", function() {
 jQuery.each(jQuery.timer.global, function(index, item) {
  jQuery.timer.remove(item);
 });
});
