(function() {

	var ns = MKK.getNamespace('mkk.core');
	var EventDispatcher = MKK.getNamespace('mkk.event').EventDispatcher;

	if(!ns.Core) {

		var Core = function() {


		}

		ns.Core = Core;
		var p = Core.prototype = new EventDispatcher();

		p.setup = function() {
			console.log('Core Setup :: ');
		}
	}
})();