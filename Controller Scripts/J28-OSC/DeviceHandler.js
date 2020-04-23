function DeviceHandler (cursorTrack, cursorDevice)
{
	// println ("cursor device is yooo ");
	if(cursorTrack)
		this.cursorTrack = cursorTrack;

	this.cursorDevice = cursorDevice;

	this.cursorDevice.isExpanded ().markInterested ();
	this.cursorDevice.isEnabled ().markInterested ();
	this.cursorDevice.isWindowOpen ().markInterested ();
	this.cursorDevice.slotNames ().markInterested ();
	this.cursorDevice.getCursorSlot ().name ().markInterested ();

	deviceBank = cursorTrack.createDeviceBank (16);

	deviceBank.getDevice (0).name ().markInterested ();
	deviceBank.getDevice (1).name ().markInterested ();
	deviceBank.getDevice (2).name ().markInterested ();
	deviceBank.getDevice (3).name ().markInterested ();
	deviceBank.getDevice (4).name ().markInterested ();
	deviceBank.getDevice (5).name ().markInterested ();
	deviceBank.getDevice (6).name ().markInterested ();
	deviceBank.getDevice (7).name ().markInterested ();
	deviceBank.getDevice (8).name ().markInterested ();
	deviceBank.getDevice (9).name ().markInterested ();
	deviceBank.getDevice (10).name ().markInterested ();
	deviceBank.getDevice (11).name ().markInterested ();
	deviceBank.getDevice (12).name ().markInterested ();
	deviceBank.getDevice (13).name ().markInterested ();
	deviceBank.getDevice (14).name ().markInterested ();
	deviceBank.getDevice (15).name ().markInterested ();


	deviceBank.getDevice (0).slotNames ().markInterested ();
	deviceBank.getDevice (1).slotNames ().markInterested ();
	deviceBank.getDevice (2).slotNames ().markInterested ();
	deviceBank.getDevice (3).slotNames ().markInterested ();
	deviceBank.getDevice (4).slotNames ().markInterested ();
	deviceBank.getDevice (5).slotNames ().markInterested ();
	deviceBank.getDevice (6).slotNames ().markInterested ();
	deviceBank.getDevice (7).slotNames ().markInterested ();
	deviceBank.getDevice (8).slotNames ().markInterested ();
	deviceBank.getDevice (9).slotNames ().markInterested ();
	deviceBank.getDevice (10).slotNames ().markInterested ();
	deviceBank.getDevice (11).slotNames ().markInterested ();
	deviceBank.getDevice (12).slotNames ().markInterested ();
	deviceBank.getDevice (13).slotNames ().markInterested ();
	deviceBank.getDevice (14).slotNames ().markInterested ();
	deviceBank.getDevice (15).slotNames ().markInterested ();

	this.cursorDevice.position ().markInterested ();
	this.cursorDevice.position ().addValueObserver(cursorDevicePositionObserver);

}




DeviceHandler.prototype.currentDevices = function (){

	this.devicesList = [];
	cursorDeviceIndex = this.cursorDevice.position ().get ();
	this.devicesList[0] = cursorDeviceIndex;

	println("\ncurrent device index is: "+ cursorDeviceIndex);


	function sendDeviceSlotBundle(slotNames) {



	}

	sender.startBundle ();

	println ("start outer bundle...");

	try {
		sender.sendMessage('/track/device/list', "replace with track name");
	} catch (err) {
		println("error sending level: " + err);
	}
	sender.startBundle ();

	for (var d = 0; d < 15; d++) {

		println ("\nlooping through device bank... index: " + d);


		var deviceName = deviceBank.getDevice (d).name (). get();
		var deviceSlotList = deviceBank.getDevice (d).slotNames ().get ();
		if (deviceName)
		{

	sender.startBundle ();

			println ("current device name: " + deviceName);
			try {
				sender.sendMessage('/track/device/detail', deviceName);
			} catch (err) {
				println("error sending level: " + err);
			}

			if (deviceSlotList.length > 0 ) {

				println ("device slot List exists....");
	sender.startBundle ();

				println ("\nstart inner bundle...");
				for (r = 0; r < deviceSlotList.length; r++)
				{

					println ("slotName is: "+ deviceSlotList[r]);

					try {
						sender.sendMessage('/track/devices/slots', deviceSlotList[r]);
					} catch (err) {
						println("error sending level: " + err);
					}


				}	 	
		sender.endBundle ();
				println ("inner bundle ended...");

			 }

		sender.endBundle ();

		}

	}
sender.endBundle ();
	println ("outer bundle ended...");


	sender.endBundle ();









	// try {
	// 	sender.sendMessage('/track/devices', this.devicesList);
	// } catch (err) {
	// 	println("error sending level: " + err);
	// }


			// this.devicesList.push (deviceBank.getDevice (d).name (). get());			

			// println ("device name is: "+ deviceName);


	// var slotNames = this.cursorDevice.slotNames ().get ();


					// var firstDeviceInSlot = this.cursorDevice.selectFirstInSlot(slotNames[r]);

					// println ("first in slot name is: "+ firstDeviceInSlot.name ().get ());


}

DeviceHandler.prototype.getCursorDeviceIndex = function (){
	cursorDeviceIndex = this.cursorDevice.position ().get ();
	println("\ncurrent device index is: "+ cursorDeviceIndex);
	deviceHandler.currentDevices();
}

DeviceHandler.prototype.selectDevice = function (index){

	var deviceIndex = index;
	this.cursorDevice.selectDevice(deviceBank.getDevice (index));

}
