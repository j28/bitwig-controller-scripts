function TrackHandler (trackbank1, cursorTrack1, cursorTrack2, cursorTrack3)
{

	this.trackbank1 = trackbank1;

	this.cursorTrack1 = cursorTrack1;
	this.cursorTrack2 = cursorTrack2;
	this.cursorTrack3 = cursorTrack3;

	this.trackbank1.followCursorTrack (this.cursorTrack1);

	this.cursorTrack1.isPinned ().markInterested ();
	this.cursorTrack2.isPinned ().markInterested ();
	this.cursorTrack3.isPinned ().markInterested ();

}

TrackHandler.prototype.handleMidi1 = function (status, data1, data2)
{
	println ("inside track handler");
	println ("data1 is: "+ data1);
	this.currentData1 = data1;
	this.currentData2 = data2;
	this.midiChan = MIDIChannel(status);
	println ("midichannel is: "+ this.midiChan);

	var localCursorTrack1 = this.cursorTrack.isPinned ().get ();
	println ("cursor track1 is pinned: "+ localCursorTrack1);


	if (isChannelController(status))
	{
		// if one of the buttons below is released we return true
		var ourButtons = [];
		if(ourButtons.indexOf(data1) > -1) {
			if (data2 == 0)
				return true;
		}

		switch (data1)
		{

			default:
				return false;

		}

	}
	return false;
}