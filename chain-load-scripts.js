// custom event polyfill.
// taken from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;

})();

;(function() {
	'use strict';

	var chain, scripts, scriptsArray, done;

	document.addEventListener("scriptsLoaded", function() { console.log("Loaded!"); });
	
	chain = function(arr, eachfn, cb) {
		if(arr.length > 0) {

			eachfn(arr.shift(), function(err, res) { // pop

				if(err) {
					cb(err);
				}

				else {
					chain(arr, eachfn, cb);
				}

			});
		}

		else {
			cb();
		}
	};

	done = new CustomEvent("scriptsLoaded", { bubbles: false, cancelable: true });

	scripts = document.getElementsByTagName('script');

	scriptsArray = [];

	for(var i = 0; i < scripts.length; i++) {
		scriptsArray.push(scripts[i]);
	}

	chain(scriptsArray, function(item, cb) {
		var scriptElem, body, attrib = item.getAttribute('data-src');

		if(attrib) {
			body = document.getElementsByTagName('body')[0];

			scriptElem = document.createElement('script');

			scriptElem.onload = function() {

				// console.log('loaded ' + attrib);

				cb(null);
			};

			console.log('loading ' + attrib + '...');

			scriptElem.src = attrib;

			body.appendChild(scriptElem);
		}

		else {
			cb(null);
		}
	}, function(err) {
		if(err) {
			console.log("There was a problem in the script loader.");

			throw err;
		}
		
		// document.dispatchEvent(done);
		document.dispatchEvent(done);
	});
})()
