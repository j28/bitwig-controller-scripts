function TrackHandler (trackbank, cursorTrack)
{

	this.trackbank = trackbank;
	this.cursorTrack = cursorTrack;

	this.trackbank.followCursorTrack (this.cursorTrack);

	// only monitors solo and mute for cursortrack...
	this.cursorTrack.solo ().markInterested ();
	this.cursorTrack.mute ().markInterested ();

	this.cursorTrack.position().markInterested();
	this.cursorTrack.trackType().markInterested();

	this.cursorTrack.isPinned ().markInterested ();

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