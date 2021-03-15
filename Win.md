# Installation of Windows 10
**Work in Progess**, you can help contibute via [PRs](https://github.com/dortania/OpenCore-Multiboot/pulls). This guide referes to Windows 10, however it's still valid for Windows 8/8.1. (for Windows 7 or older, follow the legacy section (duetpkg configurations only))
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
- [Install Windows 10 automatically](#Automatically)
- [Install Windows 10 manually](#Manually) (only when there are problems or when you want to control the procedure)
### Automatically
Follow the procedure and let Windows make the party!
### Manually
This guide it's planned for a full installation. If you want to do a dualboot you can create the partition as you want. To open a terminal window use the key combo SHIFT-F10

Find and remember your path to install.esd/install.wim file. I suppose that `<path>` it will be its path.

#### Creating partitions
You have to choose:
- Create the partitions [automatically](#Automatically-partitions)
- Create the partition [manually](#Manually-partitions)

##### Automatically partitions
NOTE: This process can be followed only on blank disks.

Follow the procedure since appears this section:

[photo]

Select "Custom", remove all partitions and finally click on "Create". Windows will ask you a confirm, then you did it!

##### Manually partitions
You can customize the commands (SHIFT+F10 to open Command Prompt) to your disk layout. If you felt more confortful, you could create all your partition (specify the size) on the diskmanagement screen (see [automatically](#Automatically-partitions)) and then installing manually (only blank disks).

Type `diskpart`

Type `list disk` and remember the disk number where you want to install Windows

Type `sel disk 0` where 0 is the number of your disk

Type `clean` to format the whole disk (optional)

Type `convert gpt` to convert the disk to GPT (it would give an error if it was already converted, no problem) (risk of lose your data!!!)

Type `create part efi size 200` to create the EFI partition (default size 200 MB), then type `format quick fs fat32` to format it and `assign letter q` to assign our EFI partition.

Type `create part msr size 128` to create the MSR partition (default size 128 MB, shouldn't be changed; used by some strange Windows things).

Type `create part primary size 128000` to create the main partition (default size [totalspace]-1 GB. I remember that the size value should be in MB), then type `format quick fs ntfs` to format it and `assign letter c` to assign our drive.

After that we set up the recovery enviroment: type `create part primary` (default size: the rest of the disk), `set id de94bba4-06d1-4d40-a16a-bfd50179d6ac` to change the type of partition (primary-->WINRE, more infos [here](https://en.wikipedia.org/wiki/GUID_Partition_Table#Partition_type_GUIDs)),`gpt attributes 0x8000000000000001` to hide it,`format quick fs ntfs` to format it.

Type `exit` to quit diskpart.

#### Install Windows

Type `dism /get-wiminfo /wimfile:<path>` to get the number of your edition.

Type `dism /apply-image /imagefile:<path> /index:4 /applydir:c:\` to flash the WIM/ESD image to your disk where 4 is changed as you edition number.

Type `bcdboot c:\windows` to create the boot files on the EFI disk (Caution! if OpenCore was present, Windows cannot inject your EFI).

Reboot and hope everything work.

### Legacy Windows Installation (broken)

<details>
<summary>Legacy Users (NOTE: at the moment I don't find a how to create the mbr bootloader...)</summary>

#### Manually Partition Creation

Type `diskpart`

Type `list disk` and remember the disk number where you want to install Windows

Type `sel disk W` where W is the number of your disk

Type `clean` to clear the whole disk

Type `create part primary size 128000` to create the main partition (default size [totalspace]-1 GB. I remember that the size value should be in MB), then type `format quick fs ntfs` to format it and `assign letter c` to assign our drive.

After that we set up the recovery enviroment: type `create part primary`, `set id 27` to change the type of the partition (primary-->WINRE),`format quick fs ntfs` to format it.

#### Legacy Installation

Type `dism /get-wiminfo /wimfile:<path>` to get the number of your edition.

Type `dism /apply-image /imagefile:<path> /index:4 /applydir:c:\` to flash the WIM/ESD image to your disk where 4 is you edition number.

**TODO**: I have no idea how to create the boot files in the MBR... If you know this, you can help contibute via [PRs](https://github.com/dortania/OpenCore-Multiboot/pulls).

</details>
