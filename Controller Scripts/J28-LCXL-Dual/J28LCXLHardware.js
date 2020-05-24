var FaderMap = {'77':0, '78':1, '79':2, '80':3, '81':4, '82':5, '83':6, '84':7};


const LCXL_FADER1 = 41;
const LCXL_FADER2 = 42;
const LCXL_FADER3 = 43;
const LCXL_FADER4 = 44;
const LCXL_FADER5 = 45;
const LCXL_FADER6 = 46;
const LCXL_FADER7 = 47;
const LCXL_FADER8 = 48;

const NK2_KNOB1 = 16;
const NK2_KNOB2 = 17;
const NK2_KNOB3 = 18;
const NK2_KNOB4 = 19;
const NK2_KNOB5 = 20;
const NK2_KNOB6 = 21;
const NK2_KNOB7 = 22;
const NK2_KNOB8 = 23;

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