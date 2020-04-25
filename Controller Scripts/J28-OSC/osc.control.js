loadAPI(10);
load ("polyfill.js");
load ("TrackHandler.js");
load ("DeviceHandler.js");

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
host.setShouldFailOnDeprecatedUse(true);

host.defineController("J28", "OSC", "0.1", "090e6d3a-d7f0-4371-b0c4-59363cedf35d");

var sender = null;


function cursorDevicePositionObserver (){
	// deviceHandler.currentDevices();
}
function cursorDeviceNameObserver (){
	// the scheduling is needed because otherwise the isNested state is not updated prior to requesting it

	deviceHandler.updateLocalState();
}
function cursorDeviceNestedObserver (){
	deviceHandler.cursorDeviceNested();
}




function init() {

	localState = [];
	browserState = [];

	cursorTrack = host.createCursorTrack ("OSC_CURSOR_TRACK", "Cursor Track", 0, 0, true);
	trackHandler = new TrackHandler (host.createMainTrackBank (16, 0, 0), cursorTrack);

	var cursorDevice = cursorTrack.createCursorDevice ("OSC_CURSOR_DEVICE", "Cursor Device", 0, CursorDeviceFollowMode.FOLLOW_SELECTION);
	deviceHandler = new DeviceHandler (cursorTrack, cursorDevice);

	var osc = host.getOscModule();
	sender = osc.connectToUdpServer('127.0.0.1', 7400, null);


	// util = new Util ();

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
		',ffff',
		'Select track',
		function(c, msg){
			// println("c coming from browser is: " + c);
			browserState = msg.getArguments ();
		// println('- track method: msg args - ' + msg.getArguments ()[0]);
		// println('- track method: msg args - ' + msg.getArguments ()[1]);
		// println('- track method: msg args - ' + msg.getArguments ()[2]);
		// println('- track method: msg args - ' + msg.getArguments ()[3]);

		println('- track method: msg args - ' + localState[0]);
		println('- track method: msg args - ' + localState[1]);
		println('- track method: msg args - ' + localState[2]);
		println('- track method: msg args - ' + localState[3]);

		deviceHandler.browserSelectDevice();


			// var trackIndex = msg.getFloat(0);			
			// println("track index coming from browser is: " + trackIndex);
	});


	// as.registerMethod('/track',
	// 	',f',
	// 	'Select track',
	// 	function(c, msg){
	// 		// println("c coming from browser is: " + c);
	// 		var trackIndex = msg.getFloat(0);			
	// 		println("track index coming from browser is: " + trackIndex);
	// });

	as.registerMethod('/device',
		',f',
		'Select device',
		function(c, msg){
			// println("c coming from browser is: " + c);
			var deviceIndex = msg.getFloat(0);
			deviceHandler.selectDevice(deviceIndex);
			// println("track index coming from browser is: " + trackIndex);
	});

	as.registerMethod('/device-slot',
		',s',
		'Select device slot',
		function(c, msg){
			// println("c coming from browser is: " + c);
			var deviceSlot = msg.getString(0);
			// deviceHandler.selectDevice(deviceIndex);
			println("device slot coming from browser is: " + deviceSlot);
			deviceHandler.selectSlotDevice(deviceSlot);

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