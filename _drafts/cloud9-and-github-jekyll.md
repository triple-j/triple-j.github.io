---
layout: post
title: GitHub, Jekyll, and Cloud9
tags:
- programming
- web_development
---

In an effort to find a way to edit this blog from anywhere, I discovered the
[Cloud9 IDE](https://c9.io/).  It is an online integrated development 
environment which also gives you access to a Linux based command-line 
environment where you can install additional software.

It works like GitHub where public projects are free, but you need to pay if you 
want to keep your project private.  Since this blog is already publicly hosted
on GitHub, I'm able to use Cloud9's services for no additional cos.

Below are the commands I used to install Jekyll and get it running on the Cloud9 
platform.  Checkout the [Cloud9 Jekyll Docs](https://docs.c9.io/v1.0/docs/jekyll)
and [GitHub Jekyll Docs](https://help.github.com/articles/using-jekyll-with-pages/)
for more information.


Install:

	gem install jekyll
	gem install jekyll-sitemap
	gem install github-pages

	
Running:

	jekyll serve --host $IP --port $PORT --drafts

