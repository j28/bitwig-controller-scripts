function DeviceHandler (cursorTrack, cursorDevice)
{
	// println ("cursor device is yooo ");
	if(cursorTrack)
		this.cursorTrack = cursorTrack;

	this.cursorDevice = cursorDevice;

	this.listingInProgress = false;
	this.isNested = null;

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

	this.cursorDevice.name ().addValueObserver(cursorDeviceNameObserver);
	// this.cursorDevice.position ().addValueObserver(cursorDevicePositionObserver);
	// this.cursorDevice.isNested ().addValueObserver(cursorDeviceNestedObserver);
	this.cursorDevice.isNested ().markInterested ();
	this.cursorDevice.name ().markInterested ();
	// this.cursorDevice.channel ().markInterested ();
	this.cursorDevice.position ().markInterested ();
}

DeviceHandler.prototype.cursorDeviceNested = function (){

	println ("\ncurrentDevices isNested: " + this.isNested);	

	this.isNested = this.cursorDevice.isNested().get ();
	println ("\noisNestedObserver is nested: "+ this.isNested);	

	if (this.isNested){
		this.cursorDeviceIsRoot = false;
	} else {
		this.cursorDeviceIsRoot = true;
	}
	println ("isNestedObserver cursor device is root: " + this.cursorDeviceIsRoot);
}

DeviceHandler.prototype.updateLocalState = function (){

	host.scheduleTask(function(){

		var cursorDevicePosition = deviceHandler.cursorDevice.position ().get ();

		deviceHandler.cursorDeviceNested();

		// select root device
		if(deviceHandler.cursorDeviceIsRoot == true){
			localState[1] = cursorDevicePosition;
			localState[2] = -1;
			localState[3] = -1;
			println('after update, when root device selected: ' + localState[0]);
			println('after update, when root device selected: ' + localState[1]);
			println('after update, when root device selected: ' + localState[2]);
			println('after update, when root device selected: ' + localState[3]);
		} else if (deviceHandler.cursorDeviceIsRoot == false ){
			localState[1] = -2;
			localState[2] = -2;
			localState[3] = cursorDevicePosition;
			println('after update, when nested device selected: ' + localState[0]);
			println('after update, when nested device selected: ' + localState[1]);
			println('after update, when nested device selected: ' + localState[2]);
			println('after update, when nested device selected: ' + localState[3]);		
		}
	},50);	

}

DeviceHandler.prototype.browserSelectDevice = function (){

	this.cursorDevice.selectParent();

	host.scheduleTask(function(){
		// println ("parent device name: " + deviceHandler.cursorDevice.name (). get());
		// println ("browser state: " + browserState[1]);

		deviceHandler.cursorDevice.selectDevice(deviceBank.getDevice (browserState[1]));	
		var cursorDevicePosition = deviceHandler.cursorDevice.position ().get ();
		localState[1] = browserState[1];
		localState[2] = -1;
		localState[3] = -1;

		println('after select: ' + localState[0]);
		println('after select: ' + localState[1]);
		println('after select: ' + localState[2]);
		println('after select: ' + localState[3]);

		if(browserState[2] > -1){
			println('ACTIVE slot is: ' + browserState[2]);			

			// no reverse method so reversing manually
			deviceHandler.deviceSlotListReversed = deviceHandler.cursorDevice.slotNames ().get ();
			deviceHandler.deviceSlotList = [];
			deviceHandler.deviceSlotList[0] = deviceHandler.deviceSlotListReversed[1];
			deviceHandler.deviceSlotList[1] = deviceHandler.deviceSlotListReversed[0];

			// println ("\ndeviceSlotList");
			// println (typeof deviceHandler.deviceSlotList);
			// println (deviceHandler.deviceSlotList[0]);

			if (deviceHandler.deviceSlotList.length > 0 ) {

				for (r = 0; r < deviceHandler.deviceSlotList.length; r++)
				{
					if (r == browserState[2]){
						deviceHandler.cursorDevice.selectFirstInSlot(deviceHandler.deviceSlotList[r]);
						println ("slotName is: "+ deviceHandler.deviceSlotList[r]);				
					}

				}	 	
			}

		}

	},50);	


}


DeviceHandler.prototype.currentDevices = function (){

	var cursorDevicePosition = this.cursorDevice.position ().get ();

}