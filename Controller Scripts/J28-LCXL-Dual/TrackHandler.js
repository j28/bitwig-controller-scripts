function TrackHandler (trackbank, cursorTrack1, cursorTrack2, cursorTrack17){

	this.trackbank = trackbank;
	this.cursorTrack1 = cursorTrack1;
	this.cursorTrack2 = cursorTrack2;
	this.cursorTrack17 = cursorTrack17;

	this.devicesAmount = [];

	for (i = 0; i < this.trackbank.getSizeOfBank (); i++)
	{
		var track = this.trackbank.getItemAt (i);

		g = track.isGroup ();
		g.markInterested ();

		v = track.volume ();
		v.markInterested ();
		v.setIndication (true);

		n = track.name ();
		n.markInterested ();

	}

	this.trackbank.followCursorTrack (this.cursorTrack1);
	this.cursorTrack1.trackType().markInterested();

	this.cursorTrack17.name().markInterested();
	this.cursorTrack17.name().addValueObserver(observerName);

	this.cursorTrack1.position().markInterested();
	this.cursorTrack1.position().addValueObserver(test);

}

TrackHandler.prototype.handleMidi1 = function (status, data1, data2){

	println ("status is: "+ status);
	println ("data1 is: "+ data1);
	this.currentData1 = data1;
	this.currentData2 = data2;
	this.midiChan = MIDIChannel(status);
	println ("midichannel is: "+ this.midiChan);


		// if one of the buttons below is released we return true
		var ourButtons = [
			LCXL_BUTTON_FOCUS1,
			LCXL_BUTTON_FOCUS2,
			LCXL_BUTTON_FOCUS3,
			LCXL_BUTTON_FOCUS4,
			LCXL_BUTTON_FOCUS5,
			LCXL_BUTTON_FOCUS6,
			LCXL_BUTTON_FOCUS7,
			LCXL_BUTTON_FOCUS8
		];
		// if(ourButtons.indexOf(data1) > -1) {
		// 	if (data2 == 0)
		// 		return true;
		// }

		switch (data1){

			case LCXL_FADER1:
				this.trackbank.getItemAt (0).volume ().set (data2, 128);
				return true;

			case LCXL_FADER2:
				this.trackbank.getItemAt (1).volume ().set (data2, 128);
				return true;

			case LCXL_FADER3:
				this.trackbank.getItemAt (2).volume ().set (data2, 128);
				return true;

			case LCXL_FADER4:
				this.trackbank.getItemAt (3).volume ().set (data2, 128);
				return true;

			case LCXL_FADER5:
				this.trackbank.getItemAt (4).volume ().set (data2, 128);
				return true;

			case LCXL_FADER6:
				this.trackbank.getItemAt (5).volume ().set (data2, 128);
				return true;

			case LCXL_FADER7:
				this.trackbank.getItemAt (6).volume ().set (data2, 128);
				return true;

			case LCXL_FADER8:
				this.trackbank.getItemAt (7).volume ().set (data2, 128);
				return true;

			case LCXL_BUTTON_FOCUS1:
				this.trackbank.getItemAt (0).select ();
				this.trackPosition = 0;
				this.updateLEDtracks ();
				return true;

			case LCXL_BUTTON_FOCUS2:
				this.trackbank.getItemAt (1).select ();
				this.trackPosition = 1;
				this.updateLEDtracks ();
				return true;

			case LCXL_BUTTON_FOCUS3:
				this.trackbank.getItemAt (2).select ();
				this.trackPosition = 2;
				this.updateLEDtracks ();
				return true;

			case LCXL_BUTTON_FOCUS4:
				this.trackbank.getItemAt (3).select ();
				this.trackPosition = 3;
				this.updateLEDtracks ();
				return true;

			case LCXL_BUTTON_FOCUS5:
				this.trackbank.getItemAt (4).select ();
				this.trackPosition = 4;
				this.updateLEDtracks ();
				return true;

			case LCXL_BUTTON_FOCUS6:
				this.trackbank.getItemAt (5).select ();
				this.trackPosition = 5;
				this.updateLEDtracks ();
				return true;

			case LCXL_BUTTON_FOCUS7:
				this.trackbank.getItemAt (6).select ();
				this.trackPosition = 6;
				this.updateLEDtracks ();
				return true;

			case LCXL_BUTTON_FOCUS8:
				this.trackbank.getItemAt (7).select ();
				this.trackPosition = 7;
				this.updateLEDtracks ();
				return true;

			default:
				return false;

		}

	return false;
}

TrackHandler.prototype.handleMidi2 = function (status, data1, data2){

	println ("data1 is: "+ data1);
	this.currentData1 = data1;
	this.currentData2 = data2;
	this.midiChan = MIDIChannel(status);
	println ("midichannel is: "+ this.midiChan);

	// if one of the buttons below is released we return true
	var ourButtons = [
		LCXL_BUTTON_FOCUS1,
		LCXL_BUTTON_FOCUS2,
		LCXL_BUTTON_FOCUS3,
		LCXL_BUTTON_FOCUS4,
		LCXL_BUTTON_FOCUS5,
		LCXL_BUTTON_FOCUS6,
		LCXL_BUTTON_FOCUS7,
		LCXL_BUTTON_FOCUS8
	];
	// if(ourButtons.indexOf(data1) > -1) {
	// 	if (data2 == 0)
	// 		return true;
	// }

	switch (data1){

		case LCXL_FADER1:
			this.trackbank.getItemAt (8).volume ().set (data2, 128);
			return true;

		case LCXL_FADER2:
			this.trackbank.getItemAt (9).volume ().set (data2, 128);
			return true;

		case LCXL_FADER3:
			this.trackbank.getItemAt (10).volume ().set (data2, 128);
			return true;

		case LCXL_FADER4:
			this.trackbank.getItemAt (11).volume ().set (data2, 128);
			return true;

		case LCXL_FADER5:
			this.trackbank.getItemAt (12).volume ().set (data2, 128);
			return true;

		case LCXL_FADER6:
			this.trackbank.getItemAt (13).volume ().set (data2, 128);
			return true;

		case LCXL_FADER7:
			this.trackbank.getItemAt (14).volume ().set (data2, 128);
			return true;

		case LCXL_FADER8:
			this.trackbank.getItemAt (15).volume ().set (data2, 128);
			return true;

		case LCXL_BUTTON_FOCUS1:
			this.trackbank.getItemAt (8).select ();
			this.trackPosition = 8;
			this.updateLEDtracks ();
			return true;

		case LCXL_BUTTON_FOCUS2:
			this.trackbank.getItemAt (9).select ();
			this.trackPosition = 9;
			this.updateLEDtracks ();
			return true;

		case LCXL_BUTTON_FOCUS3:
			this.trackbank.getItemAt (10).select ();
			this.trackPosition = 10;
			this.updateLEDtracks ();
			return true;

		case LCXL_BUTTON_FOCUS4:
			this.trackbank.getItemAt (11).select ();
			this.trackPosition = 11;
			this.updateLEDtracks ();
			return true;

		case LCXL_BUTTON_FOCUS5:
			this.trackbank.getItemAt (12).select ();
			this.trackPosition = 12;
			this.updateLEDtracks ();
			return true;

		case LCXL_BUTTON_FOCUS6:
			this.trackbank.getItemAt (13).select ();
			this.trackPosition = 13;
			this.updateLEDtracks ();
			return true;

		case LCXL_BUTTON_FOCUS7:
			this.trackbank.getItemAt (14).select ();
			this.trackPosition = 14;
			this.updateLEDtracks ();
			return true;

		case LCXL_BUTTON_FOCUS8:
			this.trackbank.getItemAt (15).select ();
			this.trackPosition = 15;
			this.updateLEDtracks ();
			return true;

		default:
			return false;

	}

	return false;
}

TrackHandler.prototype.updateTrackPosition = function (){

	var cursorTrackName = trackHandler.cursorTrack17.name().get();
	// println ("\ncursorTrackName: " + cursorTrackName);

	for (i = 0; i < this.trackbank.getSizeOfBank(); i++) {

		var track = this.trackbank.getItemAt(i);
		var trackName = track.name().get();
		// println ("\ntrackName: " + trackName);

		if(cursorTrackName == trackName){
			this.trackPosition = i;
		} 

	}
	this.updateLEDtracks ();

}

TrackHandler.prototype.updateLEDtracks = function (){

	// update tracks leds
	// println ("\nFlush called. LED");
	// println ("update currentData1 is: "+ this.currentData1);
	// println ("update currentData2 is: "+ this.currentData2);

	this.trackNumber = this.cursorTrack1.position().get();
	this.trackType = this.cursorTrack1.trackType().get();

	if (this.trackPosition < 8) {	
		if (this.trackPosition < 4) {	
			this.ledOn1 = this.trackPosition + 41;

		} else {
			this.ledOn1 = this.trackPosition + 53;

		}
	} else {

		println ("CONTROLLER 2: "+ this.trackPosition);

		if (this.trackPosition < 12) {	
			this.ledOn2 = this.trackPosition + 33;

		} else {
			this.ledOn2 = this.trackPosition + 45;
		}

	}

	println ("trackType is: "+ this.trackType);
	println ("trackPosition coming from api: "+ this.trackNumber);
	println ("trackPosition calculated manually based on index: "+ this.trackPosition);

	if (this.trackPosition < 8) {
		hardware1.updateLEDtracks (this.ledOn1, 1);
	} else {
		hardware2.updateLEDtracks (this.ledOn2, 2);		
	}

}
