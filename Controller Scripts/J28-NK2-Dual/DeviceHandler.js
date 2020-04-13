function DeviceHandler (cursorTrack, cursorTrack2, cursorDevice, cursorDevice2)
{
	// println ("cursor device is yooo ");
	if(cursorTrack)
		this.cursorTrack = cursorTrack;
	if(cursorTrack2)
		this.cursorTrack2 = cursorTrack2;

	this.cursorDevice = cursorDevice;
	this.cursorDevice2 = cursorDevice2;

	this.cursorDevice.position ().markInterested ();

	this.cursorDevice.isExpanded ().markInterested ();
	this.cursorDevice.isEnabled ().markInterested ();
	this.cursorDevice.isWindowOpen ().markInterested ();


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

DeviceHandler.prototype.handleMidi1 = function (status, data1, data2)
{

	var midiChan = MIDIChannel(status);
	println ("midichannel is: "+ midiChan);

	if (isChannelController(status))
	{
		// if one of the buttons below is released we return true
		var ourButtons = [
			NK2_BUTTON_M1,
			NK2_BUTTON_M2,
			NK2_BUTTON_M3,
			NK2_BUTTON_M4,
			NK2_BUTTON_M5,
			NK2_BUTTON_M6,
			NK2_BUTTON_M7,
			NK2_BUTTON_M8,
			NK2_BUTTON_REW,
			NK2_BUTTON_FF,
			NK2_BUTTON_PREV_TRACK,
			NK2_BUTTON_NEXT_TRACK,
			NK2_BUTTON_CYCLE
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1)
		{

			case NK2_BUTTON_M1:
				this.cursorDevice.selectDevice(deviceBank.getDevice (0));
				return true;

			case NK2_BUTTON_M2:
				this.cursorDevice.selectDevice(deviceBank.getDevice (1));
				return true;

			case NK2_BUTTON_M3:
				this.cursorDevice.selectDevice(deviceBank.getDevice (2));
				return true;

			case NK2_BUTTON_M4:
				this.cursorDevice.selectDevice(deviceBank.getDevice (3));
				return true;

			case NK2_BUTTON_M5:
				this.cursorDevice.selectDevice(deviceBank.getDevice (4));
				return true;

			case NK2_BUTTON_M6:
				this.cursorDevice.selectDevice(deviceBank.getDevice (5));
				return true;

			case NK2_BUTTON_M7:
				this.cursorDevice.selectDevice(deviceBank.getDevice (6));
				return true;

			case NK2_BUTTON_M8:
				this.cursorDevice.selectDevice(deviceBank.getDevice (7));
				return true;

			case NK2_BUTTON_REW:
				this.cursorDevice.isEnabled ().toggle ();
				return true;

			case NK2_BUTTON_FF:
				this.cursorDevice.isWindowOpen ().toggle ();
				return true;

			case NK2_BUTTON_PREV_TRACK:
				isSetPressed ? this.cursorDevice.selectPrevious () : this.cursorTrack.selectPrevious ();
				return true;

			case NK2_BUTTON_NEXT_TRACK:
				isSetPressed ? this.cursorDevice.selectNext () : this.cursorTrack.selectNext ();
				return true;

			case NK2_BUTTON_CYCLE:
				isSetPressed ? this.cursorDevice.isPinned ().toggle () : this.cursorTrack.isPinned ().toggle ();
				return true;

			default:
				return false;
		}
	}
	return false;    
}


DeviceHandler.prototype.handleMidi2 = function (status, data1, data2)
{

	var midiChan = MIDIChannel(status);
	println ("midichannel is: "+ midiChan);

	if (isChannelController(status))
	{
		// if one of the buttons below is released we return true
		var ourButtons = [
			NK2_BUTTON_REW,
			NK2_BUTTON_PREV_TRACK,
			NK2_BUTTON_NEXT_TRACK,
			NK2_BUTTON_CYCLE
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1)
		{

			case NK2_BUTTON_REW:
				this.cursorDevice.isExpanded ().toggle ();
				return true;

			case NK2_BUTTON_PREV_TRACK:
				isSet2Pressed ? this.cursorDevice2.selectPrevious () : this.cursorTrack2.selectPrevious ();
				return true;

			case NK2_BUTTON_NEXT_TRACK:
				isSet2Pressed ? this.cursorDevice2.selectNext () : this.cursorTrack2.selectNext ();
				return true;

			case NK2_BUTTON_CYCLE:
				isSet2Pressed ? this.cursorDevice2.isPinned ().toggle () : this.cursorTrack2.isPinned ().toggle ();
				return true;

			default:
				return false;
		}

	}
	return false;    
}

DeviceHandler.prototype.updateLEDdevices = function ()
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
	hardware1.updateLEDdevices (this.devicesAmount.length);
	println ("devices amount length is: " + this.devicesAmount.length);

	// var cdIsOn = remoteControlHandler.cursorDevice.isEnabled ().get ();
	// cdIsOn ? 0 : 127;
	// remoteControlHandler.cursorDevice.isEnabled ().get ()
	println ("cursor device is: " + this.cursorDevice.isEnabled ().get ());
	hardware1.updateLED(NK2_BUTTON_REW, this.cursorDevice.isEnabled ().get ());
	hardware1.updateLED(NK2_BUTTON_FF, this.cursorDevice.isWindowOpen ().get ());

	println ("cursor track is pinned: " + this.cursorTrack.isPinned ().get ());


	hardware1.updateLED (NK2_BUTTON_CYCLE, this.cursorTrack.isPinned ().get ());

	hardware2.updateLED (NK2_BUTTON_CYCLE, this.cursorTrack2.isPinned ().get ());

}