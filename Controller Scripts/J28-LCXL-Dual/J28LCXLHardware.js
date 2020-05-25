const LCXL_FADER1 = 41;
const LCXL_FADER2 = 42;
const LCXL_FADER3 = 43;
const LCXL_FADER4 = 44;
const LCXL_FADER5 = 45;
const LCXL_FADER6 = 46;
const LCXL_FADER7 = 47;
const LCXL_FADER8 = 48;

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

const LCXL_ROW3_KNOB1 = 21;
const LCXL_ROW3_KNOB2 = 22;
const LCXL_ROW3_KNOB3 = 23;
const LCXL_ROW3_KNOB4 = 24;
const LCXL_ROW3_KNOB5 = 25;
const LCXL_ROW3_KNOB6 = 26;
const LCXL_ROW3_KNOB7 = 27;
const LCXL_ROW3_KNOB8 = 28;

const LCXL_BUTTON_FOCUS1 = 89;
const LCXL_BUTTON_FOCUS2 = 90;
const LCXL_BUTTON_FOCUS3 = 91;
const LCXL_BUTTON_FOCUS4 = 92;
const LCXL_BUTTON_FOCUS5 = 93;
const LCXL_BUTTON_FOCUS6 = 94;
const LCXL_BUTTON_FOCUS7 = 95;
const LCXL_BUTTON_FOCUS8 = 96;

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
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[0][0], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[1][0], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[2][0], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[0][1], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[1][1], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[2][1], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[0][2], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[1][2], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[2][2], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[0][3], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[1][3], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[2][3], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[0][4], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[1][4], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[2][4], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[0][5], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[1][5], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[2][5], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[0][6], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[1][6], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[2][6], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[0][7], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[1][7], 0);
	host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[2][7], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[0][0], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[1][0], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[2][0], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[0][1], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[1][1], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[2][1], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[0][2], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[1][2], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[2][2], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[0][3], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[1][3], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[2][3], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[0][4], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[1][4], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[2][4], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[0][5], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[1][5], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[2][5], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[0][6], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[1][6], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[2][6], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[0][7], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[1][7], 0);
	host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[2][7], 0);

	for (i = 0; i < trackHandler.trackbank.getSizeOfBank (); i++)
	{
		var track = trackHandler.trackbank.getItemAt (i);
		g = track.isGroup ().get ();
		if (i < 8){
			if (g == true){
				host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[0][i], 15);
				host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[1][i], 15);
				host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[2][i], 15);
			} else {
				host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[0][i], 0);
				host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[1][i], 0);
				host.getMidiOutPort (0).sendMidi (150, LCXL_KNOBS[2][i], 0);
			}			
		} else {
			var trackIndex = i - 8;
			if (g == true){
				host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[0][trackIndex], 15);
				host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[1][trackIndex], 15);
				host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[2][trackIndex], 15);
			} else {
				host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[0][trackIndex], 0);
				host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[1][trackIndex], 0);
				host.getMidiOutPort (1).sendMidi (150, LCXL_KNOBS[2][trackIndex], 0);
			}						
		}
	}

	// turn off the track lights for both controllers first
	host.getMidiOutPort (0).sendMidi (182, 89, 0);
	host.getMidiOutPort (0).sendMidi (182, 90, 0);
	host.getMidiOutPort (0).sendMidi (182, 91, 0);
	host.getMidiOutPort (0).sendMidi (182, 92, 0);
	host.getMidiOutPort (0).sendMidi (182, 93, 0);
	host.getMidiOutPort (0).sendMidi (182, 94, 0);
	host.getMidiOutPort (0).sendMidi (182, 95, 0);
	host.getMidiOutPort (0).sendMidi (182, 96, 0);
	host.getMidiOutPort (1).sendMidi (182, 89, 0);
	host.getMidiOutPort (1).sendMidi (182, 90, 0);
	host.getMidiOutPort (1).sendMidi (182, 91, 0);
	host.getMidiOutPort (1).sendMidi (182, 92, 0);
	host.getMidiOutPort (1).sendMidi (182, 93, 0);
	host.getMidiOutPort (1).sendMidi (182, 94, 0);
	host.getMidiOutPort (1).sendMidi (182, 95, 0);
	host.getMidiOutPort (1).sendMidi (182, 96, 0);

	// turn on the led for the track that is pressed
	// println ("led on is: "+ ledOn);
	this.portOut.sendMidi (182, ledOn, 60);

}