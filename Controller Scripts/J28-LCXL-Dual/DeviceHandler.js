function DeviceHandler (cursorTrack1, cursorTrack2, cursorTrack3, cursorDevice, cursorDevice2, cursorDevice3){

	// println ("cursor device is yooo ");
	if(cursorTrack1)
		this.cursorTrack1 = cursorTrack1;
	if(cursorTrack2)
		this.cursorTrack2 = cursorTrack2;
	if(cursorTrack3)
		this.cursorTrack3 = cursorTrack3;

	this.cursorDevice = cursorDevice;
	this.cursorDevice2 = cursorDevice2;
	this.cursorDevice3 = cursorDevice3;

	this.cursorDevice.position ().markInterested ();

	this.cursorDevice.isExpanded ().markInterested ();
	this.cursorDevice.isEnabled ().markInterested ();
	this.cursorDevice.isWindowOpen ().markInterested ();
	this.cursorDevice.slotNames ().markInterested ();
	// this.cursorDevice.getCursorSlot ().name ().markInterested ();

	deviceBank = cursorTrack1.createDeviceBank (16);
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

DeviceHandler.prototype.handleMidi1 = function (status, data1, data2){

	var midiChan = MIDIChannel(status);
	println ("midichannel is: "+ midiChan);

	if (isChannelController(status)){

		// if one of the buttons below is released we return true
		var ourButtons = [
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1){

			// case NK2_BUTTON_REW:
			// 	this.cursorDevice.isEnabled ().toggle ();
			// 	return true;

			// case NK2_BUTTON_FF:
			// 	this.cursorDevice.isWindowOpen ().toggle ();
			// 	return true;

			// case NK2_BUTTON_PREV_TRACK:
			// 	isSetPressed ? this.cursorDevice.selectPrevious () : this.cursorTrack1.selectPrevious ();
			// 	return true;

			// case NK2_BUTTON_NEXT_TRACK:
			// 	isSetPressed ? this.cursorDevice.selectNext () : this.cursorTrack1.selectNext ();
			// 	return true;

			// case NK2_BUTTON_CYCLE:
			// 	isSetPressed ? this.cursorDevice.isPinned ().toggle () : this.cursorTrack1.isPinned ().toggle ();
			// 	return true;

			default:
				return false;
		}
	}
	return false;    

}

DeviceHandler.prototype.handleMidi2 = function (status, data1, data2){

	var midiChan = MIDIChannel(status);
	println ("midichannel is: "+ midiChan);

	if (isChannelController(status)){

		// if one of the buttons below is released we return true
		var ourButtons = [

		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1){

			// case NK2_BUTTON_FF:
			// 	this.cursorDevice.isExpanded ().toggle ();
			// 	return true;

			// case NK2_BUTTON_PREV_TRACK:
			// 	isSet2Pressed ? this.cursorDevice2.selectPrevious () : this.cursorTrack2.selectPrevious ();
			// 	return true;

			// case NK2_BUTTON_NEXT_TRACK:
			// 	isSet2Pressed ? this.cursorDevice2.selectNext () : this.cursorTrack2.selectNext ();
			// 	return true;

			// case NK2_BUTTON_CYCLE:
			// 	isSet2Pressed ? this.cursorDevice2.isPinned ().toggle () : this.cursorTrack2.isPinned ().toggle ();
			// 	return true;

			default:
				return false;
		}

	}
	return false;    
}

DeviceHandler.prototype.updateLEDdevices = function (){

}