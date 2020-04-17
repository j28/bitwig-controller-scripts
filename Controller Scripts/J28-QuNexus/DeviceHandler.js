function DeviceHandler (cursorTrack1, cursorTrack2, cursorTrack3, cursorDevice1, cursorDevice2, cursorDevice3)
{
	// println ("cursor device is yooo ");
	if(cursorTrack1)
		this.cursorTrack1 = cursorTrack1;

	this.cursorDevice1 = cursorDevice1;

	if(cursorTrack2)
		this.cursorTrack2 = cursorTrack2;

	this.cursorDevice2 = cursorDevice2;

	if(cursorTrack3)
		this.cursorTrack3 = cursorTrack3;

	this.cursorDevice3 = cursorDevice3;

	this.cursorDevice1.isPinned ().markInterested ();
	this.cursorDevice2.isPinned ().markInterested ();
	this.cursorDevice3.isPinned ().markInterested ();

}


DeviceHandler.prototype.toggleLED = function (device, button)
{

	// println ("current device pinnnnnnnnnnn: " + currentDevice.isPinned ().get());
	var currentDevice = device;
	var currentButton = button;

	if (currentDevice.isPinned ().get()){
		host.getMidiOutPort (0).sendMidi (152, currentButton, 0);
	} else {
		host.getMidiOutPort (0).sendMidi (152, currentButton, 127);

	}

}

DeviceHandler.prototype.handleMidi1 = function (status, data1, data2)
{

	println ("inside device handler AIUSDHIUASDHAKSJDHAKSJDHALKSJHDAKJSHD");


	var midiChan = MIDIChannel(status);
	// println ("status is: "+ status);


	if (midiChan == 8){
		// if one of the buttons below is released we return true
		var ourButtons = [
			Q_DEV_1_PIN,
			Q_DEV_2_PIN,
			Q_DEV_3_PIN
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1)
		{

			case Q_DEV_1_PIN:
				println ("PRESSED PIN 1");
				this.cursorTrack1.isPinned ().toggle ();
				this.cursorDevice1.isPinned ().toggle ();
				this.toggleLED(this.cursorDevice1, Q_DEV_1_PIN);
				return true;

			case Q_DEV_2_PIN:
				println ("PRESSED PIN 2");
				this.cursorTrack2.isPinned ().toggle ();
				this.cursorDevice2.isPinned ().toggle ();
				this.toggleLED(this.cursorDevice2, Q_DEV_2_PIN);
				return true;

			case Q_DEV_3_PIN:
				println ("PRESSED PIN 3");
				this.cursorTrack3.isPinned ().toggle ();
				this.cursorDevice3.isPinned ().toggle ();
				this.toggleLED(this.cursorDevice3, Q_DEV_3_PIN);
				return true;

			default:
				return false;
		}
	}
	return false;    
}