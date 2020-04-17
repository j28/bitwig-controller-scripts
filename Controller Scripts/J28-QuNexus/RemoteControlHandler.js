function RemoteControlHandler (remoteControlsBank1, remoteControlsBank2, remoteControlsBank3)
{

	this.remoteControlsBank1 = remoteControlsBank1;
	this.remoteControlsBank2 = remoteControlsBank2;
	this.remoteControlsBank3 = remoteControlsBank3;

	var i;
	for (i = 0; i < this.remoteControlsBank1.getParameterCount (); i++){
		this.remoteControlsBank1.getParameter (i).markInterested ();
		this.remoteControlsBank1.getParameter (i).setIndication (true);
	}

	var j;
	for (j = 0; j < this.remoteControlsBank2.getParameterCount (); j++){
		this.remoteControlsBank2.getParameter (j).markInterested ();
		this.remoteControlsBank2.getParameter (j).setIndication (true);
	}

	var h;
	for (h = 0; h < this.remoteControlsBank3.getParameterCount (); h++){
		this.remoteControlsBank3.getParameter (h).markInterested ();
		this.remoteControlsBank3.getParameter (h).setIndication (true);
	}

	this.remoteControlsBank1.pageCount ().markInterested ();
	this.remoteControlsBank2.pageCount ().markInterested ();
	this.remoteControlsBank3.pageCount ().markInterested ();

}

RemoteControlHandler.prototype.handleMidi1 = function (status, data1, data2)
{

	// println ("inside remote control handler");
	var midiChan = MIDIChannel(status);
	// println ("midichannel is: "+ midiChan);
	// println ("data VARUM1: "+ data1);


	if (midiChan == 8){
		switch (data1)
		{

			case Q_DEV_1_NOTE_1:
				println ("PRESSED DEV 1 BUT 1");
				this.remoteControlsBank1.getParameter (0).set (data2, 128);
				return true;

			case Q_DEV_1_NOTE_2:
				println ("PRESSED DEV 1 BUT 2");
				this.remoteControlsBank1.getParameter (1).set (data2, 128);
				return true;

			case Q_DEV_1_NOTE_3:
				println ("PRESSED DEV 1 BUT 3");
				this.remoteControlsBank1.getParameter (2).set (data2, 128);
				return true;

			case Q_DEV_1_NOTE_4:
				println ("PRESSED DEV 1 BUT 4");
				this.remoteControlsBank1.getParameter (4).set (data2, 128);
				return true;

			case Q_DEV_2_NOTE_1:
				println ("PRESSED DEV 2 BUT 1");
				this.remoteControlsBank2.getParameter (0).set (data2, 128);
				return true;

			case Q_DEV_2_NOTE_2:
				println ("PRESSED DEV 2 BUT 2");
				this.remoteControlsBank2.getParameter (1).set (data2, 128);
				return true;

			case Q_DEV_2_NOTE_3:
				println ("PRESSED DEV 2 BUT 3");
				this.remoteControlsBank2.getParameter (2).set (data2, 128);
				return true;

			case Q_DEV_2_NOTE_4:
				println ("PRESSED DEV 2 BUT 4");
				this.remoteControlsBank2.getParameter (4).set (data2, 128);
				return true;


			case Q_DEV_3_NOTE_1:
				println ("PRESSED DEV 3 BUT 1");
				this.remoteControlsBank3.getParameter (0).set (data2, 128);
				return true;

			case Q_DEV_3_NOTE_2:
				println ("PRESSED DEV 3 BUT 2");
				this.remoteControlsBank3.getParameter (1).set (data2, 128);
				return true;

			case Q_DEV_3_NOTE_3:
				println ("PRESSED DEV 3 BUT 3");
				this.remoteControlsBank3.getParameter (2).set (data2, 128);
				return true;

			case Q_DEV_3_NOTE_4:
				println ("PRESSED DEV 3 BUT 4");
				this.remoteControlsBank3.getParameter (4).set (data2, 128);
				return true;

			default:
				return false;
		}
	}
	return false;    
}