function RemoteControlHandler (remoteControlsBank)
{

	this.remoteControlsBank = remoteControlsBank;

	var i;
	for (i = 0; i < this.remoteControlsBank.getParameterCount (); i++){
		this.remoteControlsBank.getParameter (i).markInterested ();
		this.remoteControlsBank.getParameter (i).setIndication (true);
	}

	this.remoteControlsBank.pageCount ().markInterested ();

}

RemoteControlHandler.prototype.handleMidi1 = function (status, data1, data2)
{

	println ("inside remote control handler");
	var midiChan = MIDIChannel(status);
	println ("midichannel is: "+ midiChan);
	println ("data1: "+ data1);

	if (midiChan == 8){
		switch (data1)
		{

			case Q_NOTE_1:
				println ("PRESSED 1");
				this.remoteControlsBank.getParameter (0).set (data2, 128);
				return true;

			case Q_NOTE_2:
				println ("PRESSED 2");
				this.remoteControlsBank.getParameter (1).set (data2, 128);
				return true;

			case Q_NOTE_3:
				println ("PRESSED 3");
				this.remoteControlsBank.getParameter (2).set (data2, 128);
				return true;

			case Q_NOTE_4:
				println ("PRESSED 4");
				this.remoteControlsBank.getParameter (4).set (data2, 128);
				return true;

			// case NK2_KNOB5:
			// 	this.remoteControlsBank.getParameter (4).set (data2, 128);
			// 	return true;

			// case NK2_KNOB6:
			// 	this.remoteControlsBank.getParameter (5).set (data2, 128);
			// 	return true;

			// case NK2_KNOB7:
			// 	this.remoteControlsBank.getParameter (6).set (data2, 128);
			// 	return true;

			// case NK2_KNOB8:
			// 	this.remoteControlsBank.getParameter (7).set (data2, 128);
			// 	return true;

			default:
				return false;
		}
	}
	return false;    
}