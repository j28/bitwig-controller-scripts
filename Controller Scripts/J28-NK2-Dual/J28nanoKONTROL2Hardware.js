const NK2_BUTTON_CYCLE = 0x2E;
const NK2_BUTTON_REW = 0x2B;
const NK2_BUTTON_FF = 0x2C;
const NK2_BUTTON_STOP = 0x2A;
const NK2_BUTTON_PLAY = 0x29;
const NK2_BUTTON_REC = 0x2D;
const NK2_BUTTON_PREV_TRACK = 58;
const NK2_BUTTON_NEXT_TRACK = 59;
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

const NK2_KNOB1 = 16;
const NK2_KNOB2 = 17;
const NK2_KNOB3 = 18;
const NK2_KNOB4 = 19;
const NK2_KNOB5 = 20;
const NK2_KNOB6 = 21;
const NK2_KNOB7 = 22;
const NK2_KNOB8 = 23;

const NK2_BUTTON_S1 = 32;
const NK2_BUTTON_S2 = 33;
const NK2_BUTTON_S3 = 34;
const NK2_BUTTON_S4 = 35;
const NK2_BUTTON_S5 = 36;
const NK2_BUTTON_S6 = 37;
const NK2_BUTTON_S7 = 38;
const NK2_BUTTON_S8 = 39;

const NK2_BUTTON_M1 = 48;
const NK2_BUTTON_M2 = 49;
const NK2_BUTTON_M3 = 50;
const NK2_BUTTON_M4 = 51;
const NK2_BUTTON_M5 = 52;
const NK2_BUTTON_M6 = 53;
const NK2_BUTTON_M7 = 54;
const NK2_BUTTON_M8 = 55;

const NK2_BUTTON_R1 = 64;
const NK2_BUTTON_R2 = 65;
const NK2_BUTTON_R3 = 66;
const NK2_BUTTON_R4 = 67;
const NK2_BUTTON_R5 = 68;
const NK2_BUTTON_R6 = 69;
const NK2_BUTTON_R7 = 70;
const NK2_BUTTON_R8 = 71;

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
	// turn off all track lights first
	// this.portOut.sendMidi (191, 32, 0);
	// this.portOut.sendMidi (191, 33, 0);
	// this.portOut.sendMidi (191, 34, 0);
	// this.portOut.sendMidi (191, 35, 0);
	// this.portOut.sendMidi (191, 36, 0);
	// this.portOut.sendMidi (191, 37, 0);
	// this.portOut.sendMidi (191, 38, 0);
	// this.portOut.sendMidi (191, 39, 0);
	// turn on the led for the track that is pressed
	println ("led on is: "+ ledOn);
	this.portOut.sendMidi (191, ledOn, 127);
}

NK2Hardware.prototype.updateLEDdevices = function (deviceLength)
{
	this.portOut.sendMidi (191, 48, 0);
	this.portOut.sendMidi (191, 49, 0);
	this.portOut.sendMidi (191, 50, 0);
	this.portOut.sendMidi (191, 51, 0);
	this.portOut.sendMidi (191, 52, 0);
	this.portOut.sendMidi (191, 53, 0);
	this.portOut.sendMidi (191, 54, 0);
	this.portOut.sendMidi (191, 55, 0);
	// println ("length is: " + deviceLength);
	for (d = 0; d < deviceLength; d++)
	{
		var deviceCC = d + 48;
		// println ("deviceLength is: " + deviceLength);
		// println ("d is: " + d);
		// println ("device CC is: " + deviceCC);
		this.portOut.sendMidi (191, deviceCC, 127);
	}
}

NK2Hardware.prototype.updateLEDcontrols = function (controlsLength)
{
	this.portOut.sendMidi (191, 64, 0);
	this.portOut.sendMidi (191, 65, 0);
	this.portOut.sendMidi (191, 66, 0);
	this.portOut.sendMidi (191, 67, 0);
	this.portOut.sendMidi (191, 68, 0);
	this.portOut.sendMidi (191, 69, 0);
	this.portOut.sendMidi (191, 70, 0);
	this.portOut.sendMidi (191, 71, 0);
	// println ("length is: " + deviceLength);
	for (c = 0; c < controlsLength; c++)
	{
		var buttonCC = c + 64;
		// println ("controlsLength is: " + controlsLength);
		// println ("c is: " + c);
		// println ("button CC is: " + buttonCC);
		this.portOut.sendMidi (191, buttonCC, 127);
	}
}