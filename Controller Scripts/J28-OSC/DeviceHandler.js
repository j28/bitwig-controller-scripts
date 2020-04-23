function DeviceHandler (cursorTrack, cursorDevice)
{
	// println ("cursor device is yooo ");
	if(cursorTrack)
		this.cursorTrack = cursorTrack;

	this.cursorDevice = cursorDevice;

	this.listingInProgress = false;

	this.cursorDevice.isExpanded ().markInterested ();
	this.cursorDevice.isEnabled ().markInterested ();
	this.cursorDevice.isWindowOpen ().markInterested ();
	this.cursorDevice.slotNames ().markInterested ();
	this.cursorDevice.getCursorSlot ().name ().markInterested ();

	deviceBank = cursorTrack.createDeviceBank (16);
	for (var i = 0; i < deviceBank.getSizeOfBank (); i++)
	{
		deviceBank.getDevice (i).name ().markInterested ();
		deviceBank.getDevice (i).slotNames ().markInterested ();
	}

	// this.cursorDevice.name ().addValueObserver(cursorDeviceNameObserver);
	this.cursorDevice.position ().addValueObserver(cursorDevicePositionObserver);
	this.cursorDevice.isNested ().addValueObserver(cursorDeviceNestedObserver);
	this.cursorDevice.isNested ().markInterested ();
	this.cursorDevice.name ().markInterested ();
	// this.cursorDevice.position ().markInterested ();
}

DeviceHandler.prototype.currentDevices = function (){

	var cursorDeviceIndex = this.getCursorDeviceIndex();
	this.devicesList = [];


	// println("\ncurrent device index is: "+ cursorDeviceIndex);

	sender.startBundle ();

		println ("start outer bundle...");
		trackHandler.cursorTrackNameSend();
		trackHandler.cursorTrackColorSend();

		sender.startBundle ();

			println ("current device index: " + cursorDeviceIndex);
			try {
				sender.sendMessage('/track/device/index', cursorDeviceIndex);
			} catch (err) {
				println("error sending level: " + err);
			}


			for (var d = 0; d < 15; d++) {

				var deviceName = deviceBank.getDevice (d).name (). get();

				if (deviceName)
				{

					println ("\nlooping through device bank... index: " + d);
					var deviceSlotList = deviceBank.getDevice (d).slotNames ().get ();

					sender.startBundle ();

						println ("current device name: " + deviceName);
						try {
							sender.sendMessage('/track/device', deviceName);
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
										sender.sendMessage('/track/device/slots', deviceSlotList[r]);
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

	// this.devicesList.push (deviceBank.getDevice (d).name (). get());			
	// println ("device name is: "+ deviceName);
	// var slotNames = this.cursorDevice.slotNames ().get ();
	// var firstDeviceInSlot = this.cursorDevice.selectFirstInSlot(slotNames[r]);
	// println ("first in slot name is: "+ firstDeviceInSlot.name ().get ());

}

DeviceHandler.prototype.getCursorDeviceIndex = function (){

	var cursorDeviceIndex = this.cursorDevice.position ().get ();

	try {
		sender.sendMessage('/track/device/cursor', cursorDeviceIndex);
	} catch (err) {
		println("error sending level: " + err);
	}

	return cursorDeviceIndex;

}

DeviceHandler.prototype.selectSlotDevice = function (slotName){

	this.listingInProgress = true;
	this.cursorDevice.selectFirstInSlot(slotName);

	// var cursorSlottt = this.cursorDevice.getCursorSlot();
	// println ("SLOTTTT");
	// println (cursorSlottt.name (). get());

}

// DeviceHandler.prototype.cursorDeviceName = function (){


// 	for (var d = 0; d < 15; d++) {

// 		var deviceName = deviceBank.getDevice (d).name ().get ();
// 		if (deviceName) {
// 			println ("\nlooping through device bank... index: " + d);					
// 			println (deviceName);					
// 		}

// 		// if (this.cursorDevice.hasNext()){

// 		// 	this.cursorDevice.selectNext ();
// 		// }

// 	}

// }

DeviceHandler.prototype.cursorDeviceNested = function (){

	var isNested = this.cursorDevice.isNested().get ();

	if (this.listingInProgress){
		if(isNested){
			var deviceNames = [];

			sender.startBundle ();

				try {
					sender.sendMessage('/device-slot/devices', "deviceSlotDevices");
				} catch (err) {
					println("error sending level: " + err);
				}

				sender.startBundle ();
					for (var d = 0; d < 15; d++) {

						var deviceName = deviceBank.getDevice (d).name ().get ();
						if (deviceName) {

								println ("\nlooping through device bank... index: " + d);					
								println (deviceName);					
								deviceNames.push (deviceName);	

								println ("current device name: " + deviceName);
								try {
									sender.sendMessage('/track/device', deviceName);
								} catch (err) {
									println("error sending level: " + err);
								}
						}

					}
				sender.endBundle ();

			sender.endBundle ();

		}
	}

	this.listingInProgress = false;

	// println ("NAME?!");
	// println (this.cursorDevice.name().get ());

	// var isNested = this.cursorDevice.isNested().get ();
	// println ("NESTED?!");
	// println (isNested);

}

DeviceHandler.prototype.selectDevice = function (index){

	var deviceIndex = index;
	this.cursorDevice.selectDevice(deviceBank.getDevice (index));

}
