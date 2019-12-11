function TrackHandler (trackbank, cursorTrack)
{

	this.trackbank = trackbank;
	this.cursorTrack = cursorTrack;

	this.devicesAmount = [];

	for (i = 0; i < this.trackbank.getSizeOfBank (); i++)
	{
		var track = this.trackbank.getItemAt (i);

		// var p = track.pan ();
		// p.markInterested ();
		// p.setIndication (true);

		p = track.volume ();
		p.markInterested ();
		p.setIndication (true);
	}

	this.trackbank.followCursorTrack (this.cursorTrack);

	// only monitors solo and mute for cursortrack...
	this.cursorTrack.solo ().markInterested ();
	this.cursorTrack.mute ().markInterested ();

	this.cursorTrack.position().markInterested();

	deviceBank = cursorTrack.createDeviceBank (8);
	deviceBank.getDevice (0).name ().markInterested ();
	deviceBank.getDevice (1).name ().markInterested ();
	deviceBank.getDevice (2).name ().markInterested ();
	deviceBank.getDevice (3).name ().markInterested ();
	deviceBank.getDevice (4).name ().markInterested ();
	deviceBank.getDevice (5).name ().markInterested ();
	deviceBank.getDevice (6).name ().markInterested ();
	deviceBank.getDevice (7).name ().markInterested ();

}

TrackHandler.prototype.handleMidi = function (status, data1, data2)
{
	// println ("track handled, data1 is " + data1);

	this.currentData1 = data1;

	// if (isChannelController(status))
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
}

TrackHandler.prototype.updateLEDtracks = function ()
{
	println ("currentData1 is: "+ this.currentData1);
	// update tracks leds
	if (this.currentData1 > 7) {
		// for track 1 this returns 0
		this.trackNumber = this.cursorTrack.position().get();
		this.ledOn = this.trackNumber + 32;
		hardware.updateLEDtrack (this.ledOn)
	}
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