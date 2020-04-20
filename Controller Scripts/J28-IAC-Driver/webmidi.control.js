loadAPI(10);
load ("webmidiHardware.js");
load ("trackHandler.js");

host.setShouldFailOnDeprecatedUse(true);
host.defineController("Apple Inc.", "IAC Driver Bus 1", "0.1", "9f097e77-e74d-433a-a7bd-086dfd7725b9");
host.defineMidiPorts(1, 1);
// this only works with one midi in and one midi out port
// host.defineSysexIdentityReply("f0 7e ?? 06 02 42 13 01 00 00 03 00 01 00 f7");


host.addDeviceNameBasedDiscoveryPair(["IAC Driver Bus 1"], ["IAC Driver Bus 1"]);


var deviceBank = null;
var cursorTrack = null;

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


function encodeToMIDI (val){
	var localVal = val;
	var twoValues = [];
	if (localVal > 127){
		twoValues[0] = 127;
		twoValues[1] = localVal - 128;
	} else {
		twoValues[0] = localVal;
		twoValues[1] = 0;
	}
	return twoValues;
}

function cursorTrackNameObserver (){
	// host.showPopupNotification( this.cursorTrack.name().get() );



	println("\ncHanGed.");
}

function cursorTrackColorObserver (){
	var currentColor = this.cursorTrack.color().get();

	var currentColorRed = currentColor.getRed255 ();
	var currentColorGreen = currentColor.getGreen255 ();
	var currentColorBlue = currentColor.getBlue255 ();

	var redArray = encodeToMIDI(currentColorRed);
	var red1 = redArray[0];
	var red2 = redArray[1];

	var greenArray = encodeToMIDI(currentColorGreen);
	var green1 = greenArray[0];
	var green2 = greenArray[1];

	var blueArray = encodeToMIDI(currentColorBlue);
	var blue1 = blueArray[0];
	var blue2 = blueArray[1];



	// host.showPopupNotification(red1);
	hardware.portOut.sendMidi (CC_CH_01, 0, red1);
	hardware.portOut.sendMidi (CC_CH_01, 1, red2);
	hardware.portOut.sendMidi (CC_CH_01, 2, green1);
	hardware.portOut.sendMidi (CC_CH_01, 3, green2);
	hardware.portOut.sendMidi (CC_CH_01, 4, blue1);
	hardware.portOut.sendMidi (CC_CH_01, 5, blue2);

	println("\nred1 is: " + red1);
	println("red2 is: " + red2);
	println("green1 is: " + green1);
	println("green2 is: " + green2);
	println("blue1 is: " + blue1);
	println("blue2 is: " + blue2);

}

function init()
{
	application = host.createApplication();
	mixer = host.createMixer();

	hardware = new webmidiHardware (host.getMidiOutPort (0), host.getMidiInPort (0), handleMidi);


	cursorTrack = host.createCursorTrack ("WM_CURSOR_TRACK", "Cursor Track", 0, 0, true);

	trackHandler = new TrackHandler (host.createMainTrackBank (16, 0, 0), cursorTrack);


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
