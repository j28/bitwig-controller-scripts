function RemoteControlHandler (cursorDevice, remoteControlsBank)
{
	println ("cursor device is yooo ");

	this.cursorDevice = cursorDevice;
	this.remoteControlsBank = remoteControlsBank;

	var i;
	for (i = 0; i < this.remoteControlsBank.getParameterCount (); i++)
		this.remoteControlsBank.getParameter (i).markInterested ();

	this.cursorDevice.position ().markInterested ();

	this.cursorDevice.isEnabled ().markInterested ();
	this.cursorDevice.isWindowOpen ().markInterested ();

}

// RemoteControlHandler.prototype.getName = function ()
// {
// 	return "Device Mode";
// }

RemoteControlHandler.prototype.setIndication = function (enable)
{
	var i;
	for (i = 0; i < this.remoteControlsBank.getParameterCount (); i++)
		this.remoteControlsBank.getParameter (i).setIndication (enable);
}

RemoteControlHandler.prototype.handleMidi = function (status, data1, data2)
{
	// if (isChannelController(status))
	// {

		switch (data1)
		{

			case NK2_BUTTON_M1:
				this.cursorDevice.selectDevice(deviceBank.getDevice (0));
				return true;

			case NK2_BUTTON_M2:
				this.cursorDevice.selectDevice(deviceBank.getDevice (1));
				return true;

			case NK2_BUTTON_M3:
				this.cursorDevice.selectDevice(deviceBank.getDevice (2));
				return true;

			case NK2_BUTTON_M4:
				this.cursorDevice.selectDevice(deviceBank.getDevice (3));
				return true;

			case NK2_BUTTON_M5:
				this.cursorDevice.selectDevice(deviceBank.getDevice (4));
				return true;

			case NK2_BUTTON_M6:
				this.cursorDevice.selectDevice(deviceBank.getDevice (5));
				return true;

			case NK2_BUTTON_M7:
				this.cursorDevice.selectDevice(deviceBank.getDevice (6));
				return true;

			case NK2_BUTTON_M8:
				this.cursorDevice.selectDevice(deviceBank.getDevice (7));
				return true;

			case NK2_BUTTON_R1:
				this.remoteControlsBank.selectFirst ();
				return true;

			case NK2_BUTTON_R2:
				this.remoteControlsBank.selectNext ();
				return true;

			case NK2_KNOB1:
				this.remoteControlsBank.getParameter (0).set (data2, 128);
				return true;

			case NK2_KNOB2:
				this.remoteControlsBank.getParameter (1).set (data2, 128);
				return true;

			case NK2_KNOB3:
				this.remoteControlsBank.getParameter (2).set (data2, 128);
				return true;

			case NK2_KNOB4:
				this.remoteControlsBank.getParameter (3).set (data2, 128);
				return true;

			case NK2_KNOB5:
				this.remoteControlsBank.getParameter (4).set (data2, 128);
				return true;

			case NK2_KNOB6:
				this.remoteControlsBank.getParameter (5).set (data2, 128);
				return true;

			case NK2_KNOB7:
				this.remoteControlsBank.getParameter (6).set (data2, 128);
				return true;

			case NK2_KNOB8:
				this.remoteControlsBank.getParameter (7).set (data2, 128);
				return true;

			case NK2_BUTTON_PREV_TRACK:
				this.cursorDevice.isWindowOpen ().toggle ();
				return true;

			case NK2_BUTTON_NEXT_TRACK:
				this.cursorDevice.isEnabled ().toggle ();
				return true;

			default:
				return false;
		}
	// }

	return false;    
}