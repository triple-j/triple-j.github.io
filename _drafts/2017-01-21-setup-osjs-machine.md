---
layout: post
title: Setup a machine to run OS.js (debian & nginx)
tags:
- linux
- how_to
- os.js
---

# Setup Free SSL Certificate

We'll get the certificate from [Let's Encrypt](https://letsencrypt.org/)

1. Install `certbot` (this will also setup the `cron` job to renew your certificates)

```
sudo apt-get install certbot 
```

2. Create the directory where Let’s Encrypt stores the temporary file, and set the required permissions:

```
sudo mkdir /var/www/letsencrypt
sudo chgrp www-data /var/www/letsencrypt
```

3. Add location block into the `server {}` block in `/etc/nginx/sites-available/default`:

```
        location /.well-known {
                root /var/www/letsencrypt;
        }
```

4. Verify the configuration file is syntactically valid and restart NGINX:

```
sudo nginx -t && sudo nginx -s reload
```

5. Run `certbot`:

```
sudo certbot certonly --webroot -w /var/www/letsencrypt -d example.com
```

6. Add ssl code into the `server {}` block in `/etc/nginx/sites-available/default`:

```
        listen 443 ssl default_server;
        ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
```

7. Verify the configuration file is syntactically valid and restart NGINX:

```
sudo nginx -t && sudo nginx -s reload
```

8. Test the Automatic renewal:

```
certbot renew --dry-run
```

## Sources

1. <https://certbot.eff.org/#debiantesting-nginx>
2. <https://www.nginx.com/blog/free-certificates-lets-encrypt-and-nginx/>
3. <https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04>
