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

	this.cursorTrack.name().addValueObserver(this.cursorTrackNameObserver);
	this.cursorTrack.color().markInterested();
	this.cursorTrack.position().markInterested();


	this.trackbank.getItemAt (0).name ().markInterested();
	this.trackbank.getItemAt (1).name ().markInterested();

}


TrackHandler.prototype.cursorTrackNameObserver = function ()
{

	var trackName = this.cursorTrack.name().get();
	var trackColor = this.cursorTrack.color().get ();

	var currentColorRed = trackColor.getRed255 ();
	var currentColorGreen = trackColor.getGreen255 ();
	var currentColorBlue = trackColor.getBlue255 ();

	var oscArgs = [];
	oscArgs[0] = trackName;
	oscArgs[1] = currentColorRed;
	oscArgs[2] = currentColorGreen;
	oscArgs[3] = currentColorBlue;

	sender.sendMessage('/track', oscArgs);
	host.showPopupNotification( trackName );





}