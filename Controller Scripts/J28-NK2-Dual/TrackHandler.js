function TrackHandler (trackbank, cursorTrack1, cursorTrack2)
{

	this.trackbank = trackbank;
	this.cursorTrack1 = cursorTrack1;
	this.cursorTrack2 = cursorTrack2;

	this.masterTrack = host.createMasterTrack (0);
	this.masterTrack.volume ().markInterested ();


	this.devicesAmount = [];

	for (i = 0; i < this.trackbank.getSizeOfBank (); i++)
	{
		var track = this.trackbank.getItemAt (i);
		p = track.volume ();
		p.markInterested ();
		p.setIndication (true);
	}

	this.trackbank.followCursorTrack (this.cursorTrack1);

	// only monitors solo and mute for cursortrack...
	this.cursorTrack1.solo ().markInterested ();
	this.cursorTrack1.mute ().markInterested ();

	this.cursorTrack1.position().markInterested();
	this.cursorTrack1.trackType().markInterested();

	this.cursorTrack1.isPinned ().markInterested ();
	this.cursorTrack2.isPinned ().markInterested ();

}

TrackHandler.prototype.handleMidi1 = function (status, data1, data2)
{
	println ("data1 is: "+ data1);
	this.currentData1 = data1;
	this.currentData2 = data2;
	this.midiChan = MIDIChannel(status);
	println ("midichannel is: "+ this.midiChan);

	var localCursorTrack1 = this.cursorTrack1.isPinned ().get ();
	println ("cursor track1 is pinned: "+ localCursorTrack1);

	var localCursorTrack2 = this.cursorTrack2.isPinned ().get ();
	println ("cursor track2 is pinned: "+ localCursorTrack2);

	if (isChannelController(status))
	{
		// if one of the buttons below is released we return true
		var ourButtons = [
			NK2_BUTTON_S1,
			NK2_BUTTON_S2,
			NK2_BUTTON_S3,
			NK2_BUTTON_S4,
			NK2_BUTTON_S5,
			NK2_BUTTON_S6,
			NK2_BUTTON_S7,
			NK2_BUTTON_S8
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1)
		{
			case NK2_BUTTON_S1:
				this.trackbank.getItemAt (0).select ();
				this.trackPosition = 0;
				return true;

			case NK2_BUTTON_S2:
				this.trackbank.getItemAt (1).select ();
				this.trackPosition = 1;
				return true;

			case NK2_BUTTON_S3:
				this.trackbank.getItemAt (2).select ();
				this.trackPosition = 2;
				return true;

			case NK2_BUTTON_S4:
				this.trackbank.getItemAt (3).select ();
				this.trackPosition = 3;
				return true;

			case NK2_BUTTON_S5:
				this.trackbank.getItemAt (4).select ();
				this.trackPosition = 4;
				return true;

			case NK2_BUTTON_S6:
				this.trackbank.getItemAt (5).select ();
				this.trackPosition = 5;
				return true;

			case NK2_BUTTON_S7:
				this.trackbank.getItemAt (6).select ();
				this.trackPosition = 6;
				return true;

			case NK2_BUTTON_S8:
				this.trackbank.getItemAt (7).select ();
				this.trackPosition = 7;
				return true;

			case NK2_SLIDER1:
				this.trackbank.getItemAt (0).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER2:
				this.trackbank.getItemAt (1).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER3:
				this.trackbank.getItemAt (2).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER4:
				this.trackbank.getItemAt (3).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER5:
				this.trackbank.getItemAt (4).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER6:
				this.trackbank.getItemAt (5).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER7:
				this.trackbank.getItemAt (6).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER8:
				// if set is pressed the 8th fader controls the master track volume
				isSetPressed ? this.masterTrack.volume ().set (data2, 128) : this.trackbank.getItemAt (7).volume ().set (data2, 128);
				return true;

			default:
				return false;

		}

	}
	return false;
}

TrackHandler.prototype.handleMidi2 = function (status, data1, data2)
{
	println ("data1 is: "+ data1);
	this.currentData1 = data1;
	this.currentData2 = data2;
	this.midiChan = MIDIChannel(status);
	println ("midichannel is: "+ this.midiChan);

	var localCursorTrack1 = this.cursorTrack1.isPinned ().get ();
	println ("cursor track1 is pinned: "+ localCursorTrack1);

	var localCursorTrack2 = this.cursorTrack2.isPinned ().get ();
	println ("cursor track2 is pinned: "+ localCursorTrack2);

	if (isChannelController(status))
	{
		// if one of the buttons below is released we return true
		var ourButtons = [
			NK2_BUTTON_S1,
			NK2_BUTTON_S2,
			NK2_BUTTON_S3,
			NK2_BUTTON_S4,
			NK2_BUTTON_S5,
			NK2_BUTTON_S6,
			NK2_BUTTON_S7,
			NK2_BUTTON_S8
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1)
		{
			case NK2_BUTTON_PREV_MARKER:
				this.cursorTrack2.selectPrevious ();
				return true;

			case NK2_BUTTON_NEXT_MARKER:
				this.cursorTrack2.selectNext ();
				return true;

			case NK2_BUTTON_S1:
				this.trackbank.getItemAt (8).select ();
				this.trackPosition = 8;
				return true;

			case NK2_BUTTON_S2:
				this.trackbank.getItemAt (9).select ();
				this.trackPosition = 9;
				return true;

			case NK2_BUTTON_S3:
				this.trackbank.getItemAt (10).select ();
				this.trackPosition = 10;
				return true;

			case NK2_BUTTON_S4:
				this.trackbank.getItemAt (11).select ();
				this.trackPosition = 11;
				return true;

			case NK2_BUTTON_S5:
				this.trackbank.getItemAt (12).select ();
				this.trackPosition = 12;
				return true;

			case NK2_BUTTON_S6:
				this.trackbank.getItemAt (13).select ();
				this.trackPosition = 13;
				return true;

			case NK2_BUTTON_S7:
				this.trackbank.getItemAt (14).select ();
				this.trackPosition = 14;
				return true;

			case NK2_BUTTON_S8:
				this.trackbank.getItemAt (15).select ();
				this.trackPosition = 15;
				return true;

			case NK2_SLIDER1:
				this.trackbank.getItemAt (8).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER2:
				this.trackbank.getItemAt (9).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER3:
				this.trackbank.getItemAt (10).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER4:
				this.trackbank.getItemAt (11).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER5:
				this.trackbank.getItemAt (12).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER6:
				this.trackbank.getItemAt (13).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER7:
				this.trackbank.getItemAt (14).volume ().set (data2, 128);
				return true;

			case NK2_SLIDER8:
				// if set is pressed the 8th fader controls the master track volume
				isSetPressed ? this.masterTrack.volume ().set (data2, 128) : this.trackbank.getItemAt (15).volume ().set (data2, 128);
				return true;

			default:
				return false;

		}
	}
	return false;
}

TrackHandler.prototype.updateLEDtracks = function ()
{
	// update tracks leds
	// println ("\nFlush called. LED");
	// println ("update currentData1 is: "+ this.currentData1);
	// println ("update currentData2 is: "+ this.currentData2);

	this.trackNumber = this.cursorTrack1.position().get();
	this.trackType = this.cursorTrack1.trackType().get();
	this.ledOn1 = this.trackPosition + 32;		
	this.ledOn2 = this.trackPosition + 24;		

	println ("update trackNumber is: "+ this.trackNumber);
	println ("update trackType is: "+ this.trackType);
	println ("update trackPosition is: "+ this.trackPosition);

	if (this.trackPosition < 8) {
		hardware1.updateLEDtrack (this.ledOn1);
	} else {
		hardware2.updateLEDtrack (this.ledOn2);		
	}

}