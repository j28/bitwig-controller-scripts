loadAPI(10);
load ("j28LCXLHardware.js");
// load ("TransportHandler.js");
load ("TrackHandler.js");
// load ("RemoteControlHandler.js");

host.defineController("Novation", "J28 Launch Control XL Dual", "1.0", "8b449ec7-f96e-4cb1-9384-58a93b286bea", "J28");
host.defineMidiPorts(2, 2);


if (host.platformIsWindows())
	host.addDeviceNameBasedDiscoveryPair(["Launch Control XL"], ["Launch Control XL"]);
else if (host.platformIsMac())
	host.addDeviceNameBasedDiscoveryPair(
		["Launch Control XL 1", "Launch Control XL 1"],
		["Launch Control XL 2", "Launch Control XL 2"]
	);
else if (host.platformIsLinux())
	host.addDeviceNameBasedDiscoveryPair(["Launch Control XL"], ["Launch Control XL"]);

host.defineSysexIdentityReply('F0 7E 00 06 02 00 20 29 61 00 00 00 00 00 03 06 F7');

var deviceBank = null;

var hardware = null;

function init()
{
	application = host.createApplication();

	hardware1 = new LCXLHardware (host.getMidiOutPort (0), host.getMidiInPort (0), handleMidi1);
	hardware2 = new LCXLHardware (host.getMidiOutPort (1), host.getMidiInPort (1), handleMidi2);

	var cursorTrack1 = host.createCursorTrack ("NK2_CURSOR_TRACK_01", "Cursor Track 01", 0, 0, true);
	var cursorTrack2 = host.createCursorTrack ("NK2_CURSOR_TRACK_02", "Cursor Track 02", 0, 0, true);

	trackHandler = new TrackHandler (host.createMainTrackBank (16, 0, 0), cursorTrack1, cursorTrack2);
	// trackHandler2 = new TrackHandler (host.createMainTrackBank (16, 0, 0), cursorTrack1, cursorTrack2);

	println("LCXL initialized!");
}

// is called on hardware changes and on ui changes
function flush()
{
	println ("\nFlush called.");
	// transportHandler.updateLEDs ();
	// trackHandler.updateLEDtracks ();
	// trackHandler.updateLEDdevices ();
	// remoteControlHandler.updateLEDs ();
}

function exit()
{
	println("Exited!");
}

function handleMidi1 (status, data1, data2)
{

	if (trackHandler.handleMidi1 (status, data1, data2))
		return;

	// if (remoteControlHandler.handleMidi (status, data1, data2))
	// 	return;

	host.errorln ("Midi command not processed: " + status + " : " + data1 + " : " + data2);
}

function handleMidi2 (status, data1, data2)
{

	println("handle midi 2 lkj");

	if (trackHandler.handleMidi2 (status, data1, data2))
		return;

	// if (remoteControlHandler.handleMidi (status, data1, data2))
	// 	return;

	host.errorln ("Midi command not processed: " + status + " : " + data1 + " : " + data2);
}