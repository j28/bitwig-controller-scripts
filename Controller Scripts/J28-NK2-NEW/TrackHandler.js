function TrackHandler (trackbank, cursorTrack)
{
	this.trackbank = trackbank;
	this.cursorTrack = cursorTrack;

	for (i = 0; i < this.trackbank.getSizeOfBank (); i++)
	{
		var track = this.trackbank.getItemAt (i);

		var p = track.pan ();
		p.markInterested ();
		p.setIndication (true);

		p = track.volume ();
		p.markInterested ();
		p.setIndication (true);
	}

	this.trackbank.followCursorTrack (this.cursorTrack);

	// only monitors solo and mute for cursortrack...
	this.cursorTrack.solo ().markInterested ();
	this.cursorTrack.mute ().markInterested ();


	this.cursorTrack.position().markInterested();
}

TrackHandler.prototype.handleMidi = function (status, data1, data2)
{
	println ("data1 is " + data1);
	this.currentData1 = data1;

	// if (isNoteOn(status))
	// {
		switch (data1)
		{
			case NK2_BUTTON_S1:
				this.trackbank.getItemAt (0).select ();
				return true;

			case NK2_BUTTON_S2:
				this.trackbank.getItemAt (1).select ();
				return true;

			case NK2_BUTTON_S3:
				this.trackbank.getItemAt (2).select ();
				return true;

			case NK2_BUTTON_S4:
				this.trackbank.getItemAt (3).select ();
				return true;

			case NK2_BUTTON_S5:
				this.trackbank.getItemAt (4).select ();
				return true;

			case NK2_BUTTON_S6:
				this.trackbank.getItemAt (5).select ();
				return true;

			case NK2_BUTTON_S7:
				this.trackbank.getItemAt (6).select ();
				return true;

			case NK2_BUTTON_S8:
				this.trackbank.getItemAt (7).select ();
				return true;

			// case MOXF_BUTTON_SF5:
			// 	this.trackbank.scrollPageBackwards ();
			// 	return true;

			// case MOXF_BUTTON_SF6:
			// 	this.trackbank.scrollPageForwards ();
			// 	return true;

			// case MOXF_BUTTON_SOLO:
			// 	this.cursorTrack.solo ().toggle ();
			// 	return true;

			// case MOXF_BUTTON_MUTE:
			// 	this.cursorTrack.mute ().toggle ();
			// 	return true;
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
				this.trackbank.getItemAt (7).volume ().set (data2, 128);
				return true;

			default:
				return false;
		}
	// }

	// if (isChannelController(status))
	// {

		switch (data1)
		{
			// Absolute values
			case NK2_SLIDER1:
				this.trackbank.getItemAt (0).volume ().inc (data2, 128);
				return true;

			// case MOXF_KNOB_2:
			// 	this.trackbank.getItemAt (1).pan ().set (data2, 128);
			// 	return true;

			// case MOXF_KNOB_3:
			// 	this.trackbank.getItemAt (2).pan ().set (data2, 128);
			// 	return true;

			// case MOXF_KNOB_4:
			// 	this.trackbank.getItemAt (3).pan ().set (data2, 128);
			// 	return true;

			// // Relative values
			// case MOXF_KNOB_5:
			// 	var value = data2 > 64 ? 64 - data2 : data2;
			// 	this.trackbank.getItemAt (0).volume ().inc (value, 128);
			// 	return true;

			// case MOXF_KNOB_6:
			// 	var value = data2 > 64 ? 64 - data2 : data2;
			// 	this.trackbank.getItemAt (1).volume ().inc (value, 128);
			// 	return true;

			// case MOXF_KNOB_7:
			// 	var value = data2 > 64 ? 64 - data2 : data2;
			// 	this.trackbank.getItemAt (2).volume ().inc (value, 128);
			// 	return true;

			// case MOXF_KNOB_8:
			// 	var value = data2 > 64 ? 64 - data2 : data2;
			// 	this.trackbank.getItemAt (3).volume ().inc (value, 128);
			// 	return true;

			default:
				return false;
		}
	// }

	// return false;    
}

TrackHandler.prototype.updateLEDs = function ()
{


	println ("currentData1 is: "+ this.currentData1);

	// println ("cursor track is: " + this.cursorTrack.position().get());
	// println (this.trackbank.getItemAt (0).position().get());
	// println (this.trackbank.getChannel (0));


	if (this.currentData1 > 7) {
		// for track 1 this returns 0
		this.trackNumber = this.cursorTrack.position().get();
		this.ledOn = this.trackNumber + 32;

		hardware.updateLEDtrack (this.ledOn)
	}
	// hardware.updateLED (NK2_BUTTON_S1, this.shouldBeOff);

	// hardware.updateLED (NK2_BUTTON_REC, this.transport.isArrangerRecordEnabled ().get ());
}