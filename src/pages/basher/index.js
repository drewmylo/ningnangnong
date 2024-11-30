import * as React from 'react';
import Layout from '../../components/layout';
import Seo from '../../components/seo';
import { useState } from 'react';
import { useEffect, useRef } from 'react';
import {
  progressText,
  progress,
  terminal,
  terminalInput,
} from './basher.module.css';

const bashCommands = [
  [
    'ls',
    'List directory contents',
    ' ls\n',
    '',
    '\nfile1.txt  file2.txt  folder1/',
  ],
  [
    'cd',
    'Change directory',
    ' cd /home/user\n',
    '',
    ' [Changes the current directory to /home/user]',
  ],
  ['pwd', 'Print working directory', ' pwd\n', '', '\n/home/user'],
  [
    'mkdir',
    'Make directories',
    ' mkdir new_folder\n',
    '',
    " [Creates a directory named 'new_folder']",
  ],
  [
    'rmdir',
    'Remove empty directories',
    ' rmdir old_folder\n',
    '',
    " [Removes the directory 'old_folder' if it's empty]",
  ],
  [
    'rm',
    'Remove files or directories',
    ' rm file.txt\n',
    '',
    " [Deletes 'file.txt']",
  ],
  [
    'cp',
    'Copy files and directories',
    ' cp source.txt destination.txt\n',
    '',
    " [Copies 'source.txt' to 'destination.txt']",
  ],
  [
    'mv',
    'Move or rename files and directories',
    ' mv oldname.txt newname.txt\n',
    '',
    " [Renames 'oldname.txt' to 'newname.txt']",
  ],
  [
    'touch',
    'Create an empty file',
    ' touch newfile.txt\n',
    '',
    " [Creates an empty file named 'newfile.txt']",
  ],
  [
    'find',
    'Search for files and directories',
    " find / -name 'file.txt'\n",
    '',
    '\n/usr/local/file.txt',
  ],
  [
    'locate',
    'Find files by name',
    ' locate config.php\n',
    '',
    '\n/etc/apache2/sites-available/config.php',
  ],
  [
    'cat',
    'Concatenate and display file content',
    ' cat file.txt\n',
    '',
    "\n[Displays the content of 'file.txt']",
  ],
  [
    'less',
    'View file content page by page',
    ' less largefile.txt\n',
    '',
    " [Opens 'largefile.txt' for paginated viewing]",
  ],
  [
    'more',
    'View file content (alternative to less)',
    ' more largefile.txt\n',
    '',
    " [Displays 'largefile.txt' one screen at a time]",
  ],
  [
    'head',
    'Display the first lines of a file',
    ' head -n 5 file.txt\n',
    '',
    "\n[First 5 lines of 'file.txt']",
  ],
  [
    'tail',
    'Display the last lines of a file',
    ' tail -n 5 file.txt\n',
    '',
    "\n[Last 5 lines of 'file.txt']",
  ],
  [
    'nano',
    'Simple text editor',
    ' nano file.txt\n',
    '',
    " [Opens 'file.txt' in nano editor]",
  ],
  [
    'vim',
    'Advanced text editor',
    ' vim file.txt\n',
    '',
    " [Opens 'file.txt' in vim editor]",
  ],
  [
    'vi',
    'Text editor (similar to vim)',
    ' vi file.txt\n',
    '',
    " [Opens 'file.txt' in vi editor]",
  ],
  [
    'chmod',
    'Change file permissions',
    ' chmod 755 script.sh\n',
    '',
    " [Sets permissions of 'script.sh' to rwxr-xr-x]",
  ],
  [
    'chown',
    'Change file owner and group',
    ' chown user:group file.txt\n',
    '',
    " [Changes owner and group of 'file.txt']",
  ],
  [
    'ln',
    'Create links between files',
    ' ln -s /path/to/file linkname\n',
    '',
    " [Creates a symbolic link 'linkname' to 'file']",
  ],
  [
    'echo',
    'Display a message or variable',
    " echo 'Hello World'\n",
    '',
    '\nHello World',
  ],
  [
    'cpio',
    'Copy files to and from archives',
    ' find . -print | cpio -o > archive.cpio\n',
    '',
    " [Creates 'archive.cpio' containing files from current directory]",
  ],
  [
    'file',
    'Determine file type',
    ' file image.jpg\n',
    '',
    '\nimage.jpg: JPEG image data, JFIF standard',
  ],
  [
    'basename',
    'Strip directory and suffix from filenames',
    ' basename /home/user/file.txt\n',
    '',
    '\nfile.txt',
  ],
  [
    'dirname',
    'Remove the last part of a file path',
    ' dirname /home/user/file.txt\n',
    '',
    '\n/home/user',
  ],
  [
    'sort',
    'Sort lines of text files',
    ' sort names.txt\n',
    '',
    "\n[Displays 'names.txt' with lines sorted alphabetically]",
  ],
  [
    'uniq',
    'Report or filter out repeated lines',
    ' uniq duplicates.txt\n',
    '',
    "\n[Displays 'duplicates.txt' with duplicate lines removed]",
  ],
  [
    'grep',
    'Search text using patterns',
    " grep 'error' logfile.txt\n",
    '',
    "\n[Lines containing 'error' in 'logfile.txt']",
  ],
  [
    'sed',
    'Stream editor for filtering and transforming text',
    " sed 's/old/new/g' file.txt\n",
    '',
    " [Replaces 'old' with 'new' in 'file.txt' and outputs result]",
  ],
  [
    'awk',
    'Pattern scanning and processing language',
    " awk '{print $1}' file.txt\n",
    '',
    "\n[Prints the first column of 'file.txt']",
  ],
  [
    'cut',
    'Remove sections from each line of files',
    " cut -d':' -f1 /etc/passwd\n",
    '',
    "\n[Displays usernames from '/etc/passwd']",
  ],
  [
    'tr',
    'Translate or delete characters',
    " echo 'hello' | tr 'a-z' 'A-Z'\n",
    '',
    '\nHELLO',
  ],
  [
    'wc',
    'Count lines, words, and bytes',
    ' wc file.txt\n',
    '',
    '\n10  50 200 file.txt\n[Lines Words Bytes Filename]',
  ],
  [
    'split',
    'Split files into pieces',
    ' split -l 1000 largefile.txt part_\n',
    '',
    " [Splits 'largefile.txt' into files of 1000 lines each]",
  ],
  [
    'tee',
    'Read from standard input and write to standard output and files',
    ' ls | tee filelist.txt\n',
    '',
    " [Displays directory contents and saves to 'filelist.txt']",
  ],
  [
    'paste',
    'Merge lines of files',
    ' paste file1.txt file2.txt\n',
    '',
    "\n[Lines from 'file1.txt' and 'file2.txt' merged side by side]",
  ],
  [
    'xargs',
    'Build and execute command lines from input',
    " find . -name '*.txt' | xargs rm\n",
    '',
    " [Deletes all '.txt' files found]",
  ],
  [
    'tar',
    'Archive files',
    ' tar -cvf archive.tar /path/to/directory\n',
    '',
    " [Creates 'archive.tar' containing specified directory]",
  ],
  [
    'gzip',
    'Compress files with gzip',
    ' gzip file.txt\n',
    '',
    " [Compresses 'file.txt' to 'file.txt.gz']",
  ],
  [
    'gunzip',
    'Decompress gzip files',
    ' gunzip file.txt.gz\n',
    '',
    " [Decompresses 'file.txt.gz' to 'file.txt']",
  ],
  [
    'zip',
    'Compress files with zip',
    ' zip archive.zip file1.txt file2.txt\n',
    '',
    " [Creates 'archive.zip' containing specified files]",
  ],
  [
    'unzip',
    'Decompress zip files',
    ' unzip archive.zip\n',
    '',
    " [Extracts files from 'archive.zip']",
  ],
  [
    'bzip2',
    'Compress files with bzip2',
    ' bzip2 file.txt\n',
    '',
    " [Compresses 'file.txt' to 'file.txt.bz2']",
  ],
  [
    'bunzip2',
    'Decompress bzip2 files',
    ' bunzip2 file.txt.bz2\n',
    '',
    " [Decompresses 'file.txt.bz2' to 'file.txt']",
  ],
  [
    'xz',
    'Compress files with xz',
    ' xz file.txt\n',
    '',
    " [Compresses 'file.txt' to 'file.txt.xz']",
  ],
  [
    'unxz',
    'Decompress xz files',
    ' unxz file.txt.xz\n',
    '',
    " [Decompresses 'file.txt.xz' to 'file.txt']",
  ],
  [
    'md5sum',
    'Compute MD5 checksum',
    ' md5sum file.txt\n',
    '',
    '\nd41d8cd98f00b204e9800998ecf8427e  file.txt',
  ],
  [
    'sha256sum',
    'Compute SHA-256 checksum',
    ' sha256sum file.txt\n',
    '',
    '\ne3b0c44298fc1c149afbf4c8996fb924...  file.txt',
  ],
  [
    'top',
    'Task manager to display processes',
    ' top\n',
    '',
    ' [Displays real-time system processes and resource usage]',
  ],
  [
    'htop',
    'Enhanced top (requires installation)',
    ' htop\n',
    '',
    ' [Enhanced interactive process viewer]',
  ],
  [
    'ps',
    'Report a snapshot of current processes',
    ' ps aux\n',
    '',
    '\n[Lists all running processes with details]',
  ],
  [
    'kill',
    'Terminate a process by ID',
    ' kill 1234\n',
    '',
    ' [Sends SIGTERM to process with PID 1234]',
  ],
  [
    'killall',
    'Kill processes by name',
    ' killall firefox\n',
    '',
    " [Terminates all processes named 'firefox']",
  ],
  [
    'df',
    'Disk usage of file systems',
    ' df -h\n',
    '',
    '\n[Displays disk space usage in human-readable format]',
  ],
  [
    'du',
    'Disk usage of files and directories',
    ' du -sh /var/log\n',
    '',
    '\n50M    /var/log',
  ],
  [
    'free',
    'Display memory usage',
    ' free -h\n',
    '',
    '\n[Displays memory usage in human-readable format]',
  ],
  [
    'uptime',
    'Show how long the system has been running',
    ' uptime\n',
    '',
    '\n 10:15:42 up 5 days,  3:16,  2 users,  load average: 0.00, 0.01, 0.05',
  ],
  [
    'dmesg',
    'Kernel ring buffer messages',
    ' dmesg | tail\n',
    '',
    '\n[Displays the last few kernel messages]',
  ],
  [
    'uname',
    'System information',
    ' uname -a\n',
    '',
    '\nLinux hostname 5.4.0-42-generic #46-Ubuntu SMP x86_64 GNU/Linux',
  ],
  [
    'lscpu',
    'Display CPU architecture information',
    ' lscpu\n',
    '',
    '\n[Displays detailed CPU information]',
  ],
  [
    'lsusb',
    'List USB devices',
    ' lsusb\n',
    '',
    '\nBus 002 Device 003: ID 8087:0026 Intel Corp.',
  ],
  [
    'lspci',
    'List PCI devices',
    ' lspci\n',
    '',
    '\n00:02.0 VGA compatible controller: Intel Corporation UHD Graphics',
  ],
  [
    'lsblk',
    'List block devices (drives)',
    ' lsblk\n',
    '',
    '\nsda      8:0    0  931.5G  0 disk\n├─sda1   8:1    0   500M  0 part /boot\n...',
  ],
  [
    'who',
    'Show who is logged on',
    ' who\n',
    '',
    '\nuser1   tty7         2022-10-01 09:10 (:0)',
  ],
  ['whoami', 'Show current user', ' whoami\n', '', '\nuser1'],
  [
    'env',
    'Display environment variables',
    ' env\n',
    '',
    '\n[Lists all environment variables]',
  ],
  [
    'export',
    'Set an environment variable',
    ' export PATH=$PATH:/new/path\n',
    '',
    " [Adds '/new/path' to the PATH variable]",
  ],
  [
    'alias',
    'Create shortcuts for commands',
    " alias ll='ls -l'\n",
    '',
    " [Creates an alias 'll' for 'ls -l']",
  ],
  [
    'unalias',
    'Remove alias definitions',
    ' unalias ll\n',
    '',
    " [Removes the alias 'll']",
  ],
  ['which', 'Locate a command', ' which python\n', '', '\n/usr/bin/python'],
  [
    'whereis',
    'Locate the binary, source, and manual page files',
    ' whereis ls\n',
    '',
    '\nls: /bin/ls /usr/share/man/man1/ls.1.gz',
  ],
  [
    'history',
    'Display command history',
    ' history\n',
    '',
    '\n[Lists previously executed commands with numbers]',
  ],
  [
    'jobs',
    'Display active jobs',
    ' jobs\n',
    '',
    '\n[1]+  Running    sleep 100 &',
  ],
  [
    'bg',
    'Send a job to the background',
    ' bg %1\n',
    '',
    ' [Continues job 1 in the background]',
  ],
  [
    'fg',
    'Bring a job to the foreground',
    ' fg %1\n',
    '',
    ' [Brings job 1 to the foreground]',
  ],
  [
    'nice',
    'Run a command with modified scheduling priority',
    ' nice -n 10 long_task\n',
    '',
    " [Starts 'long_task' with lower priority]",
  ],
  [
    'renice',
    'Alter priority of running processes',
    ' renice 5 1234\n',
    '',
    ' [Changes priority of process 1234 to 5]',
  ],
  [
    'mount',
    'Mount a file system',
    ' mount /dev/sdb1 /mnt/usb\n',
    '',
    " [Mounts '/dev/sdb1' to '/mnt/usb']",
  ],
  [
    'umount',
    'Unmount a file system',
    ' umount /mnt/usb\n',
    '',
    " [Unmounts '/mnt/usb']",
  ],
  [
    'lsattr',
    'List file attributes',
    ' lsattr file.txt\n',
    '',
    '\n-------------e---- file.txt',
  ],
  [
    'chattr',
    'Change file attributes',
    ' chattr +i file.txt\n',
    '',
    " [Sets the immutable flag on 'file.txt']",
  ],
  [
    'stat',
    'Display file or file system status',
    ' stat file.txt\n',
    '',
    "\n[Displays detailed status of 'file.txt']",
  ],
  [
    'fsck',
    'Check and repair file system',
    ' fsck /dev/sda1\n',
    '',
    " [Checks and repairs filesystem on '/dev/sda1']",
  ],
  [
    'e2fsck',
    'Check a Linux file system (ext2/ext3/ext4)',
    ' e2fsck -p /dev/sda1\n',
    '',
    " [Automatically repairs filesystem on '/dev/sda1']",
  ],
  [
    'tune2fs',
    'Adjust tunable file system parameters',
    ' tune2fs -l /dev/sda1\n',
    '',
    " [Displays filesystem parameters of '/dev/sda1']",
  ],
  [
    'mkfs',
    'Make a file system',
    ' mkfs.ext4 /dev/sdb1\n',
    '',
    " [Creates an ext4 filesystem on '/dev/sdb1']",
  ],
  [
    'dd',
    'Convert and copy a file, write disk images',
    ' dd if=/dev/zero of=file.bin bs=1M count=100\n',
    '',
    ' [Creates a 100MB file filled with zeros]',
  ],
  [
    'blkid',
    'Display block device attributes',
    ' blkid /dev/sda1\n',
    '',
    '\n/dev/sda1: UUID="abc123" TYPE="ext4"',
  ],
  [
    'parted',
    'Partition editor',
    ' parted /dev/sda\n',
    '',
    " [Starts parted for '/dev/sda']",
  ],
  [
    'fdisk',
    'Disk partition editor',
    ' fdisk /dev/sda\n',
    '',
    " [Opens fdisk utility for '/dev/sda']",
  ],
  [
    'swapoff',
    'Disable swapping',
    ' swapoff /swapfile\n',
    '',
    " [Disables swap on '/swapfile']",
  ],
  [
    'swapon',
    'Enable swapping',
    ' swapon /swapfile\n',
    '',
    " [Enables swap on '/swapfile']",
  ],
  ['reboot', 'Reboot the system', ' reboot\n', '', ' [System restarts]'],
  [
    'shutdown',
    'Halt, power-off, or reboot the system',
    ' shutdown -h now\n',
    '',
    ' [System shuts down immediately]',
  ],
  [
    'systemctl',
    'Control the systemd system and services',
    ' systemctl restart apache2\n',
    '',
    " [Restarts the 'apache2' service]",
  ],
  [
    'service',
    'Manage system services',
    ' service ssh status\n',
    '',
    " [Displays the status of the 'ssh' service]",
  ],
  [
    'journalctl',
    'Query the systemd journal',
    ' journalctl -u ssh\n',
    '',
    " [Displays logs for the 'ssh' service]",
  ],
  [
    'ping',
    'Check network connectivity',
    ' ping -c 4 google.com\n',
    '',
    '\n[4 ICMP echo requests and replies with timing statistics]',
  ],
  [
    'ifconfig',
    'Network interface configuration',
    ' ifconfig eth0\n',
    '',
    "\n[Displays network configuration for 'eth0']",
  ],
  [
    'ip',
    'Show/manipulate routing, devices, policy routing',
    ' ip addr show\n',
    '',
    '\n[Displays IP addresses assigned to all interfaces]',
  ],
  [
    'netstat',
    'Print network connections, routing tables',
    ' netstat -tuln\n',
    '',
    '\n[Lists listening ports and services]',
  ],
  [
    'ss',
    'Display network sockets',
    ' ss -tulw\n',
    '',
    '\n[Shows open TCP and UDP ports]',
  ],
  [
    'traceroute',
    'Trace the route to a network host',
    ' traceroute google.com\n',
    '',
    "\n[Displays the path packets take to reach 'google.com']",
  ],
  [
    'wget',
    'Download files from the internet',
    ' wget http://example.com/file.zip\n',
    '',
    " [Downloads 'file.zip' from 'example.com']",
  ],
  [
    'curl',
    'Transfer data to/from a server',
    ' curl http://example.com\n',
    '',
    " [Displays the content of 'example.com']",
  ],
  [
    'scp',
    'Securely copy files over SSH',
    ' scp file.txt user@remote:/path\n',
    '',
    " [Copies 'file.txt' to remote server]",
  ],
  [
    'sftp',
    'Secure file transfer protocol',
    ' sftp user@remote\n',
    '',
    " [Starts SFTP session with 'remote' server]",
  ],
  [
    'ftp',
    'Transfer files over FTP',
    ' ftp ftp.example.com\n',
    '',
    " [Starts FTP session with 'ftp.example.com']",
  ],
  [
    'telnet',
    'Connect to a remote host over Telnet',
    ' telnet towel.blinkenlights.nl\n',
    '',
    ' [Connects to a server that plays Star Wars in ASCII]',
  ],
  [
    'nc',
    'Netcat, a networking utility (send and receive data)',
    ' nc -l 1234\n',
    '',
    ' [Listens on port 1234 for incoming connections]',
  ],
  [
    'nmap',
    'Network exploration tool and security scanner',
    ' nmap 192.168.1.1\n',
    '',
    " [Scans '192.168.1.1' for open ports and services]",
  ],
  [
    'dig',
    'DNS lookup',
    ' dig example.com\n',
    '',
    "\n[Displays DNS records for 'example.com']",
  ],
  [
    'nslookup',
    'Query Internet domain name servers',
    ' nslookup example.com\n',
    '',
    "\n[Displays DNS information for 'example.com']",
  ],
  [
    'route',
    'Show/manipulate the IP routing table',
    ' route -n\n',
    '',
    '\n[Displays kernel routing table]',
  ],
  [
    'arp',
    'Manipulate the system ARP cache',
    ' arp -a\n',
    '',
    '\n[Lists all entries in the ARP cache]',
  ],
  [
    'iptables',
    'Configure packet filtering rules',
    ' iptables -L\n',
    '',
    ' [Lists current firewall rules]',
  ],
  [
    'ufw',
    'Uncomplicated firewall (simpler iptables interface)',
    ' ufw enable\n',
    '',
    ' [Enables the UFW firewall]',
  ],
  [
    'firewalld',
    'Manage firewall dynamically',
    ' firewall-cmd --list-all\n',
    '',
    ' [Displays current firewall configuration]',
  ],
  [
    'ssh',
    'Secure shell, remote login program',
    ' ssh user@remote\n',
    '',
    " [Logs into 'remote' server via SSH]",
  ],
  [
    'hostname',
    'Show or set the system hostname',
    ' hostname\n',
    '',
    '\nmy-computer',
  ],
  [
    'hostnamectl',
    'Control the system hostname',
    ' hostnamectl set-hostname new-hostname\n',
    '',
    " [Changes the system hostname to 'new-hostname']",
  ],
  [
    'ifup',
    'Bring a network interface up',
    ' ifup eth0\n',
    '',
    " [Activates the 'eth0' network interface]",
  ],
  [
    'ifdown',
    'Take a network interface down',
    ' ifdown eth0\n',
    '',
    " [Deactivates the 'eth0' network interface]",
  ],
  [
    'iptables-save',
    'Save iptables rules',
    ' iptables-save > rules.v4\n',
    '',
    " [Saves current iptables rules to 'rules.v4']",
  ],
  [
    'iptables-restore',
    'Restore iptables rules',
    ' iptables-restore < rules.v4\n',
    " [Restores iptables rules from 'rules.v4']",
  ],
  [
    'mail',
    'Send and receive email',
    " mail -s 'Subject' user@example.com\n",
    " [Composes and sends an email to 'user@example.com']",
  ],
  ['mutt', 'Text-based email client', ' mutt\n', ' [Opens mutt email client]'],
  [
    'wall',
    'Send a message to logged-in users',
    " wall 'System will reboot in 5 minutes'\n",
    ' [Broadcasts message to all users]',
  ],
  [
    'write',
    'Send a message to another user',
    ' write user1\n',
    " [Allows you to type messages to 'user1']",
  ],
  [
    'mesg',
    'Enable or disable messages',
    ' mesg n\n',
    ' [Disables others from writing to your terminal]',
  ],
  [
    'useradd',
    'Add a new user',
    ' sudo useradd newuser\n',
    " [Creates a new user account 'newuser']",
  ],
  [
    'userdel',
    'Delete a user',
    ' sudo userdel newuser\n',
    " [Deletes the user account 'newuser']",
  ],
  [
    'usermod',
    'Modify a user',
    ' sudo usermod -aG sudo newuser\n',
    " [Adds 'newuser' to the 'sudo' group]",
  ],
  [
    'passwd',
    'Change user password',
    ' passwd\n',
    " [Prompts to change the current user's password]",
  ],
  [
    'groupadd',
    'Add a new group',
    ' sudo groupadd newgroup\n',
    " [Creates a new group 'newgroup']",
  ],
  [
    'groupdel',
    'Delete a group',
    ' sudo groupdel newgroup\n',
    " [Deletes the group 'newgroup']",
  ],
  ['groups', 'Show user’s groups', ' groups\n', '\nuser1 adm cdrom sudo'],
  [
    'id',
    'Display user and group IDs',
    ' id\n',
    '\nuid=1000(user1) gid=1000(user1) groups=1000(user1),27(sudo)',
  ],
  ['su', 'Switch user', ' su - user2\n', " [Switches to 'user2' account]"],
  [
    'sudo',
    'Execute a command as another user (typically root)',
    ' sudo apt update\n',
    " [Runs 'apt update' with root privileges]",
  ],
  [
    'adduser',
    'Create a new user',
    ' sudo adduser newuser\n',
    " [Interactive script to add 'newuser']",
  ],
  [
    'deluser',
    'Remove a user',
    ' sudo deluser newuser\n',
    " [Removes 'newuser' from the system]",
  ],
  [
    'last',
    'Show listing of last logged-in users',
    ' last\n',
    '\nuser1   pts/0        192.168.1.2     Thu Oct  1 10:00   still logged in',
  ],
  ['logname', 'Print current login name', ' logname\n', '\nuser1'],
  [
    'newgrp',
    'Log in to a new group',
    ' newgrp group1\n',
    " [Switches the current group ID to 'group1']",
  ],
  [
    'chsh',
    'Change user login shell',
    ' chsh -s /bin/zsh\n',
    " [Changes default shell to '/bin/zsh']",
  ],
  [
    'faillog',
    'Display failed login attempts',
    ' faillog -u user1\n',
    " [Displays failed login attempts for 'user1']",
  ],
  [
    'lastlog',
    'Show the most recent login for all users',
    ' lastlog\n',
    '\n[Displays last login times for all users]',
  ],
  [
    'visudo',
    'Safely edit the sudoers file',
    ' sudo visudo\n',
    " [Opens '/etc/sudoers' for editing]",
  ],
  [
    'nologin',
    'Prevent non-root users from logging in',
    ' nologin\n',
    ' [Denies login access; typically used as a shell for disabled accounts]',
  ],
  [
    'date',
    'Display or set the system date and time',
    ' date\n',
    '\nThu Oct  1 10:15:42 UTC 2022',
  ],
  [
    'cal',
    'Display a calendar',
    ' cal\n',
    '\n     October 2022\nSu Mo Tu We Th Fr Sa\n                  1\n 2  3  4  5  6  7  8\n...',
  ],
  ['bc', 'Calculator program', " echo '2+2' | bc\n", '', '\n4'],
];
const SDPage = () => {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [displayHelp, setDisplayHelp] = useState(false);
  const [points, setPoints] = useState(1000);
  const inputRef = useRef(null);

  useEffect(() => {
    if (points > 0 && !displayHelp) {
      const interval = setInterval(() => {
        setPoints((points) => points - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [points]);

  const showHelp = () => {
    setDisplayHelp(true);
  };

  const printer = (e) => {
    setInput(e.target.value);
  };

  const handleInputKey = (e) => {
    if (e.target.value == bashCommands[index][0] && !displayHelp) {
      setIndex((prevIndex) => prevIndex + 1);
      setInput('');
      setDisplayHelp(false);
    }
  };

  return (
    <Layout pageTitle="Basher">
      <h3>Instructions</h3>
      <p>
        Enter the relevant bash command in the terminal below that would satisfy
        the action. Click 'HELP' if you would like the answer. Clicking help
        ends the game. Let's see how many points you can get!
      </p>
      <h3>Action</h3>
      {/* <p style={{ 'white-space': 'pre-wrap' }}>
        {index - 1 >= 0 && bashCommands[index - 1][2]}
      </p> */}
      <p>{bashCommands[index][1]}</p>
      <h3>Countdown</h3>
      <div className={progressText}>{points + ''}</div>
      <progress className={progress} value={points} max="1000" />
      <br></br>
      <div className={terminal} onClick={() => inputRef.current?.focus()}>
        <span>~ </span>
        <input
          onChange={printer}
          value={input}
          onKeyDown={handleInputKey}
          ref={inputRef}
          className={terminalInput}
        />
      </div>{' '}
      <button
        style={{ margin: '40px', marginLeft: '0' }}
        onClick={() => showHelp()}
      >
        HELP
      </button>
      {displayHelp && (
        <p>
          {' '}
          Answer: <b>{bashCommands[index][2]}</b>
        </p>
      )}
    </Layout>
  );
};

export const Head = () => <Seo title="Basher" />;

export default SDPage;
