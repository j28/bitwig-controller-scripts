loadAPI(10);
load ("TrackHandler.js");
load ("DeviceHandler.js");

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
host.setShouldFailOnDeprecatedUse(true);

host.defineController("J28", "OSC", "0.1", "090e6d3a-d7f0-4371-b0c4-59363cedf35d");

var sender = null;
var cursorDeviceIndex = null;

function testBundle(){

		// var track1Name = trackHandler.trackbank.getItemAt (0).name ().get();
		// var track2Name = trackHandler.trackbank.getItemAt (1).name ().get();

		// sender.startBundle ();

		// println('track 1 name: ' + track1Name);
		// sender.sendMessage('/track/name', track1Name);

		// println('track 2 name: ' + track2Name);	
		// sender.sendMessage('/track/name', track2Name);

		// sender.endBundle ();

}

function cursorDevicePositionObserver (){
	deviceHandler.getCursorDeviceIndex();
}

function init() {

	cursorTrack = host.createCursorTrack ("OSC_CURSOR_TRACK", "Cursor Track", 0, 0, true);
	trackHandler = new TrackHandler (host.createMainTrackBank (16, 0, 0), cursorTrack);

	var cursorDevice = cursorTrack.createCursorDevice ("OSC_CURSOR_DEVICE", "Cursor Device", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	deviceHandler = new DeviceHandler (cursorTrack, cursorDevice);

	var osc = host.getOscModule();
	sender = osc.connectToUdpServer('127.0.0.1', 7400, null);

	// TODO: Perform further initialization here.
	println("initialized"
		+ ' - ' + host.getHostVendor()
		+ ' - ' + host.getHostProduct()
		+ ' - ' + host.getHostVersion()
	);

	var transport = host.createTransport();
	var position = transport.getPosition();
	// position is a SettableBeatTimeValue
	// file:///C:/Program%20Files/Bitwig%20Studio/resources/doc/control-surface/api/a00176.html

	// send osc for transport
	position.addValueObserver(function(v){
		try {
			// sender.sendMessage('/transport/position', v);
			// testBundle();
		} catch (err) {
			println('error sending transport position: ' + err);
		}
	});

	// send osc for track
	var masterTrack = host.createMasterTrack(1);
	masterTrack.addVuMeterObserver(256, -1, false, function(v){
		try {
			// sender.sendMessage('/track/master/meter', v);
		} catch (err) {
			println("error sending level: " + err);
		}
	});

	// Configure osc. AddressSpace is a term from the OSC spec. It means
	var oscModule = host.getOscModule();
	var as = oscModule.createAddressSpace();

	// handler (OscConnection source, OscMessage message)
	as.registerDefaultMethod(function(connection, msg) {
		println('- unregistered method: con - ' + connection);
		println('- unregistered method: msg typetag - ' + msg.getTypeTag ());
		println('- unregistered method: msg adr pat- ' + msg.getAddressPattern ());
		println('- unregistered method: msg args - ' + msg.getArguments ()[0]);

	});

	as.registerMethod('/track',
		',f',
		'Select track',
		function(c, msg){
			// println("c coming from browser is: " + c);
			var trackIndex = msg.getFloat(0);			
			println("track index coming from browser is: " + trackIndex);
	});

	as.registerMethod('/device',
		',f',
		'Select device',
		function(c, msg){
			// println("c coming from browser is: " + c);
			var deviceIndex = msg.getFloat(0);
			deviceHandler.selectDevice(deviceIndex);
			// println("track index coming from browser is: " + trackIndex);
	});

	//	as.registerMethod('/test/',
	//		'#bundle',
	//		'can i use a bundle?',
	//		function(c, msg) {
	//		println('bundle: ' + msg);
	//	});

	oscModule.createUdpServer(7500, as);

}

function flush() {
	// TODO: Flush any output to your controller here.
	// deviceHandler.currentDevices();
}

function exit() {

}