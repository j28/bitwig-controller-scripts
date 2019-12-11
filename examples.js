// --- Examplefor using value observers
transport.isPlaying ().addValueObserver (function (value)
{
	println (value ? "Playing..." : "Stopped.");
});


// calculate 
DeviceView.prototype.calcDeviceBanks = function ()
{
	var pages = [];
	var cd = this.model.getDevice ();
	for (var i = 0; i < 16; i++)
		pages.push (cd.getSiblingDeviceName (i));
	return { pages: pages, page: cd.getPositionInBank (), offset: 0 };
};
