loadAPI(9);
load ("j28nanoKONTROL2Hardware.js");

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

var hardware = null;
var transport = null;

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
	hardware = new NK2Hardware (host.getMidiOutPort (0), host.getMidiInPort (0), onMidi);
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
	// refresh if playing
	isPlaying = transport.isPlaying ().get ();
	hardware.updateLED (NK2_BUTTON_PLAY, isPlaying);

}

function exit()
{
	sendSysex(SYSEX_HEADER + "00 00 00 F7"); // Leave native mode
	println("Exited!");
}

function onMidi(status, data1, data2)
{

	var cc = data1;
	var val = data2;
	// printMidi(status, cc, val);
	// println(status);
	// printMidi(status, data1, data2);
	// toggle between 176 and 191 [one is native mode]
	if (status == 191)
	{
		switch (cc)
		{
			case NK2_BUTTON_SET:
				isSetPressed = val > 0;
				break;
			case NK2_BUTTON_STOP:
				isStopPressed = val > 0;
				break;
			case NK2_BUTTON_PLAY:
				isPlayPressed = val > 0;
				break;
			case NK2_BUTTON_REC:
				isRecPressed = val > 0;
				break;
		}
		if (val > 0) // ignore when buttons are released
		{

			switch (cc)
			{
				case NK2_BUTTON_PLAY:
					if (isEngineOn)
					{
						if (!isStopPressed && !isRecPressed) isPlaying ? transport.restart() : transport.play();
					}
					else transport.restart();
					break;

				case NK2_BUTTON_STOP:
					if (!isPlayPressed && !isRecPressed) transport.stop();
					break;

				// banana replace
				case NK2_BUTTON_REC:
					if (!isPlayPressed && !isStopPressed) transport.record();
					break;

				case NK2_BUTTON_CYCLE:
					switchPage();
					break;

				case NK2_BUTTON_REW:
					transport.rewind();
					break;

				// banana replace
				case NK2_BUTTON_FF:
					transport.fastForward();
					break;
			}
		}
	}
}

