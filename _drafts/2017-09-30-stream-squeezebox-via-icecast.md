---
layout: post
title: Stream Squeezebox via Icecast (debian)
tags:
- linux
- how_to
- icecast
- darkice
- squeezelite
---

## Install `squeezelite`

```
sudo apt-get install squeezelite libflac-dev libasound2-plugins alsa-utils opus-tools speex
```

## Install/Setup `icecast2`

```
sudo apt-get install icecast2
```

The package manager will ask you to configure Icecast2. You should do so and set a hostname and passwords for source, relay and administration. Needless to say to use strong passwords. The source password will be needed in the darkice.cfg configuration. (See SOURCE_PASSWORD in the example below) 

## Install/Setup `darkice`

```
sudo apt-get install darkice
```

Find the ALSA device source: 
```
aplay -l
```
Outputs:
```
**** List of PLAYBACK Hardware Devices ****
card 0: Intel [HDA Intel], device 0: ALC662 rev1 Analog [ALC662 rev1 Analog]
  Subdevices: 0/1
  Subdevice #0: subdevice #0
card 0: Intel [HDA Intel], device 3: HDMI 0 [HDMI 0]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
```
We want to use `[ALC662 rev1 Analog]` which is `card 0` and `device 0`, so we'll use `hw:0,0` in the config to select that
device.

Modify the following and save to `/etc/darkice.cfg`:
```
# see the darkice.cfg man page for details

[general]
duration        = 0
bufferSecs      = 5

[input]
device          = hw:0,0
sampleRate      = 44100
bitsPerSample   = 16
channel         = 2

[icecast2-0]
format          = vorbis
bitrateMode     = abr
bitrate         = 96
server          = icecast2-0.example.com
port            = 8000
password        = SOURCE_PASSWORD  
mountPoint      = darkicetrial
name            = DarkIce trial
public          = no
```

#### Sources

1. <http://www.winko-erades.nl/index.php?option=com_content&view=article&id=54:installing-squeezelite-player-on-a-raspberry-pi-running-jessie&catid=20:raspbian>
2. <https://stmllr.net/blog/live-mp3-streaming-from-audio-in-with-darkice-and-icecast2-on-raspberry-pi/>
3. <http://wiki.radioreference.com/index.php/Live_Audio/Ubuntu_Darkice#Darkice_Configuration_File>
