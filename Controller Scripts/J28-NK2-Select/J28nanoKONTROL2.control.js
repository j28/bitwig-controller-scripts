loadAPI(9);
load ("j28nanoKONTROL2Hardware.js");
load ("TransportHandler.js");
load ("TrackHandler.js");
load ("RemoteControlHandler.js");

host.setShouldFailOnDeprecatedUse(true);
host.defineController("Korg", "J28 nanoKONTROL 2 Select", "0.1", "80793a77-7ce6-4cbe-bc35-233762466a62");
host.defineMidiPorts(1, 1);
host.defineSysexIdentityReply("f0 7e ?? 06 02 42 13 01 00 00 03 00 01 00 f7");

if (host.platformIsWindows())
	host.addDeviceNameBasedDiscoveryPair(["nanoKONTROL2"], ["nanoKONTROL2"]);
else if (host.platformIsMac())
	host.addDeviceNameBasedDiscoveryPair(["nanoKONTROL2 SLIDERS/KNOBS"], ["nanoKONTROL2 CTRL"]);
else if (host.platformIsLinux())
	host.addDeviceNameBasedDiscoveryPair(["nanoKONTROL2 MIDI 1"], ["nanoKONTROL2 MIDI 1"]);

var SYSEX_HEADER = "F0 42 40 00 01 13 00";

var deviceBank = null;

var hardware = null;
var globalTransport = null;

var isSetPressed = false;
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

	hardware = new NK2Hardware (host.getMidiOutPort (0), host.getMidiInPort (0), handleMidi);
	transportHandler = new TransportHandler (host.createTransport ());

	var cursorTrack = host.createCursorTrack ("NK2_CURSOR_TRACK", "Cursor Track", 0, 0, true);
	trackHandler = new TrackHandler (host.createMainTrackBank (8, 0, 0), cursorTrack);

	var cursorDevice = cursorTrack.createCursorDevice ("NK2_CURSOR_DEVICE", "Cursor Device", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	remoteControlHandler = new RemoteControlHandler (cursorDevice, cursorDevice.createCursorRemoteControlsPage (8));

	sendSysex(SYSEX_HEADER + "00 00 01 F7"); // Enter native mode
	println("nanoKONTROL2 initialized!");
}

// is called on hardware changes and on ui changes
function flush()
{
	println ("\nFlush called.");
	transportHandler.updateLEDs ();
	trackHandler.updateLEDtracks ();
	trackHandler.updateLEDdevices ();
	remoteControlHandler.updateLEDs ();
}

function exit()
{
	sendSysex(SYSEX_HEADER + "00 00 00 F7"); // Leave native mode
	println("Exited!");
}

function handleMidi (status, data1, data2)
{

	if(data1 == 0x3C){
		if (data2 > 0) {
			isSetPressed = true;
		} else {
			isSetPressed = false;
		}
	}
	println ("is setPressed: " + isSetPressed);		

	if (transportHandler.handleMidi (status, data1, data2))
		return;

	if (trackHandler.handleMidi (status, data1, data2))
		return;

	if (remoteControlHandler.handleMidi (status, data1, data2))
		return;

	host.errorln ("Midi command not processed: " + status + " : " + data1 + " : " + data2);
}
