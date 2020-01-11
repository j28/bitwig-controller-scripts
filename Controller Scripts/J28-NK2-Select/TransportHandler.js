function TransportHandler (transport)
{
	globalTransport = transport;
	this.transport = transport;
	this.transport.isPlaying ().markInterested ();
	this.transport.isArrangerRecordEnabled ().markInterested ();
	this.transport.tempo ().markInterested();
}

TransportHandler.prototype.handleMidi = function (status, data1, data2)
{
	if (isChannelController(status))
	{
		// if one of the buttons below is released we return true
		var ourButtons = [
			NK2_BUTTON_PLAY,
			NK2_BUTTON_STOP,
			NK2_BUTTON_REC,
			NK2_BUTTON_PREV_MARKER,
			NK2_BUTTON_NEXT_MARKER
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

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

			case NK2_BUTTON_PREV_MARKER:
				application.toggleDevices ();
				return true;

			case NK2_BUTTON_NEXT_MARKER:
				application.toggleNoteEditor ();
				return true;

			default:
				return false;
		}

	}
}

TransportHandler.prototype.updateLEDs = function ()
{
	hardware.updateLED (NK2_BUTTON_PLAY, this.transport.isPlaying ().get ());
	hardware.updateLED (NK2_BUTTON_REC, this.transport.isArrangerRecordEnabled ().get ());
}

