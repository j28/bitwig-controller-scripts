loadAPI(9);
host.setShouldFailOnDeprecatedUse(true);
host.defineController("Korg", "J28 nanoKONTROL 2 New", "0.1", "80793a77-7ce6-4cbe-bc35-233762466a62");
host.defineMidiPorts(1, 1);
host.defineSysexIdentityReply("f0 7e ?? 06 02 42 13 01 00 00 03 00 01 00 f7");

if (host.platformIsWindows())
	host.addDeviceNameBasedDiscoveryPair(["nanoKONTROL2"], ["nanoKONTROL2"]);
else if (host.platformIsMac())
	host.addDeviceNameBasedDiscoveryPair(["nanoKONTROL2 SLIDERS/KNOBS"], ["nanoKONTROL2 CTRL"]);
else if (host.platformIsLinux())
        host.addDeviceNameBasedDiscoveryPair(["nanoKONTROL2 MIDI 1"], ["nanoKONTROL2 MIDI 1"]);

var SYSEX_HEADER = "F0 42 40 00 01 13 00";

var CC =
{
	CYCLE : 0x2E,
	REW : 0x2B,
	FF : 0x2C,
	STOP : 0x2A,
	PLAY : 0x29,
	REC : 0x2D,
	PREV_TRACK : 0x3A,
	NEXT_TRACK : 0x3B,
	SET : 0x3C,
	PREV_MARKER : 0x3D,
	NEXT_MARKER : 0x3E,
	SLIDER1 : 0x00,
	SLIDER8 : 0x07,
	KNOB1 : 0x10,
	KNOB8 : 0x17,
	S1 : 32,
	S8 : 0x27,
	M1 : 48,
	M8 : 0x37,
	R1 : 64,
	R8 : 0x47
};

var pendingLedState = initArray(0, 128);
var outputLedState = initArray(0, 128);

var isSetPressed = false;
var isPlaying = false;
var isPlayingCache = false;
var isRecording = false;
var isLooping = false;
var isEngineOn = false;
var isStopPressed = false;
var isPlayPressed = false;
var isRecPressed = false;

function init()
{
	var inputPort = host.getMidiInPort(0);
	inputPort.setMidiCallback(onMidi);

	var outputPort = host.getMidiOutPort(0);

	transport = host.createTransport ();

	transport.isPlaying ().addValueObserver (function (value)
	{
		println (value ? "Playing..." : "Stopped.");
	});

	transport.isPlaying ().markInterested ();

	sendSysex(SYSEX_HEADER + "00 00 01 F7"); // Enter native mode

	println("nanoKONTROL2 initialized!");
}

function flush()
{

	println ("\nFlush called.");


	// check if playing
	isPlaying = transport.isPlaying ().get ();


	// println ("is playingCache: " + isPlayingCache);
	// println ("is playing: " + isPlaying);

	if (isPlaying != isPlayingCache)
	{
		// cache it
		isPlayingCache = isPlaying;

		// toggle led based on playing true/false
		host.getMidiOutPort(0).sendMidi (191, 41, isPlaying ? 127 : 0);
		// println ("Updated, because no cache...");
	}
	else
		// println ("Not updated, because cache.");

}

function exit()
{
	sendSysex(SYSEX_HEADER + "00 00 00 F7"); // Leave native mode
	println("Exited!");
}


function checkLedOutput(cc)
{
   if (pendingLedState[cc] != outputLedState[cc])
   {
      sendChannelController(15, cc, pendingLedState[cc]);
      outputLedState[cc] = pendingLedState[cc];
   }
}

function setOutput(cc, val)
{
   pendingLedState[cc] = val;
}



function onMidi(status, data1, data2)
{

	var cc = data1;
	var val = data2;
	// printMidi(status, cc, val);

	println(status);

	// printMidi(status, data1, data2);

	// toggle between 176 and 191 [one is native mode]
	if (status == 191)
	{

		switch (cc)
		{
			case CC.SET:
				isSetPressed = val > 0;
				break;
			case CC.STOP:
				isStopPressed = val > 0;
				break;
			case CC.PLAY:
				isPlayPressed = val > 0;
				break;
			case CC.REC:
				isRecPressed = val > 0;
				break;
		}



		if (val > 0) // ignore when buttons are released
		{

			switch (cc)
			{
				case CC.PLAY:
					if (isEngineOn)
					{
						if (!isStopPressed && !isRecPressed) isPlaying ? transport.restart() : transport.play();
					}
					else transport.restart();
					break;

				case CC.STOP:
					if (!isPlayPressed && !isRecPressed) transport.stop();
					break;

				// banana replace
				case CC.REC:
					if (!isPlayPressed && !isStopPressed) transport.record();
					break;

				case CC.CYCLE:
					switchPage();
					break;

				case CC.REW:
					transport.rewind();
					break;

				// banana replace
				case CC.FF:
					transport.fastForward();
					break;
			}
		}
	}
}



function onSysex(data)
{
}

function toggleEngineState()
{
	isEngineOn ? application.deactivateEngine() : application.activateEngine();
}