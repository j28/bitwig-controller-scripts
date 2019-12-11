function TransportHandler (transport)
{
	this.transport = transport;

	this.transport.isPlaying ().markInterested ();
	this.transport.isArrangerRecordEnabled ().markInterested ();
}

TransportHandler.prototype.handleMidi = function (status, data1, data2)
{
	// println (status + " " + data1 + " " + data2);

	// check if it should be processed by the cases below
	if (data1 == 191)
		return false;

	if (data2 == 0)
		return true;

	switch (data1)
	{
		case NK2_BUTTON_PLAY:
			if (isEngineOn)
			{
				if (!isStopPressed && !isRecPressed) isPlaying ? this.transport.restart() : this.transport.play();
			}
			else this.transport.restart();
			return true;

		case NK2_BUTTON_STOP:
			if (!isPlayPressed && !isRecPressed) this.transport.stop();
			return true;

		// banana replace
		case NK2_BUTTON_REC:
			if (!isPlayPressed && !isStopPressed) this.transport.record();
			return true;

		case NK2_BUTTON_CYCLE:
			switchPage();
			return true;

		case NK2_BUTTON_REW:
			this.transport.rewind();
			return true;

		// banana replace
		case NK2_BUTTON_FF:
			this.transport.fastForward();
			return true;

		default:
			return false;
	}
}

TransportHandler.prototype.updateLEDs = function ()
{
	hardware.updateLED (NK2_BUTTON_PLAY, this.transport.isPlaying ().get ());
	hardware.updateLED (NK2_BUTTON_REC, this.transport.isArrangerRecordEnabled ().get ());
}

