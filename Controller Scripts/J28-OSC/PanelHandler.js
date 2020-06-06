function PanelHandler (){

	mixer.isMeterSectionVisible().markInterested();
	mixer.isIoSectionVisible().markInterested();

};

PanelHandler.prototype.togglePanelInspector = function (){

	application.toggleInspector	();

};

PanelHandler.prototype.togglePanelDevices = function (){

	application.toggleDevices ();

};

PanelHandler.prototype.togglePanelNotes = function (){

	// mixer.isDeviceSectionVisible();
	application.toggleNoteEditor ()

};

PanelHandler.prototype.togglePanelMeter = function (){

	mixer.isMeterSectionVisible().toggle();

	var onOff = mixer.isMeterSectionVisible().get();
	println("mixer.isMeterSectionVisible().get(): " + onOff);
	var oscArgs = [];
	oscArgs[0] = onOff;

	try {
		sender.sendMessage('/panel/meter', oscArgs);
	} catch (err) {
		println("error sending level: " + err);
	};

};

PanelHandler.prototype.togglePanelIo = function (){

	mixer.isIoSectionVisible().toggle();

	var onOff = mixer.isIoSectionVisible().get();
	println("mixer.isIoSectionVisible().get(): " + onOff);
	var oscArgs = [];
	oscArgs[0] = onOff;

	try {
		sender.sendMessage('/panel/io', oscArgs);
	} catch (err) {
		println("error sending level: " + err);
	}

};