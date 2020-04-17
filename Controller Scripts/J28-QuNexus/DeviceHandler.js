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


	this.cursorDevice1.position ().markInterested ();

	// this.cursorDevice.isExpanded ().markInterested ();
	// this.cursorDevice.isEnabled ().markInterested ();
	// this.cursorDevice.isWindowOpen ().markInterested ();
	// this.cursorDevice.slotNames ().markInterested ();

	// deviceBank = cursorTrack.createDeviceBank (16);
	// deviceBank.getDevice (0).name ().markInterested ();
	// deviceBank.getDevice (1).name ().markInterested ();
	// deviceBank.getDevice (2).name ().markInterested ();
	// deviceBank.getDevice (3).name ().markInterested ();
	// deviceBank.getDevice (4).name ().markInterested ();
	// deviceBank.getDevice (5).name ().markInterested ();
	// deviceBank.getDevice (6).name ().markInterested ();
	// deviceBank.getDevice (7).name ().markInterested ();
	// deviceBank.getDevice (8).name ().markInterested ();
	// deviceBank.getDevice (9).name ().markInterested ();
	// deviceBank.getDevice (10).name ().markInterested ();
	// deviceBank.getDevice (11).name ().markInterested ();
	// deviceBank.getDevice (12).name ().markInterested ();
	// deviceBank.getDevice (13).name ().markInterested ();
	// deviceBank.getDevice (14).name ().markInterested ();
	// deviceBank.getDevice (15).name ().markInterested ();

}

DeviceHandler.prototype.handleMidi1 = function (status, data1, data2)
{

	println ("inside device handler");


	var midiChan = MIDIChannel(status);
	println ("status is: "+ status);
	host.getMidiOutPort (0).sendMidi (136, 48, 127);

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
				this.cursorDevice1.isPinned ().toggle ();
				this.cursorTrack1.isPinned ().toggle ();
				return true;

			case Q_DEV_2_PIN:
				println ("PRESSED PIN 2");
				this.cursorDevice2.isPinned ().toggle ();
				this.cursorTrack2.isPinned ().toggle ();
				return true;

			case Q_DEV_3_PIN:
				println ("PRESSED PIN 3");
				this.cursorDevice3.isPinned ().toggle ();
				this.cursorTrack3.isPinned ().toggle ();
				return true;

			default:
				return false;
		}
	}
	return false;    
}