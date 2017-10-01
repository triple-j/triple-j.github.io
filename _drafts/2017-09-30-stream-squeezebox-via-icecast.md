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

## Install `pulseaudio`

```
sudo apt-get install pulseaudio
```

## Install/Setup `squeezelite`

```
sudo apt-get install squeezelite libflac-dev libasound2-plugins alsa-utils opus-tools speex
```

Set `/etc/default/squeezelite`
```
SL_SOUNDCARD="default"
SB_EXTRA_ARGS="-a 180"
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

Find the PulseAudio monitor (audio may need to be played first): 
```
pactl list | grep "Monitor Source"
```
Outputs:
```
        Monitor Source: alsa_output.platform-snd_aloop.0.analog-stereo.monitor
        Monitor Source: alsa_output.pci-0000_00_1b.0.analog-stereo.monitor
```
We want to use `alsa_output.pci-0000_00_1b.0.analog-stereo.monitor`.

Modify the following and save to `/etc/darkice.cfg`:
```
# see the darkice.cfg man page for details

[general]
duration        = 0
bufferSecs      = 5

[input]
device          = pulseaudio
paSourceName    = alsa_output.pci-0000_00_1b.0.analog-stereo.monitor
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

To make `darkice` run at startup change the `RUN` variable in `/etc/default/darkice`
```
RUN=yes
```

#### Sources

1. <http://www.winko-erades.nl/index.php?option=com_content&view=article&id=54:installing-squeezelite-player-on-a-raspberry-pi-running-jessie&catid=20:raspbian>
2. <https://stmllr.net/blog/live-mp3-streaming-from-audio-in-with-darkice-and-icecast2-on-raspberry-pi/>
3. <http://wiki.radioreference.com/index.php/Live_Audio/Ubuntu_Darkice#Darkice_Configuration_File>
4. <https://wiki.debian.org/PulseAudio#Installing_PulseAudio>
