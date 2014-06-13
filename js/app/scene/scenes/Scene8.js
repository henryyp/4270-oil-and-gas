(function() {

	// ------------------------------------
	// LIBRARIES
	// ------------------------------------
	var ns = MKK.getNamespace('app.scene');
	var ListenerFunctions = MKK.getNamespace('mkk.event').ListenerFunctions;
	var data = MKK.getNamespace('data');
	var copydata = data.copydata;
	var scenedata = data.scenedata;
	var styledata = data.styledata;
	var AbScene = ns.AbScene;

	var StaticLevel = ns.level.StaticLevel;
	var Scene2Level = ns.level.Scene2Level;
	var ElSprite = ns.element.ElSprite;
	var ElSpriteContainer = ns.element.ElSpriteContainer;
	var ElText = ns.element.ElText;
	var ElRect = ns.element.ElRect;
	var ElSeaBG = ns.element.ElSeaBG;
	var ElSeaWave = ns.element.ElSeaWave;
	var ElSeaFloor = ns.element.ElSeaFloor;
	var ElOilCave = ns.element.ElOilCave;
	var ElShipInner = ns.element.ElShipInner;
	var ElRadarBoat = ns.element.ElRadarBoat;
	var ElRadarBoatSide = ns.element.ElRadarBoatSide;
	var ElDescription= ns.element.ElDescription;

	var FrameTween = MKK.getNamespace('app.animation').FrameTween;
	var TweenEach = MKK.getNamespace('app.animation').TweenEach;


	if(!ns.Scene8) {

		// ------------------------------------
		// CONSTRUCTOR
		// ------------------------------------
		var Scene8 = function Scene8() {

			this.tweenTime = scenedata.scene8.tweenTime;
		}


		ns.Scene8 = Scene8;
		var p = Scene8.prototype = new AbScene();

		// ------------------------------------
		// FUNCTIONS
		// ------------------------------------
		//open when init is completed
		p.open = function() {

			var tT = this.tweenTime;
			var copies = copydata.scene8;

			//back
			this.level1 = new StaticLevel('level1');
			this.level1.setup(0, 0, 0);
			this.addLevel(this.level1);	

			var strapStyle = styledata.straplinegrey;
			var smallStyle = styledata.endlineBody;
			var replayStyle = styledata.replayGrey;
			//strapline1
			this.txt2 = new ElText(copies.line1, tT.txt2X0, tT.txt2Y0, 0, 0.5, 0.5);
			this.txt2.setStyle(strapStyle);
			this.txt2.opacity(0);

			this.txt3 = new ElText(copies.line2, tT.txt3X0, tT.txt3Y0, 0, 0.5, 0.5);
			this.txt3.setStyle(smallStyle);
			this.txt3.opacity(0);

			this.txt4 = new ElText(copies.line3, tT.txt4X0, tT.txt4Y0, 0, 0.5, 0.5);
			this.txt4.setStyle(replayStyle);
			this.txt4.opacity(0);
			this.txt4.container.interactive = true;
			var that = this;
			this.txt4.container.tap = function(e) {console.log('aa tester'); that.dispatchCustomEvent('replay') };

			this.level1.addElement(this.txt2.container);
			this.level1.addElement(this.txt3.container);
			this.level1.addElement(this.txt4.container);


			// ------------------------------------------------
			// Tween
			// ------------------------------------------------
			//move into scene, left
			var tween0Bound = ListenerFunctions.createListenerFunction(this, this.tweenFunc0);
			this.tween0 = new TweenEach({y:tT.txt2Y0})
							.to({y: tT.txt2Y1}, tT._speed)
							.easing(TWEEN.Easing.Cubic.InOut)
							.onUpdate(tween0Bound)
							.delay(this.startFrame ).start();

			var tween1Bound = ListenerFunctions.createListenerFunction(this, this.tweenFunc1);
			this.tween1 = new TweenEach({y:tT.txt3Y0})
							.to({y: tT.txt3Y1}, tT._speed)
							.easing(TWEEN.Easing.Cubic.InOut)
							.onUpdate(tween1Bound)
							.delay(this.startFrame + tT.stackDelay).start();

			var tween2Bound = ListenerFunctions.createListenerFunction(this, this.tweenFunc2);
			this.tween2 = new TweenEach({y:tT.txt4Y0})
							.to({y: tT.txt4Y1}, tT._speed)
							.easing(TWEEN.Easing.Cubic.InOut)
							.onUpdate(tween2Bound)
							.delay(this.startFrame + tT.stackDelay*2).start();

		}

		// ------------------------------------------------
		// TWEEN FUNCTIONS
		// ------------------------------------------------
		p.tweenFunc0 = function(e) {
			var cObj = this.tween0.tweenVars();
			this.txt2.opacity(e);
			this.txt2.yPos(cObj.y);
		}

		p.tweenFunc1 = function(e) {
			var cObj = this.tween1.tweenVars();
			this.txt3.opacity(e);
			this.txt3.yPos(cObj.y);
		}

		p.tweenFunc2 = function(e) {
			var cObj = this.tween2.tweenVars();
			this.txt4.opacity(e);
			this.txt4.yPos(cObj.y);
		}
			
		//close when destroyed
		p.close = function() {

		}

		p.update = function(frame) {
			this._update(frame);
			var cFrame = this.localCurFrame(frame);

			this.level1.update(cFrame);

		}

	}

})();