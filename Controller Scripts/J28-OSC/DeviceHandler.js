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
	// this.cursorDevice.getCursorSlot ().name ().markInterested ();

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

	this.cursorDevice.position ().markInterested ();
	this.cursorDevice.position ().addValueObserver(cursorDevicePositionObserver);

}

DeviceHandler.prototype.currentDevices = function (){

	this.devicesList = [];
	cursorDeviceIndex = this.cursorDevice.position ().get ();
	this.devicesList[0] = cursorDeviceIndex;

	println("\ncurrent device index is: "+ cursorDeviceIndex);

	for (var d = 0; d < 15; d++) {
		var deviceName = deviceBank.getDevice (d).name (). get();
		if (deviceName)
		{
			this.devicesList.push (deviceBank.getDevice (d).name (). get());			
			println ("device name is: "+ deviceName);
		}
	}

	try {
		sender.sendMessage('/track/devices', this.devicesList);
	} catch (err) {
		println("error sending level: " + err);
	}

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
