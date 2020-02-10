function RemoteControlHandler (cursorDevice, remoteControlsBank, cursorTrack)
{
	// println ("cursor device is yooo ");
	if(cursorTrack)
		this.cursorTrack = cursorTrack;

	this.cursorDevice = cursorDevice;
	this.remoteControlsBank = remoteControlsBank;

	var i;
	for (i = 0; i < this.remoteControlsBank.getParameterCount (); i++){
		this.remoteControlsBank.getParameter (i).markInterested ();
		this.remoteControlsBank.getParameter (i).setIndication (true);
	}

	this.remoteControlsBank.pageCount ().markInterested ();
	this.cursorDevice.position ().markInterested ();

	this.cursorDevice.isExpanded ().markInterested ();
	this.cursorDevice.isEnabled ().markInterested ();
	this.cursorDevice.isWindowOpen ().markInterested ();

}

RemoteControlHandler.prototype.selectParameter = function (parameterNum)
{
	this.remoteControlsBank.selectFirst ();
	var i;
	for (i = 0; i < parameterNum; i++)
		this.remoteControlsBank.selectNext ();
}
RemoteControlHandler.prototype.handleMidi1 = function (status, data1, data2)
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
			NK2_BUTTON_R1,
			NK2_BUTTON_R2,
			NK2_BUTTON_R3,
			NK2_BUTTON_R4,
			NK2_BUTTON_R5,
			NK2_BUTTON_R6,
			NK2_BUTTON_R7,
			NK2_BUTTON_R8,
			NK2_BUTTON_PREV_TRACK,
			NK2_BUTTON_NEXT_TRACK,
			NK2_BUTTON_REW,
			NK2_BUTTON_FF,
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

			case NK2_BUTTON_R1:
				this.selectParameter(0);
				return true;

			case NK2_BUTTON_R2:
				this.selectParameter(1);
				return true;

			case NK2_BUTTON_R3:
				this.selectParameter(2);
				return true;

			case NK2_BUTTON_R4:
				this.selectParameter(3);
				return true;

			case NK2_BUTTON_R5:
				this.selectParameter(4);
				return true;

			case NK2_BUTTON_R6:
				this.selectParameter(5);
				return true;

			case NK2_BUTTON_R7:
				this.selectParameter(6);
				return true;

			case NK2_BUTTON_R8:
				this.selectParameter(7);
				return true;

			case NK2_KNOB1:
				this.remoteControlsBank.getParameter (0).set (data2, 128);
				return true;

			case NK2_KNOB2:
				this.remoteControlsBank.getParameter (1).set (data2, 128);
				return true;

			case NK2_KNOB3:
				this.remoteControlsBank.getParameter (2).set (data2, 128);
				return true;

			case NK2_KNOB4:
				this.remoteControlsBank.getParameter (3).set (data2, 128);
				return true;

			case NK2_KNOB5:
				this.remoteControlsBank.getParameter (4).set (data2, 128);
				return true;

			case NK2_KNOB6:
				this.remoteControlsBank.getParameter (5).set (data2, 128);
				return true;

			case NK2_KNOB7:
				this.remoteControlsBank.getParameter (6).set (data2, 128);
				return true;

			case NK2_KNOB8:
				// if set is pressed the 8th knobs controls the tempo
				// println ("tempo is: " + globalTransport.tempo ().get());
				// isSetPressed ? 	globalTransport.tempo ().set(data2, 128) : this.remoteControlsBank.getParameter (7).set (data2, 128);
				if (isSetPressed){
					globalTransport.tempo ().setRaw(data2 + 34)
				}else{
					// if(data2 == 1){ data2 = 0 }
					this.remoteControlsBank.getParameter (7).set (data2, 128);
				}
				// isSetPressed ? globalTransport.tempo ().setRaw(data2 + 34) : this.remoteControlsBank.getParameter (7).set (data2, 128);
				// this.remoteControlsBank.getParameter (7).set (data2, 128);
				return true;

			case NK2_BUTTON_PREV_TRACK:
				this.cursorDevice.isEnabled ().toggle ();
				return true;

			case NK2_BUTTON_NEXT_TRACK:
				this.cursorDevice.isWindowOpen ().toggle ();
				return true;

			case NK2_BUTTON_REW:
				this.cursorDevice.isEnabled ().toggle ();
				return true;

			case NK2_BUTTON_FF:
				this.cursorDevice.isWindowOpen ().toggle ();
				return true;

			case NK2_BUTTON_CYCLE:
				this.cursorDevice.isExpanded ().toggle ();
				return true;

			default:
				return false;
		}
	}
	return false;    
}


RemoteControlHandler.prototype.handleMidi2 = function (status, data1, data2)
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
			NK2_BUTTON_R1,
			NK2_BUTTON_R2,
			NK2_BUTTON_R3,
			NK2_BUTTON_R4,
			NK2_BUTTON_R5,
			NK2_BUTTON_R6,
			NK2_BUTTON_R7,
			NK2_BUTTON_R8,
			NK2_BUTTON_PREV_TRACK,
			NK2_BUTTON_NEXT_TRACK,
			NK2_BUTTON_REW,
			NK2_BUTTON_FF,
			NK2_BUTTON_CYCLE
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1)
		{


			// case NK2_BUTTON_M1:
			// 	this.cursorTrack.selectPrevious	();
			// 	return true;

			// case NK2_BUTTON_M2:
			// 	this.cursorTrack.selectNext	();
			// 	return true;



			// case NK2_BUTTON_M1:
			// 	this.cursorDevice.selectDevice(deviceBank.getDevice (8));
			// 	return true;

			// case NK2_BUTTON_M2:
			// 	this.cursorDevice.selectDevice(deviceBank.getDevice (9));
			// 	return true;

			// case NK2_BUTTON_M3:
			// 	this.cursorDevice.selectDevice(deviceBank.getDevice (10));
			// 	return true;

			// case NK2_BUTTON_M4:
			// 	this.cursorDevice.selectDevice(deviceBank.getDevice (11));
			// 	return true;

			// case NK2_BUTTON_M5:
			// 	this.cursorDevice.selectDevice(deviceBank.getDevice (12));
			// 	return true;

			// case NK2_BUTTON_M6:
			// 	this.cursorDevice.selectDevice(deviceBank.getDevice (13));
			// 	return true;

			// case NK2_BUTTON_M7:
			// 	this.cursorDevice.selectDevice(deviceBank.getDevice (14));
			// 	return true;

			// case NK2_BUTTON_M8:
			// 	this.cursorDevice.selectDevice(deviceBank.getDevice (15));
			// 	return true;

			// case NK2_BUTTON_R1:
			// 	this.selectParameter(0);
			// 	return true;

			// case NK2_BUTTON_R2:
			// 	this.selectParameter(1);
			// 	return true;

			// case NK2_BUTTON_R3:
			// 	this.selectParameter(2);
			// 	return true;

			// case NK2_BUTTON_R4:
			// 	this.selectParameter(3);
			// 	return true;

			// case NK2_BUTTON_R5:
			// 	this.selectParameter(4);
			// 	return true;

			// case NK2_BUTTON_R6:
			// 	this.selectParameter(5);
			// 	return true;

			// case NK2_BUTTON_R7:
			// 	this.selectParameter(6);
			// 	return true;

			// case NK2_BUTTON_R8:
			// 	this.selectParameter(7);
			// 	return true;

			case NK2_KNOB1:
				this.remoteControlsBank.getParameter (0).set (data2, 128);
				return true;

			case NK2_KNOB2:
				this.remoteControlsBank.getParameter (1).set (data2, 128);
				return true;

			case NK2_KNOB3:
				this.remoteControlsBank.getParameter (2).set (data2, 128);
				return true;

			case NK2_KNOB4:
				this.remoteControlsBank.getParameter (3).set (data2, 128);
				return true;

			case NK2_KNOB5:
				this.remoteControlsBank.getParameter (4).set (data2, 128);
				return true;

			case NK2_KNOB6:
				this.remoteControlsBank.getParameter (5).set (data2, 128);
				return true;

			case NK2_KNOB7:
				this.remoteControlsBank.getParameter (6).set (data2, 128);
				return true;

			case NK2_KNOB8:
				// if set is pressed the 8th knobs controls the tempo
				// println ("tempo is: " + globalTransport.tempo ().get());
				// isSetPressed ? 	globalTransport.tempo ().set(data2, 128) : this.remoteControlsBank.getParameter (7).set (data2, 128);
				if (isSetPressed){
					globalTransport.tempo ().setRaw(data2 + 34)
				}else{
					// if(data2 == 1){ data2 = 0 }
					this.remoteControlsBank.getParameter (7).set (data2, 128);
				}
				// isSetPressed ? globalTransport.tempo ().setRaw(data2 + 34) : this.remoteControlsBank.getParameter (7).set (data2, 128);
				// this.remoteControlsBank.getParameter (7).set (data2, 128);
				return true;

			// case NK2_BUTTON_PREV_TRACK:
			// 	this.cursorDevice.isEnabled ().toggle ();
			// 	return true;

			// case NK2_BUTTON_NEXT_TRACK:
			// 	this.cursorDevice.isWindowOpen ().toggle ();
			// 	return true;

			// case NK2_BUTTON_REW:
			// 	this.cursorDevice.isEnabled ().toggle ();
			// 	return true;

			// case NK2_BUTTON_FF:
			// 	this.cursorDevice.isWindowOpen ().toggle ();
			// 	return true;

			// case NK2_BUTTON_CYCLE:
			// 	this.cursorDevice.isExpanded ().toggle ();
			// 	return true;

			default:
				return false;
		}

	}
	return false;    
}

RemoteControlHandler.prototype.updateLEDs = function ()
{
	println ("remote controls page count: " + this.remoteControlsBank.pageCount ().get ());
	// hardware1.updateLEDcontrols (this.remoteControlsBank.pageCount ().get ());
}