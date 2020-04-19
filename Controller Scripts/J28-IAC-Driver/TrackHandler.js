function TrackHandler (trackbank, cursorTrack)
{

	this.trackbank = trackbank;
	this.cursorTrack = cursorTrack;

	this.devicesAmount = [];

	for (i = 0; i < this.trackbank.getSizeOfBank (); i++)
	{
		var track = this.trackbank.getItemAt (i);
		p = track.volume ();
		p.markInterested ();
		p.setIndication (true);
	}

	this.trackbank.followCursorTrack (this.cursorTrack);

	// only monitors solo and mute for cursortrack...
	this.cursorTrack.solo ().markInterested ();
	this.cursorTrack.mute ().markInterested ();

	this.cursorTrack.name().addValueObserver(cursorTrackNameObserver);

	this.cursorTrack.color().addValueObserver(cursorTrackColorObserver);

	this.cursorTrack.position().markInterested();
	this.cursorTrack.trackType().markInterested();

	this.cursorTrack.isPinned ().markInterested ();




}


// TrackHandler.prototype.cursorTrackNameObserver = function ()
// {
// host.showPopupNotification( this.cursorTrack.name().get() );

// }