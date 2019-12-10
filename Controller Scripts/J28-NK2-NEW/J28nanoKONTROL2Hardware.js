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
const NK2_SLIDER1 = 0;
const NK2_SLIDER2 = 1;
const NK2_SLIDER3 = 2;
const NK2_SLIDER4 = 3;
const NK2_SLIDER5 = 4;
const NK2_SLIDER6 = 5;
const NK2_SLIDER7 = 6;
const NK2_SLIDER8 = 7;
const NK2_KNOB1 = 0x10;
const NK2_KNOB8 = 0x17;
const NK2_BUTTON_S1 = 32;
const NK2_BUTTON_S2 = 33;
const NK2_BUTTON_S3 = 34;
const NK2_BUTTON_S4 = 35;
const NK2_BUTTON_S5 = 36;
const NK2_BUTTON_S6 = 37;
const NK2_BUTTON_S7 = 38;
const NK2_BUTTON_S8 = 39;
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


NK2Hardware.prototype.updateLEDtrack = function (ledOn)
{
	this.portOut.sendMidi (191, 32, 0);
	this.portOut.sendMidi (191, 33, 0);
	this.portOut.sendMidi (191, 34, 0);
	this.portOut.sendMidi (191, 35, 0);
	this.portOut.sendMidi (191, 36, 0);
	this.portOut.sendMidi (191, 37, 0);
	this.portOut.sendMidi (191, 38, 0);
	this.portOut.sendMidi (191, 39, 0);

	this.portOut.sendMidi (191, ledOn, 127);
}