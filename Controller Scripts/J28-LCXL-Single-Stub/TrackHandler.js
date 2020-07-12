function TrackHandler (trackbank, cursorTrack)
{

	this.trackbank = trackbank;
	this.cursorTrack = cursorTrack;


	for (i = 0; i < this.trackbank.getSizeOfBank (); i++)
	{
		var track = this.trackbank.getItemAt (i);
		p = track.volume ();
		p.markInterested ();
		p.setIndication (true);
	}

	this.trackbank.followCursorTrack (this.cursorTrack);

	this.cursorTrack.position().markInterested();


}

TrackHandler.prototype.handleMidi = function (status, data1, data2)
{
	println ("data1 is: "+ data1);
	this.currentData1 = data1;

	if (isChannelController(status))
	{
		// if one of the buttons below is released we return true
		var ourButtons = [
		];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1)
		{
			case LCXL_FADER1:
				this.trackbank.getItemAt (0).volume ().set (data2, 128);
				return true;

			case LCXL_FADER2:
				this.trackbank.getItemAt (1).volume ().set (data2, 128);
				return true;

			case LCXL_FADER3:
				this.trackbank.getItemAt (2).volume ().set (data2, 128);
				return true;

			case LCXL_FADER4:
				this.trackbank.getItemAt (3).volume ().set (data2, 128);
				return true;

			case LCXL_FADER5:
				this.trackbank.getItemAt (4).volume ().set (data2, 128);
				return true;

			case LCXL_FADER6:
				this.trackbank.getItemAt (5).volume ().set (data2, 128);
				return true;

			case LCXL_FADER7:
				this.trackbank.getItemAt (6).volume ().set (data2, 128);
				return true;

			case LCXL_FADER8:
				this.trackbank.getItemAt (7).volume ().set (data2, 128);
				return true;

			default:
				return false;
		}
	}
}

TrackHandler.prototype.updateLEDtracks = function ()
{

}


TrackHandler.prototype.updateLEDdevices = function ()
{

}