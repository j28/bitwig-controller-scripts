WebMidi.enable(function (err) {

	if (err) {
		console.log("WebMidi could not be enabled.", err);
	} else {

		var output = WebMidi.getOutputByName("IAC Driver Bus 1");
		// output.playNote("Gb4", 3);
		output.sendControlChange ( 0, 127, 3);

		// console.log(WebMidi.inputs);
		// console.log(WebMidi.outputs);
	}

});