---
layout: post
title: Copy your Linux System to a New Harddrive
tags:
- linux
- how_to
---

_**Note:** This article assumes your new harddrive is mounted to `/media/temp/`
and that it is attached to `/dev/sda`.  Make sure you change the commands below 
to reflect your system before running them._

First mount your new drive.  Mount partitions as they will be on your finished system.

Use [rsync][1] to copy the file to your new harddrive

	rsync -aAXv --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} /* /media/temp/
	

Update your `/etc/fstab` file.  You can use `blkid /dev/sda1` to get the partition UUIDs. 

	
[Chroot][2] into your new file system.

	mount -t proc proc /media/temp/proc
	mount --bind /dev /media/temp/dev
	mount --bind /sys /media/temp/sys
	chroot /media/temp /bin/bash


[Install GRUB][3]

	grub-install --target=i386-pc --recheck --debug /dev/sda
	grub-mkconfig -o /boot/grub/grub.cfg



[1]: https://wiki.archlinux.org/index.php/full_system_backup_with_rsync "Full system backup with rsync"
[2]: https://wiki.debian.org/chroot "debian chroot"
[3]: https://wiki.archlinux.org/index.php/GRUB#Install_to_disk "GRUB -- Install to disk"