function RemoteControlHandler (remoteControlsBank, handlerIndex){

	this.remoteControlsBank = remoteControlsBank;

	var i;
	for (i = 0; i < this.remoteControlsBank.getParameterCount (); i++){
		this.remoteControlsBank.getParameter (i).markInterested ();
		this.remoteControlsBank.getParameter (i).setIndication (true);
	}

	this.remoteControlsBank.pageCount ().markInterested ();

	this.handlerIndex = handlerIndex;

}

RemoteControlHandler.prototype.selectParameter = function (parameterNum){
	this.remoteControlsBank.selectFirst ();
	var i;
	for (i = 0; i < parameterNum; i++)
		this.remoteControlsBank.selectNext ();
}

RemoteControlHandler.prototype.handleMidi1 = function (status, data1, data2){

	var midiChan = MIDIChannel(status);
	println ("midichannel is: "+ midiChan);
	println ("this.handlerIndex: "+ this.handlerIndex);
	println ("status: "+ status);
	println ("data1: "+ data1);
	println ("data2: "+ data2);

	if (isChannelController(status)){

		// if one of the buttons below is released we return true
		var ourButtons = [
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		if (this.handlerIndex == 0){
			switch (data1){

				case LCXL_ROW3_KNOB1:
					this.remoteControlsBank.getParameter (0).set (data2, 128);
					return true;

				case LCXL_ROW3_KNOB2:
					this.remoteControlsBank.getParameter (1).set (data2, 128);
					return true;

				case LCXL_ROW3_KNOB3:
					this.remoteControlsBank.getParameter (2).set (data2, 128);
					return true;

				case LCXL_ROW3_KNOB4:
					this.remoteControlsBank.getParameter (3).set (data2, 128);
					return true;

				case LCXL_ROW3_KNOB5:
					this.remoteControlsBank.getParameter (4).set (data2, 128);
					return true;

				case LCXL_ROW3_KNOB6:
					this.remoteControlsBank.getParameter (5).set (data2, 128);
					return true;

				case LCXL_ROW3_KNOB7:
					this.remoteControlsBank.getParameter (6).set (data2, 128);
					return true;

				case LCXL_ROW3_KNOB8:
					this.remoteControlsBank.getParameter (7).set (data2, 128);
					return true;

				default:
					return false;

			}
		}

		if (this.handlerIndex == 1){
			switch (data1){

				case LCXL_ROW1_KNOB1:
					this.remoteControlsBank.getParameter (0).set (data2, 128);
					this.updateLEDcontrols (13, data2, true);
					return true;

				case LCXL_ROW2_KNOB1:
					this.remoteControlsBank.getParameter (1).set (data2, 128);
					this.updateLEDcontrols (14, data2, false);
					return true;

				case LCXL_ROW3_KNOB1:
					this.remoteControlsBank.getParameter (2).set (data2, 128);
					return true;

				default:
					return false;

			}
		}

		if (this.handlerIndex == 2){
			switch (data1){

				case LCXL_ROW1_KNOB2:
					this.remoteControlsBank.getParameter (0).set (data2, 128);
					this.updateLEDcontrols (29, data2, true);
					return true;

				case LCXL_ROW2_KNOB2:
					this.remoteControlsBank.getParameter (1).set (data2, 128);
					this.updateLEDcontrols (30, data2, false);
					return true;

				case LCXL_ROW3_KNOB2:
					this.remoteControlsBank.getParameter (2).set (data2, 128);
					return true;

				default:
					return false;

			}
		}

		if (this.handlerIndex == 3){
			switch (data1){

				case LCXL_ROW1_KNOB3:
					this.remoteControlsBank.getParameter (0).set (data2, 128);
					this.updateLEDcontrols (45, data2, true);
					return true;

				case LCXL_ROW2_KNOB3:
					this.remoteControlsBank.getParameter (1).set (data2, 128);
					this.updateLEDcontrols (46, data2, false);
					return true;

				case LCXL_ROW3_KNOB3:
					this.remoteControlsBank.getParameter (2).set (data2, 128);
					return true;

				default:
					return false;

			}
		}

		if (this.handlerIndex == 4){
			switch (data1){

				case LCXL_ROW1_KNOB4:
					this.remoteControlsBank.getParameter (0).set (data2, 128);
					this.updateLEDcontrols (61, data2, true);
					return true;

				case LCXL_ROW2_KNOB4:
					this.remoteControlsBank.getParameter (1).set (data2, 128);
					this.updateLEDcontrols (62, data2, false);
					return true;

				case LCXL_ROW3_KNOB4:
					this.remoteControlsBank.getParameter (2).set (data2, 128);
					return true;

				default:
					return false;

			}
		}

		if (this.handlerIndex == 5){
			switch (data1){

				case LCXL_ROW1_KNOB5:
					this.remoteControlsBank.getParameter (0).set (data2, 128);
					this.updateLEDcontrols (77, data2, true);
					return true;

				case LCXL_ROW2_KNOB5:
					this.remoteControlsBank.getParameter (1).set (data2, 128);
					this.updateLEDcontrols (78, data2, false);
					return true;

				case LCXL_ROW3_KNOB5:
					this.remoteControlsBank.getParameter (2).set (data2, 128);
					return true;

				default:
					return false;

			}
		}

		if (this.handlerIndex == 6){
			switch (data1){

				case LCXL_ROW1_KNOB6:
					this.remoteControlsBank.getParameter (0).set (data2, 128);
					this.updateLEDcontrols (93, data2, true);
					return true;

				case LCXL_ROW2_KNOB6:
					this.remoteControlsBank.getParameter (1).set (data2, 128);
					this.updateLEDcontrols (94, data2, false);
					return true;

				case LCXL_ROW3_KNOB6:
					this.remoteControlsBank.getParameter (2).set (data2, 128);
					return true;

				default:
					return false;

			}
		}

		if (this.handlerIndex == 7){
			switch (data1){

				case LCXL_ROW1_KNOB7:
					this.remoteControlsBank.getParameter (0).set (data2, 128);
					this.updateLEDcontrols (109, data2, true);
					return true;

				case LCXL_ROW2_KNOB7:
					this.remoteControlsBank.getParameter (1).set (data2, 128);
					this.updateLEDcontrols (110, data2, false);
					return true;

				case LCXL_ROW3_KNOB7:
					this.remoteControlsBank.getParameter (2).set (data2, 128);
					return true;

				default:
					return false;

			}
		}

		if (this.handlerIndex == 8){
			switch (data1){

				case LCXL_ROW1_KNOB8:
					this.remoteControlsBank.getParameter (0).set (data2, 128);
					this.updateLEDcontrols (125, data2, true);
					return true;

				case LCXL_ROW2_KNOB8:
					this.remoteControlsBank.getParameter (1).set (data2, 128);
					this.updateLEDcontrols (126, data2, false);
					return true;

				case LCXL_ROW3_KNOB8:
					this.remoteControlsBank.getParameter (2).set (data2, 128);
					return true;

				default:
					return false;

			}
		}

	}
	return false;    

}


RemoteControlHandler.prototype.updateLEDcontrols = function (knob, knobValue, invert){


	hardware1.updateLEDcontrols (knob, knobValue, invert);

	// println ("remote controls page count: " + this.remoteControlsBank.pageCount ().get ());

}