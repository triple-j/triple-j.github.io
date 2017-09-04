---
layout: post
title: Setup a machine to run OS.js (debian & nginx)
tags:
- linux
- how_to
- os.js
---

## Setup Free SSL Certificate

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

## Create OS.js user

(as *root*)

```
mkdir /home/osjs
groupadd osjs
useradd -d /home/osjs/ -s /bin/bash -g osjs -m osjsadmin
passwd osjsadmin
chown -R osjsadmin.osjs /home/osjs/
chmod -R 2775 /home/osjs/
```

## Install OS.js

1. Create OS.js program directory

```
mkdir /opt/osjs
chown -R osjsadmin.osjs /opt/osjs/
chmod -R 2775 /opt/osjs/
```

2. Install *git* and other dependencies

```
sudo apt-get install git curl build-essential bcrypt
```

3. Install *Node*

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install nodejs npm
```

4. Install *OS.js*

```
git clone --recursive https://github.com/os-js/OS.js.git /opt/osjs
cd /opt/osjs
npm install --production
node osjs build
```

## Configure OS.js Authentication (Sqlite)

```
cd /opt/osjs

# Install dependencies
npm install sqlite3 bcryptjs bcrypt

# Set up configuration
node osjs config:set --name=authenticator --value=database
node osjs config:set --name=server.modules.auth.database.driver --value=sqlite

# Set up database
cp src/templates/misc/authstorage.sqlite src/server/

# Rebuild
node osjs build

# Now add yourself as an admin
node bin/add-user.js add username admin
mkdir -p vfs/home/username/.desktop

# optional add guest
node bin/add-user.js add guest guest
mkdir vfs/home/guest/.desktop
```

## Force SSL When Serving OS.js

```
server {
    listen 80;
    listen [::]:80;

    server_name example.com;

    # Force SSL Connection
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name example.com;
    
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    
    location /.well-known {
        root /var/www/letsencrypt;
    }

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Sources

1. <https://certbot.eff.org/#debiantesting-nginx>
2. <https://www.nginx.com/blog/free-certificates-lets-encrypt-and-nginx/>
3. <https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04>
4. <https://www.cyberciti.biz/faq/linux-setup-shared-directory/>
5. <http://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/opt.html>
5. <https://os.js.org/manual/installation/nix/>
6. <https://os.js.org/manual/auth/permission/>
7. <http://serverfault.com/a/424016>
8. <https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/#taxing-rewrites>
9. <http://nginx.org/en/docs/http/converting_rewrite_rules.html>
10. <https://os.js.org/manual/server/node/>
11. <https://raymii.org/s/tutorials/NGINX_proxy_folder_to_different_root.html>
