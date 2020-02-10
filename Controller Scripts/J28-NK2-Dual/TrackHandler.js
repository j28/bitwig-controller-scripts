function TrackHandler (trackbank, cursorTrack)
{

	this.trackbank = trackbank;
	this.cursorTrack = cursorTrack;

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

	this.trackbank.followCursorTrack (this.cursorTrack);

	// only monitors solo and mute for cursortrack...
	this.cursorTrack.solo ().markInterested ();
	this.cursorTrack.mute ().markInterested ();

	this.cursorTrack.position().markInterested();

	deviceBank = cursorTrack.createDeviceBank (16);
	deviceBank.getDevice (0).name ().markInterested ();
	deviceBank.getDevice (1).name ().markInterested ();
	deviceBank.getDevice (2).name ().markInterested ();
	deviceBank.getDevice (3).name ().markInterested ();
	deviceBank.getDevice (4).name ().markInterested ();
	deviceBank.getDevice (5).name ().markInterested ();
	deviceBank.getDevice (6).name ().markInterested ();
	deviceBank.getDevice (7).name ().markInterested ();
	deviceBank.getDevice (8).name ().markInterested ();
	deviceBank.getDevice (9).name ().markInterested ();
	deviceBank.getDevice (10).name ().markInterested ();
	deviceBank.getDevice (11).name ().markInterested ();
	deviceBank.getDevice (12).name ().markInterested ();
	deviceBank.getDevice (13).name ().markInterested ();
	deviceBank.getDevice (14).name ().markInterested ();
	deviceBank.getDevice (15).name ().markInterested ();

}

TrackHandler.prototype.handleMidi1 = function (status, data1, data2)
{
	println ("data1 is: "+ data1);
	this.currentData1 = data1;
	this.currentData2 = data2;
	this.midiChan = MIDIChannel(status);
	println ("midichannel is: "+ this.midiChan);

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
}


TrackHandler.prototype.handleMidi2 = function (status, data1, data2)
{
	println ("data1 is: "+ data1);
	this.currentData1 = data1;
	this.currentData2 = data2;
	this.midiChan = MIDIChannel(status);
	println ("midichannel is: "+ this.midiChan);

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
				this.trackbank.getItemAt (8).select ();
				return true;

			case NK2_BUTTON_S2:
				this.trackbank.getItemAt (9).select ();
				return true;

			case NK2_BUTTON_S3:
				this.trackbank.getItemAt (10).select ();
				return true;

			case NK2_BUTTON_S4:
				this.trackbank.getItemAt (11).select ();
				return true;

			case NK2_BUTTON_S5:
				this.trackbank.getItemAt (12).select ();
				return true;

			case NK2_BUTTON_S6:
				this.trackbank.getItemAt (13).select ();
				return true;

			case NK2_BUTTON_S7:
				this.trackbank.getItemAt (14).select ();
				return true;

			case NK2_BUTTON_S8:
				this.trackbank.getItemAt (15).select ();
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
}


TrackHandler.prototype.updateLEDtracks = function ()
{
	// println ("currentData1 is: "+ this.currentData1);
	// update tracks leds
	// if (this.currentData1 > 7) {
		// for track 1 this returns 0
	println ("\nFlush called. LED");
	println ("update currentData1 is: "+ this.currentData1);
	println ("update currentData2 is: "+ this.currentData2);

	this.trackNumber = this.cursorTrack.position().get();
	this.ledOn1 = this.trackNumber + 32;		
	this.ledOn2 = this.trackNumber + 24;		

	println ("update led is: "+ this.ledOn1);
	println ("update trackNumber is: "+ this.trackNumber);

	if (this.trackNumber < 8) {
		hardware1.updateLEDtrack (this.ledOn1);
	} else {
		hardware2.updateLEDtrack (this.ledOn2);		
	}



	// if(this.currentData2 == 0) {



	// 	println ("update midichannel is: "+ this.midiChan);


	// 		println ("update led is: "+ this.ledOn);
	// 		hardware1.portOut.sendMidi (191, 39, 127);

	// 		// hardware1.updateLEDtrack (this.ledOn)

	// }

	// }
}


TrackHandler.prototype.updateLEDdevices = function ()
{
	// updated devices leds
	this.devicesAmount = [];
	for (var da = 0; da < 7; da++) {
		// println ("device bank device name is: z" + deviceBank.getDevice (da).name (). get() + "z");		
		var deviceName = deviceBank.getDevice (da).name (). get();
		if (deviceName)
		{
			this.devicesAmount.push (deviceBank.getDevice (da).name (). get());			
		}
	}
	hardware.updateLEDdevices (this.devicesAmount.length);
	println ("devices amount length is: " + this.devicesAmount.length);

	// var cdIsOn = remoteControlHandler.cursorDevice.isEnabled ().get ();
	// cdIsOn ? 0 : 127;
	// remoteControlHandler.cursorDevice.isEnabled ().get ()
	println ("cursor device is: " + remoteControlHandler.cursorDevice.isEnabled ().get ());
	hardware.updateLED(NK2_BUTTON_REW, remoteControlHandler.cursorDevice.isEnabled ().get ());
	hardware.updateLED(NK2_BUTTON_FF, remoteControlHandler.cursorDevice.isWindowOpen ().get ());
}