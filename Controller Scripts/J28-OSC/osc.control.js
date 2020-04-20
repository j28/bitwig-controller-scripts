loadAPI(10);

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
host.setShouldFailOnDeprecatedUse(true);

host.defineController("J28", "OSC", "0.1", "090e6d3a-d7f0-4371-b0c4-59363cedf35d");

function init() {
	var osc = host.getOscModule();
	var sender = osc.connectToUdpServer('127.0.0.1', 7400, null);
	

	println("osc initialized!");
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
}


function flush() {
	// TODO: Flush any output to your controller here.
}

function exit() {

}