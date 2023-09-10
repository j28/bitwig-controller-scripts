loadAPI(18);

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
host.setShouldFailOnDeprecatedUse(false);

host.defineController("J28", "Analog Four MKII", "0.1", "7fb90366-48eb-4d76-ac1a-cbef09a8eaa7", "jaytwoeight");

host.defineMidiPorts(1, 1);

if (host.platformIsWindows()){}
else if (host.platformIsMac())
{
	host.addDeviceNameBasedDiscoveryPair(["Elektron Analog Four MKII"], ["Elektron Analog Four MKII"]);
}
else if (host.platformIsLinux()){}

function A4Hardware (outputPort, inputPort, midiCallback, sysexCallback){
	this.portOut = outputPort;
	this.portIn  = inputPort;
	this.ledCache = initArray (-1, 128);
	this.portIn.setMidiCallback (midiCallback);
	this.portIn.setSysexCallback (sysexCallback);
}


// Called when a short MIDI message is received on MIDI input port 0.
function onMidi0(status, data1, data2) {

	// program changes messages are status 198
	// data1 is the program change value
	if (status == 198){
		println("status is: " + status);
		println("data1 is: " + data1);
		// println("data2 is: " + data2);

		trackBank.sceneBank ().scrollPosition ().set (data1);
		trackBank.sceneBank ().launchScene(0);
	
	}

}

// Called when a MIDI sysex message is received on MIDI input port 0.
function onSysex0(data) {
	// MMC Transport Controls:
	switch (data) {
		case "f07f7f0605f7":
			transport.rewind();
			break;
		case "f07f7f0604f7":
			transport.fastForward();
			break;
		case "f07f7f0601f7":
			transport.stop();
			break;
		case "f07f7f0602f7":
			transport.play();
			break;
		case "f07f7f0606f7":
			transport.record();
			break;
	}
}

function flush() {
	// TODO: Flush any output to your controller here.
}

function exit() {

}

function init() {
	// println("a4 initialized!");

	transport = host.createTransport();

	host.getMidiInPort(0).setMidiCallback(onMidi0);
	host.getMidiInPort(0).setSysexCallback(onSysex0);

	hardware = new A4Hardware (host.getMidiOutPort (0), host.getMidiInPort (0), onMidi0, onSysex0);

	trackBank = host.createTrackBank( 1,0,1, false );
	trackBank.sceneBank().setIndication(true);

}



