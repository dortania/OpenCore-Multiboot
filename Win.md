# Installation of Windows 10
**Work in Progess**, you can help contibute via [PRs](https://github.com/dortania/OpenCore-Multiboot/pulls). This guide referes to Windows 10, however it's still valid for Windows 8/8.1.
## Downloading and flashing Windows 10
You can download Windows in different ways. In this guide we talk about Windows 10. So:
- [Downloading from MacOS/Linux](#MacOS/Linux)
- [Downloading from Windows](#Windows)

### Macos/Linux
Requirement:
- [Windows 10 ISO file](https://www.microsoft.com/software-download/windows10)
- [Balena Etcher](https://www.balena.io/etcher/)

Download the appropriate ISO for your Country
Open Balena Etcher, select an USB device and the ISO file, then click flash
Wait until it finishes of flashing, then boot on the USB.

### Windows
Requirement:
- [MediaCreationTool](https://www.microsoft.com/software-download/windows10)
- [Rufus](https://rufus.ie)

Open MediaCreationTool and download the ISO file for your system.
Use the appropriate settings for your system:
- UEFI: [PHOTO]
- BIOS/legacy/CSM: [PHOTO]

Wait until it finishes of flashing, then boot on the USB.

## Installing Windows 10
When the usb booted, you can chose what to do:
- [Install Windows 10 automatically](#automatically)
- [Install Windows 10 manually](#manually) (only when there are problems or when you want to control the procedure)
### Automatically
Follow the procedure and let Windows make the party!
### Manually
Find and remember your path to install.esd/install.wim file. I suppose that `<path>` it will be our path.
Press SHIFT+F10: it appears a command prompt window
#### Creating partitions
Type `diskpart`
Type `list disk` and remember the disk number where you want to install windows
Type `sel disk 0` or the other number you have
- UEFI USERS: Type `convert gpt` to convert the disk to GPT (risk of loss data!!!) Type `create part efi size=200` to create the EFI partition, then type `format quick fs=fat32` to format it and `assign letter=q` to assign the letter. `create part msr size=128` to create the MSR partition (used by some strange Windows things). `create part primary size=N` in which N=allYourSpace-1GB expressed in MB, then type `format quick fs=ntfs` to format it and `assign letter c` to our drive. After that type `create part primary`, `set id=de94bba4-06d1-4d40-a16a-bfd50179d6ac`,`gpt attributes=0x8000000000000001`,`format quick fs=ntfs` to setting up the recovery enviroment (OPTIONAL).
- Legacy Users: TODO: you can help contibute via [PRs](https://github.com/dortania/OpenCore-Multiboot/pulls)

Type `dism /get-wiminfo /wimfile:<path>`; remember the number of your edition (called X in the example).
Type `dism /apply-image /imagefile:<path> /index:X /applydir:C:\` to flash the WIM/ESD image to your disk.
Type `bcdboot c:\windows /s q:` to create the boot files on the EFI disk.
Reboot
#### Fixing WinRE (use only when WinRE doesn't work)
Copy install.esd/install.wim from your usb in your pc.
Use [7zip](https://www.7-zip.org) or WinRar to open the WIM/ESD image. Open the folder X as the edition number selected before. Go to `\Windows\System32\Recovery`. Extract the two files and copy them to path `C:\Windows\System32\Recovery`.
Then apply the two command below to active WinRE.
`reagentc /setreimage /path C:\windows\system32\recovery`
`reagentc /enable`
To see the WinRE status then type `reagentc /info`
Reboot
