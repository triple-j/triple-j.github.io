---
layout: post
title: Running Google's PHP App Engine on Cloud9
tags:
- cloud9
- how_to
---

I ran into some issues setting up 
[Google's PHP App Engine](https://cloud.google.com/appengine/docs/php/) on the 
[Cloud9 IDE](https://c9.io/) that I thought I should share with you.

After I setup a new workspace in Cloud9 with a current App Engine project, I 
followed the [Linux installation directions for the App 
Engine](https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_PHP).

Using the `$IP` and `$PORT` variables<sup>*</sup> set by Cloud9, I tried to run
the development server:

```
~/google-appengine/dev_appserver.py --host $IP --port $PORT workspace/
```

Unfortunatly I recevied this error message:

```
google.appengine.tools.devappserver2.wsgi_server.BindError: Unable to bind 0.0.0.0:8080
```

Using my google-fu I [discovered](http://stackoverflow.com/questions/15985130/apps-wont-run-on-gae-unable-to-bind-to-localhost0)
that you can receive that error if another program is using the port you are 
trying to run the App Engine on.  So I ran `sudo netstat -taupen | grep ":8080"`
and found that `apache2` was using port `8080`.

After I killed Apache with this command `sudo pkill apache2`, I was able to 
start the development server using the same command used above.

<small>\* `$IP` and `$PORT` were set to `0.0.0.0` and `8080` respectively.</small>