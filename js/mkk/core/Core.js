(function() {

	var ns = MKK.getNamespace('mkk.core');

	if(!ns.Core) {

		var Core = function() {


		}

		ns.Core = Core;
		var p = Core.prototype;

		p.setup = function() {
			console.log('Core Setup :: ');
		}
	}
})();