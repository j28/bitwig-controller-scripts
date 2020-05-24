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

function LCXLHardware (outputPort, inputPort, inputCallback)
{
	this.portOut = outputPort;
	this.portIn  = inputPort;
	this.ledCache = initArray (-1, 128);
	this.portIn.setMidiCallback (inputCallback);
}