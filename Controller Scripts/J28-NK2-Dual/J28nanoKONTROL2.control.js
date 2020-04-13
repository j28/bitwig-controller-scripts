loadAPI(10);
load ("j28nanoKONTROL2Hardware.js");
load ("TransportHandler.js");
load ("TrackHandler.js");
load ("DeviceHandler.js");
load ("RemoteControlHandler.js");

host.setShouldFailOnDeprecatedUse(true);
host.defineController("Korg", "J28 nanoKONTROL 2 Dual", "0.1", "429f329d-525f-46db-a987-abbb4c5c46e0");
host.defineMidiPorts(2, 2);
// this only works with one midi in and one midi out port
// host.defineSysexIdentityReply("f0 7e ?? 06 02 42 13 01 00 00 03 00 01 00 f7");

if (host.platformIsWindows())
	host.addDeviceNameBasedDiscoveryPair(["nanoKONTROL2"], ["nanoKONTROL2"]);
else if (host.platformIsMac())
	host.addDeviceNameBasedDiscoveryPair(
		["nanoKONTROL2 SLIDERS/KNOBS 1", "nanoKONTROL2 CTRL 1"],
		["nanoKONTROL2 SLIDERS/KNOBS 2", "nanoKONTROL2 CTRL 2"]
	);


else if (host.platformIsLinux())
	host.addDeviceNameBasedDiscoveryPair(["nanoKONTROL2 MIDI 1"], ["nanoKONTROL2 MIDI 1"]);

var SYSEX_HEADER = "F0 42 40 00 01 13 00";

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

	hardware1 = new NK2Hardware (host.getMidiOutPort (0), host.getMidiInPort (0), handleMidi1);
	hardware2 = new NK2Hardware (host.getMidiOutPort (1), host.getMidiInPort (1), handleMidi2);
	transportHandler = new TransportHandler (host.createTransport ());

	var cursorTrack = host.createCursorTrack ("NK2_CURSOR_TRACK", "Cursor Track", 0, 0, true);
	var cursorTrack2 = host.createCursorTrack ("NK2_CURSOR_TRACK_2", "Cursor Track 2", 0, 0, true);

	trackHandler = new TrackHandler (host.createMainTrackBank (16, 0, 0), cursorTrack, cursorTrack2);
	trackHandler2 = new TrackHandler (host.createMainTrackBank (16, 0, 0), cursorTrack, cursorTrack2);

	var cursorDevice = cursorTrack.createCursorDevice ("NK2_CURSOR_DEVICE", "Cursor Device", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice2 = cursorTrack2.createCursorDevice ("NK2_CURSOR_DEVICE_2", "Cursor Device 2", 0, CursorDeviceFollowMode.FIRST_DEVICE);

	deviceHandler = new DeviceHandler (cursorTrack, cursorTrack2, cursorDevice, cursorDevice2);
	deviceHandler2 = new DeviceHandler (cursorTrack, cursorTrack2, cursorDevice, cursorDevice2);

	remoteControlHandler2 = new RemoteControlHandler (cursorDevice2.createCursorRemoteControlsPage (8));
	remoteControlHandler = new RemoteControlHandler (cursorDevice.createCursorRemoteControlsPage (8));


	// the bitwig helper function only sends to port 0 :(
	// sendSysex(SYSEX_HEADER + "00 00 01 F7"); // Enter native mode
	host.getMidiOutPort(0).sendSysex(SYSEX_HEADER + "00 00 01 F7");
	host.getMidiOutPort(1).sendSysex(SYSEX_HEADER + "00 00 01 F7");

	println("nanoKONTROL2 initialized!");
}

// is called on hardware changes and on ui changes
function flush()
{
	//	println ("\nFlush called.");

	transportHandler.updateLEDs ();
	trackHandler.updateLEDtracks ();
	deviceHandler.updateLEDdevices ();
	remoteControlHandler.updateLEDcontrols ();
}

function exit()
{
	sendSysex(SYSEX_HEADER + "00 00 00 F7"); // Leave native mode
	println("Exited!");
}

function handleMidi1 (status, data1, data2)
{

	if(data1 == 0x3C){
		if (data2 > 0) {
			isSetPressed = true;
		} else {
			isSetPressed = false;
		}
	}
	println ("\nis setPressed: " + isSetPressed);		

	if (transportHandler.handleMidi1 (status, data1, data2))
		return;

	if (trackHandler.handleMidi1 (status, data1, data2))
		return;

	if (deviceHandler.handleMidi1 (status, data1, data2))
		return;

	if (remoteControlHandler.handleMidi1 (status, data1, data2))
		return;

	host.errorln ("Midi command not processed: " + status + " : " + data1 + " : " + data2);
}


function handleMidi2 (status, data1, data2)
{

	if(data1 == 0x3C){
		if (data2 > 0) {
			isSet2Pressed = true;
		} else {
			isSet2Pressed = false;
		}
	}
	println ("is set2Pressed: " + isSet2Pressed);		

	if (transportHandler.handleMidi2 (status, data1, data2))
		return;

	if (trackHandler.handleMidi2 (status, data1, data2))
		return;

	if (deviceHandler.handleMidi2 (status, data1, data2))
		return;

	if (remoteControlHandler2.handleMidi2 (status, data1, data2))
		return;

	// host.errorln ("Midi command not processed: " + status + " : " + data1 + " : " + data2);
}


