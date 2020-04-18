function webmidiHardware (outputPort, inputPort, inputCallback)
{
	this.portOut = outputPort;
	this.portIn  = inputPort;
	this.ledCache = initArray (-1, 128);
	this.portIn.setMidiCallback (inputCallback);
}