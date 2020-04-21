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
	this.cursorTrack.color().addValueObserver(this.cursorTrackColorObserver);
	// this.cursorTrack.color().markInterested();
	// this.cursorTrack.position().markInterested();

	// this.cursorTrack.getDevice (0).name ().get().markInterested();

	this.cursorTrack.position().addValueObserver(this.cursorTrackPositionObserver);

}

TrackHandler.prototype.cursorTrackNameObserver = function ()
{

	var trackName = this.cursorTrack.name().get();
	// println("track name is: " + trackName);

	var oscArgs = [];
	oscArgs[0] = trackName;

	try {
		sender.sendMessage('/track/name', oscArgs);
	} catch (err) {
		println("error sending level: " + err);
	}

	// stuff like this does not work... because one has to go through the device bank to access the devices inside a track :(
	// var cursorTrackDevice1 = cursorTrack.getDevice (0).name ().get();
	// println("inside track name observer cursor track device 1: " + cursorTrackDevice1);

	deviceHandler.currentDevices();

	host.showPopupNotification( trackName );

}

TrackHandler.prototype.cursorTrackColorObserver = function ()
{

	var trackColor = this.cursorTrack.color().get ();
	// println("track color is: " + trackColor);

	var currentColorRed = trackColor.getRed255 ();
	var currentColorGreen = trackColor.getGreen255 ();
	var currentColorBlue = trackColor.getBlue255 ();

	var oscArgs = [];
	oscArgs[0] = currentColorRed;
	oscArgs[1] = currentColorGreen;
	oscArgs[2] = currentColorBlue;

	try {
		sender.sendMessage('/track/color', oscArgs);
	} catch (err) {
		println("error sending level: " + err);
	}

}

TrackHandler.prototype.cursorTrackPositionObserver = function (){
	deviceHandler.currentDevices();
	// this.cursorTrack.getDevice (0).name ().get();
}