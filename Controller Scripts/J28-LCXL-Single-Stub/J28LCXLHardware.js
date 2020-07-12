var FaderMap = {'77':0, '78':1, '79':2, '80':3, '81':4, '82':5, '83':6, '84':7};

const LCXL_FADER1 = 77;
const LCXL_FADER2 = 78;
const LCXL_FADER3 = 79;
const LCXL_FADER4 = 80;
const LCXL_FADER5 = 81;
const LCXL_FADER6 = 82;
const LCXL_FADER7 = 83;
const LCXL_FADER8 = 84;

function LCXLHardware (outputPort, inputPort, inputCallback)
{
	this.portOut = outputPort;
	this.portIn  = inputPort;
	this.ledCache = initArray (-1, 128);
	this.portIn.setMidiCallback (inputCallback);
}