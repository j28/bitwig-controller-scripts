const NK2_BUTTON_CYCLE = 0x2E;
const NK2_BUTTON_REW = 0x2B;
const NK2_BUTTON_FF = 0x2C;
const NK2_BUTTON_STOP = 0x2A;
const NK2_BUTTON_PLAY = 0x29;
const NK2_BUTTON_REC = 0x2D;
const NK2_BUTTON_PREV_TRACK = 0x3A;
const NK2_BUTTON_NEXT_TRACK = 0x3B;
const NK2_BUTTON_SET = 0x3C;
const NK2_BUTTON_PREV_MARKER = 0x3D;
const NK2_BUTTON_NEXT_MARKER = 0x3E;
const NK2_BUTTON_SLIDER1 = 0x00;
const NK2_BUTTON_SLIDER8 = 0x07;
const NK2_BUTTON_KNOB1 = 0x10;
const NK2_BUTTON_KNOB8 = 0x17;
const NK2_BUTTON_S1 = 32;
const NK2_BUTTON_S8 = 0x27;
const NK2_BUTTON_M1 = 48;
const NK2_BUTTON_M8 = 0x37;
const NK2_BUTTON_R1 = 64;
const NK2_BUTTON_R8 = 0x47;

function NK2Hardware (outputPort, inputPort, inputCallback)
{
	this.portOut = outputPort;
	this.portIn  = inputPort;
	this.ledCache = initArray (-1, 128);
	this.portIn.setMidiCallback (inputCallback);
}

NK2Hardware.prototype.updateLED = function (note, isOn)
{
	var value = isOn ? 127 : 0;
	if (this.ledCache[note] != value)
	{
		this.ledCache[note] = value;
		this.portOut.sendMidi (191, note, value);
		println ("Updated to " + this.ledCache[note]);
	}
	else
		println ("Not updated.");
}