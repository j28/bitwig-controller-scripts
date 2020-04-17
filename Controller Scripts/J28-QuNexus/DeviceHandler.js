function DeviceHandler (cursorTrack, cursorDevice)
{
	// println ("cursor device is yooo ");
	if(cursorTrack)
		this.cursorTrack = cursorTrack;

	this.cursorDevice = cursorDevice;

	this.cursorDevice.position ().markInterested ();

	this.cursorDevice.isExpanded ().markInterested ();
	this.cursorDevice.isEnabled ().markInterested ();
	this.cursorDevice.isWindowOpen ().markInterested ();
	this.cursorDevice.slotNames ().markInterested ();

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

	println ("inside device handler");
	var midiChan = MIDIChannel(status);
	println ("midichannel is: "+ midiChan);

	if (midiChan == 8){
		// if one of the buttons below is released we return true
		var ourButtons = [
			Q_PIN
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1)
		{

			case Q_PIN:
				println ("PRESSED PIN");
				this.cursorDevice.isPinned ().toggle ();
				this.cursorTrack.isPinned ().toggle ();
				return true;

			default:
				return false;
		}
	}
	return false;    
}