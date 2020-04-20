loadAPI(10);
load ("TrackHandler.js");

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
host.setShouldFailOnDeprecatedUse(true);

host.defineController("J28", "OSC", "0.1", "090e6d3a-d7f0-4371-b0c4-59363cedf35d");

var sender = null;

function init() {



	cursorTrack = host.createCursorTrack ("OSC_CURSOR_TRACK", "Cursor Track", 0, 0, true);

	trackHandler = new TrackHandler (host.createMainTrackBank (16, 0, 0), cursorTrack);


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
			sender.sendMessage('/transport/position', v);
		} catch (err) {
			println('error sending transport position: ' + err);
		}
	});

	// send osc for track
	var masterTrack = host.createMasterTrack(1);
	masterTrack.addVuMeterObserver(256, -1, false, function(v){
		try {
			sender.sendMessage('/track/master/meter', v);
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

	// as.registerMethod('/test/',
	//   '#bundle',
	//   'can i use a bundle?',
	//   function(c, msg) {
	//     println('bundle: ' + msg);
	//   });

	oscModule.createUdpServer(7500, as);





}


function flush() {
	// TODO: Flush any output to your controller here.
}

function exit() {

}