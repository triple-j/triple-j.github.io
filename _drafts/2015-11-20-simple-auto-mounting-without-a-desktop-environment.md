---
layout: post
title: Simple Auto-mounting Without a Desktop Environment
tags:
- linux
- how_to
---


> [udevil](https://ignorantguru.github.io/udevil/) and
> [devmon](https://igurublog.wordpress.com/downloads/script-devmon/)
> 'nuff said.

## Install
```
sudo apt-get install udevil
```

## Run
Put the following in a startup script.

```
devmon &>/tmp/devmon.log &
```