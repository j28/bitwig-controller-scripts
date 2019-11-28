loadAPI(1);

host.defineController("Korg", "J28 nanoKONTROL 2", "1.0", "85310dc4-0e00-11ea-9a9f-362b9e155667");
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

var mode =
{
	MIXER : 0,
	DEVICE : 1
};
var activeMode = mode.DEVICE;
var paramPage = 0;
var pagenames = [];
var isMacroMapping = initArray(false, 8);

var pendingLedState = initArray(0, 128);
var outputLedState = initArray(0, 128);

var isSetPressed = false;
var isPlay = false;
var isRecording = false;
var isLooping = false;
var isEngineOn = false;
var isStopPressed = false;
var isPlayPressed = false;
var isRecPressed = false;

function init()
{
	host.getMidiInPort(0).setMidiCallback(onMidi);

	// ///////////////////////////////////////////////////////// sections
	transport = host.createTransportSection();
	application = host.createApplicationSection();
	trackBank = host.createTrackBankSection(8, 1, 0);
	cursorTrack = host.createCursorTrackSection(2, 0);
	primaryDevice = cursorTrack.getPrimaryDevice();
	arranger = host.createArrangerSection(0);

	transport.addIsPlayingObserver(function(on)
	{
		isPlay = on;
	});

	transport.addIsRecordingObserver(function(on)
	{
      isRecording = on;
	});
	transport.addIsLoopActiveObserver(function(on)
	{
      isLooping = on;
	});
   primaryDevice.addSelectedPageObserver(0, function(page)
	{
		paramPage = page;
	});

   primaryDevice.addPageNamesObserver(function(names)
   {
      pagenames = names;
   });

	for ( var p = 0; p < 8; p++)
	{
		var parameter = primaryDevice.getParameter(p);

		parameter.setLabel("P" + (p + 1));
		// macro.addIsMappingObserver(getObserverIndexFunc(p, isMapping)); //TODO

      var macro = primaryDevice.getMacro(p);
      macro.getModulationSource().addIsMappingObserver(getTrackObserverFunc(p, function(index, state)
      {
         isMacroMapping[index] = state;
      }));
	}

	for ( var t = 0; t < 8; t++)
	{
		var track = trackBank.getTrack(t);
		track.getVolume().setLabel("V" + (t + 1));
		track.getPan().setLabel("P" + (t + 1));

		track.getSolo().addValueObserver(getTrackObserverFunc(t, function(index, state)
		{
			mixerPage.solo[index] = state;
		}));
		track.getMute().addValueObserver(getTrackObserverFunc(t, function(index, state)
		{
         mixerPage.mute[index] = state;
		}));
		track.getArm().addValueObserver(getTrackObserverFunc(t, function(index, state)
		{
         mixerPage.arm[index] = state;
		}));

	}
	application.addHasActiveEngineObserver(function(on)
	{
		isEngineOn = on;
	});
	sendSysex(SYSEX_HEADER + "00 00 01 F7"); // Enter native mode
	initNanoKontrol2();

   host.scheduleTask(blinkTimer, null, 200);
}

var blink = false;

function blinkTimer()
{
   blink = !blink;

   host.scheduleTask(blinkTimer, null, 200);
}

function exit()
{
	allIndicationsOff();
	sendSysex(SYSEX_HEADER + "00 00 00 F7"); // Leave native mode
}

function flush()
{
   activePage.prepareOutput();

   for(var cc = CC.S1; cc <= CC.R8; cc++)
   {
      checkLedOutput(cc);
   }

   for(var cc = 0x2A; cc <= 0x2E; cc++)
   {
      checkLedOutput(cc);
   }

   for(var cc = 0x3A; cc <= 0x3E; cc++)
   {
      checkLedOutput(cc);
   }
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

	if (status == 0xBF)
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
		if (isStopPressed && isPlayPressed && isRecPressed)
		{
			toggleEngineState();
		}

		var index = data1 & 0xf;

		if (withinRange(cc, CC.SLIDER1, CC.SLIDER8))
		{
			activePage.onSlider(index, val);
		}
		else if (withinRange(cc, CC.KNOB1, CC.KNOB8))
		{
			activePage.onKnob(index, val);
		}

		if (val > 0) // ignore when buttons are released
		{

			if (withinRange(cc, CC.M1, CC.M8))
			{
				activePage.mButton(index);
			}
			else if (withinRange(cc, CC.S1, CC.S8))
			{
				activePage.sButton(index);
			}
			else if (withinRange(cc, CC.R1, CC.R8))
			{
				activePage.rButton(index);
			}

			switch (cc)
			{
				case CC.PLAY:
					if (isEngineOn)
					{
						if (!isStopPressed && !isRecPressed) isSetPressed ? transport.returnToArrangement() : isPlay ? transport.restart() : transport.play();
					}
					else transport.restart();
					break;

				case CC.STOP:
					if (!isPlayPressed && !isRecPressed) isSetPressed ? transport.resetAutomationOverrides() : transport.stop();
					break;

				case CC.REC:
					if (!isPlayPressed && !isStopPressed) isSetPressed ? cursorTrack.getArm().toggle() : transport.record();
					break;

				case CC.CYCLE:
					isSetPressed ? transport.toggleLoop() : switchPage();
					break;

				case CC.REW:
					transport.rewind();
					break;

				case CC.FF:
					isSetPressed ? arranger.togglePlaybackFollow() : transport.fastForward();
					break;

				case CC.PREV_TRACK:
					activePage.prevTrackButton();
					break;

				case CC.NEXT_TRACK:
					activePage.nextTrackButton();
					break;

				case CC.PREV_MARKER:
					activePage.prevMarkerButton();
					break;

				case CC.NEXT_MARKER:
					activePage.nextMarkerButton();
					break;
			}
		}
	}
}

function onSysex(data)
{
}
function getTrackObserverFunc(index, f)
{
	return function(value)
	{
		f(index, value);
	};
}
function allIndicationsOff()
{
	for ( var p = 0; p < 8; p++)
	{
      primaryDevice.getParameter(p).setIndication(false);
      primaryDevice.getMacro(p).getAmount().setIndication(false);
		trackBank.getTrack(p).getVolume().setIndication(false);
		trackBank.getTrack(p).getPan().setIndication(false);
	}
}

function toggleEngineState()
{
	isEngineOn ? application.deactivateEngine() : application.activateEngine();
}

function initNanoKontrol2()
{
	activePage.updateIndications();
}

function Page()
{
}

Page.prototype.prepareCommonOutput = function()
{
   setOutput(CC.PLAY, isPlay ? 127 : 0);
   setOutput(CC.STOP, !isPlay ? 127 : 0);
   setOutput(CC.REC, isRecording ? 127 : 0);
   setOutput(CC.CYCLE, activePage == mixerPage ? 127 : 0);
};

devicePage = new Page();

devicePage.onKnob = function(index, val)
{
   isSetPressed ? primaryDevice.getParameter(index).reset() : primaryDevice.getParameter(index).set(val, 128);
};

// mixer in device mode
devicePage.onSlider = function(index, val)
{
	isSetPressed ? trackBank.getTrack(index).getVolume().reset() : trackBank.getTrack(index).getVolume().set(val, 128);
};


// original
// devicePage.onSlider = function(index, val)
// {
//    isSetPressed ? primaryDevice.getMacro(index).getAmount().reset() : primaryDevice.getMacro(index).getAmount().set(val, 128);
// };



devicePage.sButton = function(index)
{
   primaryDevice.setParameterPage(index);
   if (index < pagenames.length)
   {
      host.showPopupNotification("Page: " + pagenames[index]);
   }
};

devicePage.mButton = function(index)
{
   primaryDevice.getMacro(index).getModulationSource().toggleIsMapping();
};

devicePage.rButton = function(index)
{
};

devicePage.prevTrackButton = function()
{
	isSetPressed ? primaryDevice.switchToDevice(DeviceType.ANY,ChainLocation.PREVIOUS) : cursorTrack.selectPrevious();
};

devicePage.nextTrackButton = function()
{
	isSetPressed ? primaryDevice.switchToDevice(DeviceType.ANY,ChainLocation.NEXT) : cursorTrack.selectNext();
};

devicePage.prevMarkerButton = function()
{
	// isSetPressed ? primaryDevice.switchToPreviousPresetCategory() : primaryDevice.switchToPreviousPreset();
};

devicePage.nextMarkerButton = function()
{
	// isSetPressed ? primaryDevice.switchToNextPresetCategory() : primaryDevice.switchToNextPreset();
};

devicePage.updateIndications = function()
{
	for ( var p = 0; p < 8; p++)
	{
		macro = primaryDevice.getMacro(p).getAmount();
		parameter = primaryDevice.getParameter(p);
		track = trackBank.getTrack(p);
		parameter.setIndication(true);
		macro.setIndication(true);
		track.getVolume().setIndication(false);
		track.getPan().setIndication(false);
	}
};

devicePage.prepareOutput = function()
{
   this.prepareCommonOutput();

   for (var i = 0; i < 8; i++)
   {
      setOutput(CC.S1 + i, paramPage == i ? 127 : 0);
      setOutput(CC.M1 + i, (isMacroMapping[i] && blink) ? 127 : 0);
      setOutput(CC.R1 + i, 0);
   }
};

/* mixer page */////////////////////////////////////////////////////////////////
mixerPage = new Page();

mixerPage.solo = initArray(false, 8);
mixerPage.mute = initArray(false, 8);
mixerPage.arm = initArray(false, 8);

mixerPage.prepareOutput = function()
{
   this.prepareCommonOutput();

   for (var i = 0; i < 8; i++)
   {
      setOutput(CC.S1 + i, this.solo[i] ? 127 : 0);
      setOutput(CC.M1 + i, this.mute[i] ? 127 : 0);
      setOutput(CC.R1 + i, this.arm[i] ? 127 : 0);
   }
};

mixerPage.onKnob = function(index, val)
{
	isSetPressed ? trackBank.getTrack(index).getPan().reset() : trackBank.getTrack(index).getPan().set(val, 128);
};

mixerPage.onSlider = function(index, val)
{
	isSetPressed ? trackBank.getTrack(index).getVolume().reset() : trackBank.getTrack(index).getVolume().set(val, 128);
};

mixerPage.sButton = function(index)
{
	trackBank.getTrack(index).getSolo().toggle();
};

mixerPage.mButton = function(index)
{
	trackBank.getTrack(index).getMute().toggle();
};

mixerPage.rButton = function(index)
{
	trackBank.getTrack(index).getArm().toggle();
};

mixerPage.prevTrackButton = function()
{
	isSetPressed ? trackBank.scrollTracksPageUp() : cursorTrack.selectPrevious();
};

mixerPage.nextTrackButton = function()
{
	isSetPressed ? trackBank.scrollTracksPageDown() : cursorTrack.selectNext();
};

mixerPage.prevMarkerButton = function()
{
	transport.previousMarker(); // activate when it exists in the API
};

mixerPage.nextMarkerButton = function()
{
	transport.nextMarker(); // activate when it exists in the API
};

mixerPage.updateIndications = function()
{
	for ( var p = 0; p < 8; p++)
	{
		macro = primaryDevice.getMacro(p).getAmount();
		parameter = primaryDevice.getCommonParameter(p);
		track = trackBank.getTrack(p);
		track.getVolume().setIndication(true);
		track.getPan().setIndication(true);
		parameter.setIndication(false);
		macro.setIndication(false);
	}
};

var activePage = devicePage;

function switchPage()
{
	switch (activePage)
	{
		case devicePage:
			activePage = mixerPage;
         host.showPopupNotification("Mixer Mode");
			break;
		case mixerPage:
			activePage = devicePage;
         host.showPopupNotification("Device Mode");
			break;
	}

	activePage.updateIndications();
}
