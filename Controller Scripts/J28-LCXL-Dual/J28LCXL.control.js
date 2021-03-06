loadAPI(10);
load ("J28LCXLHardware.js");
load ("TrackHandler.js");
load ("DeviceHandler.js");
load ("RemoteControlHandler.js");

host.defineController("J28", "Launch Control XL Dual", "1.0", "8b449ec7-f96e-4cb1-9384-58a93b286bea", "J28");
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


var hardware1 = null;
var hardware2 = null;
var LCXL1UserModeIndex = null;
var LCXL2UserModeIndex = null;

function test(){
	println("position changed!");
}

function observerName(){
	trackHandler.updateTrackPosition();
}

function init()
{
	application = host.createApplication();

	hardware1 = new LCXLHardware (host.getMidiOutPort (0), host.getMidiInPort (0), handleMidi1, handleSysex1);
	hardware2 = new LCXLHardware (host.getMidiOutPort (1), host.getMidiInPort (1), handleMidi2, handleSysex2);

	var cursorTrack1 = host.createCursorTrack ("LCXL_CURSOR_TRACK_01", "Cursor Track 01", 0, 0, true);
	var cursorTrack2 = host.createCursorTrack ("LCXL_CURSOR_TRACK_02", "Cursor Track 02", 0, 0, true);
	var cursorTrack3 = host.createCursorTrack ("LCXL_CURSOR_TRACK_03", "Cursor Track 03", 0, 0, true);
	var cursorTrack4 = host.createCursorTrack ("LCXL_CURSOR_TRACK_04", "Cursor Track 04", 0, 0, true);
	var cursorTrack5 = host.createCursorTrack ("LCXL_CURSOR_TRACK_05", "Cursor Track 05", 0, 0, true);
	var cursorTrack6 = host.createCursorTrack ("LCXL_CURSOR_TRACK_06", "Cursor Track 06", 0, 0, true);
	var cursorTrack7 = host.createCursorTrack ("LCXL_CURSOR_TRACK_07", "Cursor Track 07", 0, 0, true);
	var cursorTrack8 = host.createCursorTrack ("LCXL_CURSOR_TRACK_08", "Cursor Track 08", 0, 0, true);
	var cursorTrack9 = host.createCursorTrack ("LCXL_CURSOR_TRACK_09", "Cursor Track 09", 0, 0, true);
	var cursorTrack10 = host.createCursorTrack ("LCXL_CURSOR_TRACK_10", "Cursor Track 10", 0, 0, true);
	var cursorTrack11 = host.createCursorTrack ("LCXL_CURSOR_TRACK_11", "Cursor Track 11", 0, 0, true);
	var cursorTrack12 = host.createCursorTrack ("LCXL_CURSOR_TRACK_12", "Cursor Track 12", 0, 0, true);
	var cursorTrack13 = host.createCursorTrack ("LCXL_CURSOR_TRACK_13", "Cursor Track 13", 0, 0, true);
	var cursorTrack14 = host.createCursorTrack ("LCXL_CURSOR_TRACK_14", "Cursor Track 14", 0, 0, true);
	var cursorTrack15 = host.createCursorTrack ("LCXL_CURSOR_TRACK_15", "Cursor Track 15", 0, 0, true);
	var cursorTrack16 = host.createCursorTrack ("LCXL_CURSOR_TRACK_16", "Cursor Track 16", 0, 0, true);
	var cursorTrack17 = host.createCursorTrack ("LCXL_CURSOR_TRACK_17", "Cursor Track 17", 0, 0, true);

	trackHandler = new TrackHandler (host.createMainTrackBank (16, 0, 0), cursorTrack1, cursorTrack2, cursorTrack17);
	// trackHandler2 = new TrackHandler (host.createMainTrackBank (16, 0, 0), cursorTrack1, cursorTrack2);

	var cursorDevice1 = cursorTrack1.createCursorDevice ("LCXL_CURSOR_DEVICE_01", "Cursor Device 01", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice2 = cursorTrack2.createCursorDevice ("LCXL_CURSOR_DEVICE_02", "Cursor Device 02", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice3 = cursorTrack3.createCursorDevice ("LCXL_CURSOR_DEVICE_03", "Cursor Device 03", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice4 = cursorTrack4.createCursorDevice ("LCXL_CURSOR_DEVICE_04", "Cursor Device 04", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice5 = cursorTrack5.createCursorDevice ("LCXL_CURSOR_DEVICE_05", "Cursor Device 05", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice6 = cursorTrack6.createCursorDevice ("LCXL_CURSOR_DEVICE_06", "Cursor Device 06", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice7 = cursorTrack7.createCursorDevice ("LCXL_CURSOR_DEVICE_07", "Cursor Device 07", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice8 = cursorTrack8.createCursorDevice ("LCXL_CURSOR_DEVICE_08", "Cursor Device 08", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);

	var cursorDevice9 = cursorTrack9.createCursorDevice ("LCXL_CURSOR_DEVICE_09", "Cursor Device 09", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);

	var cursorDevice10 = cursorTrack10.createCursorDevice ("LCXL_CURSOR_DEVICE_10", "Cursor Device 10", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice11 = cursorTrack11.createCursorDevice ("LCXL_CURSOR_DEVICE_11", "Cursor Device 11", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice12 = cursorTrack12.createCursorDevice ("LCXL_CURSOR_DEVICE_12", "Cursor Device 12", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice13 = cursorTrack13.createCursorDevice ("LCXL_CURSOR_DEVICE_13", "Cursor Device 13", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice14 = cursorTrack14.createCursorDevice ("LCXL_CURSOR_DEVICE_14", "Cursor Device 14", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice15 = cursorTrack15.createCursorDevice ("LCXL_CURSOR_DEVICE_15", "Cursor Device 15", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice16 = cursorTrack16.createCursorDevice ("LCXL_CURSOR_DEVICE_16", "Cursor Device 16", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	var cursorDevice17 = cursorTrack17.createCursorDevice ("LCXL_CURSOR_DEVICE_17", "Cursor Device 17", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);

	deviceHandler = new DeviceHandler (cursorTrack1, cursorTrack2, cursorTrack3, cursorDevice1, cursorDevice2, cursorDevice3);

	remoteControlHandler1 = new RemoteControlHandler (cursorDevice1.createCursorRemoteControlsPage (8), 1);
	remoteControlHandler2 = new RemoteControlHandler (cursorDevice2.createCursorRemoteControlsPage (8), 2);
	remoteControlHandler3 = new RemoteControlHandler (cursorDevice3.createCursorRemoteControlsPage (8), 3);
	remoteControlHandler4 = new RemoteControlHandler (cursorDevice4.createCursorRemoteControlsPage (8), 4);
	remoteControlHandler5 = new RemoteControlHandler (cursorDevice5.createCursorRemoteControlsPage (8), 5);
	remoteControlHandler6 = new RemoteControlHandler (cursorDevice6.createCursorRemoteControlsPage (8), 6);
	remoteControlHandler7 = new RemoteControlHandler (cursorDevice7.createCursorRemoteControlsPage (8), 7);
	remoteControlHandler8 = new RemoteControlHandler (cursorDevice8.createCursorRemoteControlsPage (8), 8);

	remoteControlHandler9 = new RemoteControlHandler (cursorDevice9.createCursorRemoteControlsPage (8), 9);

	remoteControlHandler10 = new RemoteControlHandler (cursorDevice10.createCursorRemoteControlsPage (8), 10);
	remoteControlHandler11 = new RemoteControlHandler (cursorDevice11.createCursorRemoteControlsPage (8), 11);
	remoteControlHandler12 = new RemoteControlHandler (cursorDevice12.createCursorRemoteControlsPage (8), 12);
	remoteControlHandler13 = new RemoteControlHandler (cursorDevice13.createCursorRemoteControlsPage (8), 13);
	remoteControlHandler14 = new RemoteControlHandler (cursorDevice14.createCursorRemoteControlsPage (8), 14);
	remoteControlHandler15 = new RemoteControlHandler (cursorDevice15.createCursorRemoteControlsPage (8), 15);
	remoteControlHandler16 = new RemoteControlHandler (cursorDevice16.createCursorRemoteControlsPage (8), 16);
	remoteControlHandler17 = new RemoteControlHandler (cursorDevice17.createCursorRemoteControlsPage (8), 0);

	println("LCXL initialized!");

}

// is called on hardware changes and on ui changes
function flush()
{
	println ("\nFlush called.");

	// transportHandler.updateLEDs ();
	// trackHandler.updateLEDtracks ();
	// trackHandler.updateLEDdevices ();
	// host.getMidiOutPort (0).sendMidi (150, 13, 28);
	// trackHandler.updateLEDtracks ();
}

function exit()
{
	println("Exited!");
}

function handleMidi1 (status, data1, data2)
{

	if (trackHandler.handleMidi1 (status, data1, data2))
		return;

	if (deviceHandler.handleMidi1 (status, data1, data2))
		return;

 	if(LCXL1UserModeIndex == 2){
		if (remoteControlHandler17.handleMidi1 (status, data1, data2))
			return;
 	} 

	if (remoteControlHandler1.handleMidi1 (status, data1, data2))
		return;

	if (remoteControlHandler2.handleMidi1 (status, data1, data2))
		return;

	if (remoteControlHandler3.handleMidi1 (status, data1, data2))
		return;

	if (remoteControlHandler4.handleMidi1 (status, data1, data2))
		return;

	if (remoteControlHandler5.handleMidi1 (status, data1, data2))
		return;

	if (remoteControlHandler6.handleMidi1 (status, data1, data2))
		return;

	if (remoteControlHandler7.handleMidi1 (status, data1, data2))
		return;

	if (remoteControlHandler8.handleMidi1 (status, data1, data2))
		return;

	host.errorln ("Midi command not processed: " + status + " : " + data1 + " : " + data2);
}

function handleMidi2 (status, data1, data2)
{

	println("handle midi 2 lkj");

	if (trackHandler.handleMidi2 (status, data1, data2))
		return;

	if (deviceHandler.handleMidi2 (status, data1, data2))
		return;

	if (remoteControlHandler9.handleMidi2 (status, data1, data2))
		return;

	if (remoteControlHandler10.handleMidi2 (status, data1, data2))
		return;

	if (remoteControlHandler11.handleMidi2 (status, data1, data2))
		return;

	if (remoteControlHandler12.handleMidi2 (status, data1, data2))
		return;

	if (remoteControlHandler13.handleMidi2 (status, data1, data2))
		return;

	if (remoteControlHandler14.handleMidi2 (status, data1, data2))
		return;

	if (remoteControlHandler15.handleMidi2 (status, data1, data2))
		return;

	if (remoteControlHandler16.handleMidi2 (status, data1, data2))
		return;

	host.errorln ("Midi command not processed: " + status + " : " + data1 + " : " + data2);
}

function handleSysex1 (data) {

	LCXL1UserModeIndex = data.hexByteAt(7);
	// println ("\ndata is: " + data);
	println ("\nLCXL1UserModeIndex is: " + LCXL1UserModeIndex);
	trackHandler.updateLEDtracks ();

	// if (data.matchesHexPattern('F0 00 20 29 02 11 77 ?? F7'))
	// {
	// }

}

function handleSysex2 (data) {
	LCXL2UserModeIndex = data.hexByteAt(7);
	// println ("\ndata is: " + data);
	println ("\nLCXL2UserModeIndex is: " + LCXL2UserModeIndex);
	trackHandler.updateLEDtracks ();
}