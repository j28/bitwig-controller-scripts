loadAPI(10);
load ("webmidiHardware.js");

host.setShouldFailOnDeprecatedUse(true);
host.defineController("Apple Inc.", "IAC Driver Bus 1", "0.1", "9f097e77-e74d-433a-a7bd-086dfd7725b9");
host.defineMidiPorts(1, 1);
// this only works with one midi in and one midi out port
// host.defineSysexIdentityReply("f0 7e ?? 06 02 42 13 01 00 00 03 00 01 00 f7");


host.addDeviceNameBasedDiscoveryPair(["IAC Driver Bus 1"], ["IAC Driver Bus 1"]);


var deviceBank = null;

var hardware = null;
var globalTransport = null;

var isSetPressed = false;
var isSet2Pressed = false;
var isPlaying = false;
var isPlayingCache = false;
var isRecording = false;
var isLooping = false;
var isEngineOn = false;
var isStopPressed = false;
var isPlayPressed = false;
var isRecPressed = false;

function init()
{
	application = host.createApplication();
	mixer = host.createMixer();

	hardware = new webmidiHardware (host.getMidiOutPort (0), host.getMidiInPort (0), handleMidi);


	println("\nIAC Driver Bus 1 init called.");
}

// is called on hardware changes and on ui changes
function flush()
{
		println ("\nIAC Driver Bus 1 flush called.");

}

function exit()
{

	println("Exited!");
}

function handleMidi (status, data1, data2)
{

	host.errorln ("Midi command not processed: " + status + " : " + data1 + " : " + data2);
}
