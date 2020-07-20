const LCXL_FADER1 = 77;
const LCXL_FADER2 = 78;
const LCXL_FADER3 = 79;
const LCXL_FADER4 = 80;
const LCXL_FADER5 = 81;
const LCXL_FADER6 = 82;
const LCXL_FADER7 = 83;
const LCXL_FADER8 = 84;

const LCXL_ROW1_KNOB1 = 13;
const LCXL_ROW1_KNOB2 = 14;
const LCXL_ROW1_KNOB3 = 15;
const LCXL_ROW1_KNOB4 = 16;
const LCXL_ROW1_KNOB5 = 17;
const LCXL_ROW1_KNOB6 = 18;
const LCXL_ROW1_KNOB7 = 19;
const LCXL_ROW1_KNOB8 = 20;

const LCXL_ROW2_KNOB1 = 29;
const LCXL_ROW2_KNOB2 = 30;
const LCXL_ROW2_KNOB3 = 31;
const LCXL_ROW2_KNOB4 = 32;
const LCXL_ROW2_KNOB5 = 33;
const LCXL_ROW2_KNOB6 = 34;
const LCXL_ROW2_KNOB7 = 35;
const LCXL_ROW2_KNOB8 = 36;

const LCXL_ROW3_KNOB1 = 49;
const LCXL_ROW3_KNOB2 = 50;
const LCXL_ROW3_KNOB3 = 51;
const LCXL_ROW3_KNOB4 = 52;
const LCXL_ROW3_KNOB5 = 53;
const LCXL_ROW3_KNOB6 = 54;
const LCXL_ROW3_KNOB7 = 55;
const LCXL_ROW3_KNOB8 = 56;

const LCXL_BUTTON_FOCUS1 = 41;
const LCXL_BUTTON_FOCUS2 = 42;
const LCXL_BUTTON_FOCUS3 = 43;
const LCXL_BUTTON_FOCUS4 = 44;
const LCXL_BUTTON_FOCUS5 = 57;
const LCXL_BUTTON_FOCUS6 = 58;
const LCXL_BUTTON_FOCUS7 = 59;
const LCXL_BUTTON_FOCUS8 = 60;

const LCXL_KNOBS = [
	[13, 29, 45, 61, 77, 93, 109, 125],
	[14, 30, 46, 62, 78, 94, 110, 126],
	[15, 31, 47, 63, 79, 95, 111, 127]
];

function LCXLHardware (outputPort, inputPort, midiCallback, sysexCallback){
	this.portOut = outputPort;
	this.portIn  = inputPort;
	this.ledCache = initArray (-1, 128);
	this.portIn.setMidiCallback (midiCallback);
	this.portIn.setSysexCallback (sysexCallback);
}

LCXLHardware.prototype.updateLEDtracks = function (ledOn, currentController){

	var currentController = currentController;

	var led1Midi = null;
	if (LCXL1UserModeIndex == 1){
		led1Midi = 145;
	} else {
		led1Midi = 146;
	}

	var led2Midi = null;
	if (LCXL2UserModeIndex == 1){
		led2Midi = 145;
	} else {
		led2Midi = 146;
	}

	host.getMidiOutPort (0).sendMidi (led1Midi, 13, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 14, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 15, 0);

	host.getMidiOutPort (0).sendMidi (led1Midi, 29, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 30, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 31, 0);

	host.getMidiOutPort (0).sendMidi (led1Midi, 45, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 46, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 47, 0);

	host.getMidiOutPort (0).sendMidi (led1Midi, 61, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 62, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 63, 0);

	host.getMidiOutPort (0).sendMidi (led1Midi, 77, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 78, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 79, 0);

	host.getMidiOutPort (0).sendMidi (led1Midi, 93, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 94, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 95, 0);

	host.getMidiOutPort (0).sendMidi (led1Midi, 109, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 110, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 111, 0);

	host.getMidiOutPort (0).sendMidi (led1Midi, 125, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 126, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 127, 0);


	host.getMidiOutPort (1).sendMidi (led2Midi, 13, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 14, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 15, 0);

	host.getMidiOutPort (1).sendMidi (led2Midi, 29, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 30, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 31, 0);

	host.getMidiOutPort (1).sendMidi (led2Midi, 45, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 46, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 47, 0);

	host.getMidiOutPort (1).sendMidi (led2Midi, 61, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 62, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 63, 0);

	host.getMidiOutPort (1).sendMidi (led2Midi, 77, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 78, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 79, 0);

	host.getMidiOutPort (1).sendMidi (led2Midi, 93, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 94, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 95, 0);

	host.getMidiOutPort (1).sendMidi (led2Midi, 109, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 110, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 111, 0);

	host.getMidiOutPort (1).sendMidi (led2Midi, 125, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 126, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 127, 0);

	// host.getMidiOutPort (0).sendMidi (145, LCXL_KNOBS[0][0], 0);
	// host.getMidiOutPort (0).sendMidi (145, LCXL_KNOBS[1][0], 0);
	// host.getMidiOutPort (0).sendMidi (145, LCXL_KNOBS[2][0], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[0][1], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[1][1], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[2][1], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[0][2], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[1][2], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[2][2], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[0][3], 12);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[1][3], 12);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[2][3], 12);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[0][4], 12);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[1][4], 12);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[2][4], 12);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[0][5], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[1][5], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[2][5], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[0][6], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[1][6], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[2][6], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[0][7], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[1][7], 0);
	// host.getMidiOutPort (0).sendMidi (144, LCXL_KNOBS[2][7], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[0][0], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[1][0], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[2][0], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[0][1], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[1][1], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[2][1], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[0][2], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[1][2], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[2][2], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[0][3], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[1][3], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[2][3], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[0][4], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[1][4], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[2][4], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[0][5], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[1][5], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[2][5], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[0][6], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[1][6], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[2][6], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[0][7], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[1][7], 0);
	// host.getMidiOutPort (1).sendMidi (144, LCXL_KNOBS[2][7], 0);

	// turn off the track lights for both controllers first
	host.getMidiOutPort (0).sendMidi (led1Midi, 41, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 42, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 43, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 44, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 57, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 58, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 59, 0);
	host.getMidiOutPort (0).sendMidi (led1Midi, 60, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 41, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 42, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 43, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 44, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 57, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 58, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 59, 0);
	host.getMidiOutPort (1).sendMidi (led2Midi, 60, 0);

	// turn on the led for the track that is pressed
	// println ("led on is: "+ ledOn);

	if (currentController == 1) {
		this.portOut.sendMidi (led1Midi, ledOn, 60);		
	} else {
		this.portOut.sendMidi (led2Midi, ledOn, 60);				
	}

	// this.portOut.sendMidi (145, ledOn, 60);

	for (i = 0; i < trackHandler.trackbank.getSizeOfBank (); i++){

		var track = trackHandler.trackbank.getItemAt (i);
		g = track.isGroup ().get ();
		if (i < 8){
			if (g == true){
				host.getMidiOutPort (0).sendMidi (led1Midi, LCXL_KNOBS[0][i], 15);
				host.getMidiOutPort (0).sendMidi (led1Midi, LCXL_KNOBS[1][i], 15);
				if (LCXL1UserModeIndex == 1){
					host.getMidiOutPort (0).sendMidi (led1Midi, LCXL_KNOBS[2][i], 15);
				} else {
					host.getMidiOutPort (0).sendMidi (led1Midi, LCXL_KNOBS[2][i], 60);					
				}
			} else {
				host.getMidiOutPort (0).sendMidi (led1Midi, LCXL_KNOBS[0][i], 0);
				host.getMidiOutPort (0).sendMidi (led1Midi, LCXL_KNOBS[1][i], 0);
				host.getMidiOutPort (0).sendMidi (led1Midi, LCXL_KNOBS[2][i], 0);
				if (LCXL1UserModeIndex == 1){
					host.getMidiOutPort (0).sendMidi (led1Midi, LCXL_KNOBS[2][i], 0);
				} else {
					host.getMidiOutPort (0).sendMidi (led1Midi, LCXL_KNOBS[2][i], 60);					
				}
			}
		} else {
			var trackIndex = i - 8;
			if (g == true){
				host.getMidiOutPort (1).sendMidi (led2Midi, LCXL_KNOBS[0][trackIndex], 15);
				host.getMidiOutPort (1).sendMidi (led2Midi, LCXL_KNOBS[1][trackIndex], 15);
				host.getMidiOutPort (1).sendMidi (led2Midi, LCXL_KNOBS[2][trackIndex], 15);
			} else {
				host.getMidiOutPort (1).sendMidi (led2Midi, LCXL_KNOBS[0][trackIndex], 0);
				host.getMidiOutPort (1).sendMidi (led2Midi, LCXL_KNOBS[1][trackIndex], 0);
				host.getMidiOutPort (1).sendMidi (led2Midi, LCXL_KNOBS[2][trackIndex], 0);
			}						
		}
	}

}