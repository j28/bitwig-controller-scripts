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

function LCXLHardware (outputPort, inputPort, inputCallback)
{
	this.portOut = outputPort;
	this.portIn  = inputPort;
	this.ledCache = initArray (-1, 128);
	this.portIn.setMidiCallback (inputCallback);
}

LCXLHardware.prototype.updateLEDtracks = function (ledOn)
{
	// host.getMidiOutPort (0).sendMidi (144, 13, 0);
	// host.getMidiOutPort (0).sendMidi (144, 14, 0);
	// host.getMidiOutPort (0).sendMidi (144, 15, 0);

	// host.getMidiOutPort (0).sendMidi (144, 29, 0);
	// host.getMidiOutPort (0).sendMidi (144, 30, 0);
	// host.getMidiOutPort (0).sendMidi (144, 31, 0);

	// host.getMidiOutPort (0).sendMidi (144, 45, 0);
	// host.getMidiOutPort (0).sendMidi (144, 46, 0);
	// host.getMidiOutPort (0).sendMidi (144, 47, 0);

	// host.getMidiOutPort (0).sendMidi (144, 61, 0);
	// host.getMidiOutPort (0).sendMidi (144, 62, 0);
	// host.getMidiOutPort (0).sendMidi (144, 63, 0);

	// host.getMidiOutPort (0).sendMidi (144, 77, 0);
	// host.getMidiOutPort (0).sendMidi (144, 78, 0);
	// host.getMidiOutPort (0).sendMidi (144, 79, 0);

	// host.getMidiOutPort (0).sendMidi (144, 93, 0);
	// host.getMidiOutPort (0).sendMidi (144, 94, 0);
	// host.getMidiOutPort (0).sendMidi (144, 95, 0);

	// host.getMidiOutPort (0).sendMidi (144, 109, 0);
	// host.getMidiOutPort (0).sendMidi (144, 110, 0);
	// host.getMidiOutPort (0).sendMidi (144, 111, 0);

	// host.getMidiOutPort (0).sendMidi (144, 125, 0);
	// host.getMidiOutPort (0).sendMidi (144, 126, 0);
	// host.getMidiOutPort (0).sendMidi (144, 127, 0);



	host.getMidiOutPort (0).sendMidi (145, 13, 0);
	host.getMidiOutPort (0).sendMidi (145, 14, 0);
	host.getMidiOutPort (0).sendMidi (145, 15, 0);

	host.getMidiOutPort (0).sendMidi (145, 29, 0);
	host.getMidiOutPort (0).sendMidi (145, 30, 0);
	host.getMidiOutPort (0).sendMidi (145, 31, 0);

	host.getMidiOutPort (0).sendMidi (145, 45, 0);
	host.getMidiOutPort (0).sendMidi (145, 46, 0);
	host.getMidiOutPort (0).sendMidi (145, 47, 0);

	host.getMidiOutPort (0).sendMidi (145, 61, 0);
	host.getMidiOutPort (0).sendMidi (145, 62, 0);
	host.getMidiOutPort (0).sendMidi (145, 63, 0);

	host.getMidiOutPort (0).sendMidi (145, 77, 0);
	host.getMidiOutPort (0).sendMidi (145, 78, 0);
	host.getMidiOutPort (0).sendMidi (145, 79, 0);

	host.getMidiOutPort (0).sendMidi (145, 93, 0);
	host.getMidiOutPort (0).sendMidi (145, 94, 0);
	host.getMidiOutPort (0).sendMidi (145, 95, 0);

	host.getMidiOutPort (0).sendMidi (145, 109, 0);
	host.getMidiOutPort (0).sendMidi (145, 110, 0);
	host.getMidiOutPort (0).sendMidi (145, 111, 0);

	host.getMidiOutPort (0).sendMidi (145, 125, 0);
	host.getMidiOutPort (0).sendMidi (145, 126, 0);
	host.getMidiOutPort (0).sendMidi (145, 127, 0);


	host.getMidiOutPort (1).sendMidi (145, 13, 0);
	host.getMidiOutPort (1).sendMidi (145, 14, 0);
	host.getMidiOutPort (1).sendMidi (145, 15, 0);

	host.getMidiOutPort (1).sendMidi (145, 29, 0);
	host.getMidiOutPort (1).sendMidi (145, 30, 0);
	host.getMidiOutPort (1).sendMidi (145, 31, 0);

	host.getMidiOutPort (1).sendMidi (145, 45, 0);
	host.getMidiOutPort (1).sendMidi (145, 46, 0);
	host.getMidiOutPort (1).sendMidi (145, 47, 0);

	host.getMidiOutPort (1).sendMidi (145, 61, 0);
	host.getMidiOutPort (1).sendMidi (145, 62, 0);
	host.getMidiOutPort (1).sendMidi (145, 63, 0);

	host.getMidiOutPort (1).sendMidi (145, 77, 0);
	host.getMidiOutPort (1).sendMidi (145, 78, 0);
	host.getMidiOutPort (1).sendMidi (145, 79, 0);

	host.getMidiOutPort (1).sendMidi (145, 93, 0);
	host.getMidiOutPort (1).sendMidi (145, 94, 0);
	host.getMidiOutPort (1).sendMidi (145, 95, 0);

	host.getMidiOutPort (1).sendMidi (145, 109, 0);
	host.getMidiOutPort (1).sendMidi (145, 110, 0);
	host.getMidiOutPort (1).sendMidi (145, 111, 0);

	host.getMidiOutPort (1).sendMidi (145, 125, 0);
	host.getMidiOutPort (1).sendMidi (145, 126, 0);
	host.getMidiOutPort (1).sendMidi (145, 127, 0);



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

	for (i = 0; i < trackHandler.trackbank.getSizeOfBank (); i++)
	{
		var track = trackHandler.trackbank.getItemAt (i);
		g = track.isGroup ().get ();
		if (i < 8){
			if (g == true){
				host.getMidiOutPort (0).sendMidi (145, LCXL_KNOBS[0][i], 15);
				host.getMidiOutPort (0).sendMidi (145, LCXL_KNOBS[1][i], 15);
				host.getMidiOutPort (0).sendMidi (145, LCXL_KNOBS[2][i], 15);
			} else {
				host.getMidiOutPort (0).sendMidi (145, LCXL_KNOBS[0][i], 0);
				host.getMidiOutPort (0).sendMidi (145, LCXL_KNOBS[1][i], 0);
				host.getMidiOutPort (0).sendMidi (145, LCXL_KNOBS[2][i], 0);
			}			
		} else {
			var trackIndex = i - 8;
			if (g == true){
				host.getMidiOutPort (1).sendMidi (145, LCXL_KNOBS[0][trackIndex], 15);
				host.getMidiOutPort (1).sendMidi (145, LCXL_KNOBS[1][trackIndex], 15);
				host.getMidiOutPort (1).sendMidi (145, LCXL_KNOBS[2][trackIndex], 15);
			} else {
				host.getMidiOutPort (1).sendMidi (145, LCXL_KNOBS[0][trackIndex], 0);
				host.getMidiOutPort (1).sendMidi (145, LCXL_KNOBS[1][trackIndex], 0);
				host.getMidiOutPort (1).sendMidi (145, LCXL_KNOBS[2][trackIndex], 0);
			}						
		}
	}

	// turn off the track lights for both controllers first
	host.getMidiOutPort (0).sendMidi (145, 41, 0);
	host.getMidiOutPort (0).sendMidi (145, 42, 0);
	host.getMidiOutPort (0).sendMidi (145, 43, 0);
	host.getMidiOutPort (0).sendMidi (145, 44, 0);
	host.getMidiOutPort (0).sendMidi (145, 57, 0);
	host.getMidiOutPort (0).sendMidi (145, 58, 0);
	host.getMidiOutPort (0).sendMidi (145, 59, 0);
	host.getMidiOutPort (0).sendMidi (145, 60, 0);
	host.getMidiOutPort (1).sendMidi (145, 41, 0);
	host.getMidiOutPort (1).sendMidi (145, 42, 0);
	host.getMidiOutPort (1).sendMidi (145, 43, 0);
	host.getMidiOutPort (1).sendMidi (145, 44, 0);
	host.getMidiOutPort (1).sendMidi (145, 57, 0);
	host.getMidiOutPort (1).sendMidi (145, 58, 0);
	host.getMidiOutPort (1).sendMidi (145, 59, 0);
	host.getMidiOutPort (1).sendMidi (145, 60, 0);


	// turn on the led for the track that is pressed
	println ("led on is: "+ ledOn);
	this.portOut.sendMidi (145, ledOn, 60);

}