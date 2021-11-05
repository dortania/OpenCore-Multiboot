# Windows

You have one disk with Windows installed and want to install macOS on the same disk.

## Precautions

- BACKUP YOUR DATA
- If possible, disconnect or disable any other disk/drive in your system, as it may interfere with the install procedure
- The drive isn't corrupted or have bad sectors
- Stable power input
- If you cannot add custom entries in your BIOS boot menu this method may not work for you, read all steps before proceeding

## Situation this applies for

- You have a disk with Windows installed
- You have enough free space on the disk to support a macOS installation

---

Verify the partition style of the disk is GPT. If you do not know, see: [Checking your disk partition scheme](https://dortania.github.io/OpenCore-Multiboot/exist/data.html#checking-your-disk-partitioning-scheme) and if it is MBR, see: [Converting MBR to GPT](https://dortania.github.io/OpenCore-Multiboot/exist/data.html#converting-mbr-to-gpt).

## Resize existing EFI partition

If your EFI partition is bigger than the default of 100MB (at least 200MB to be safe) which is created by the Windows installation, then you can skip to the next section.

![Windows before partitions](../images/ex-os/before_windows_disk_mgmt.png)

Use a bootable partition manager to resize the EFI partition. To do this you must first move all the partitions in front of it so make sure to backup your data. 

![Gparted original partitions](../images/ex-os/before_gparted.png)

Moving a partition cannot be done while running Windows, so you will need a **bootable** partition manager (free alternative is GParted). This is a potentially destructive operation. 

![Gparted warning](../images/ex-os/move_partition_warning_gparted.png)

Backup your data and proceed at your own risk. If there is not enough free space to move existing partitions to the right, first shrink the existing Windows one. 

![Gparted move Windows right](../images/ex-os/move_windows_right_gparted.png)

Once there is enough free space after the EFI partition, extend it to at least 200MB. 

![Gparted resize EFI](../images/ex-os/resize_efi_gparted.png)

## Resize Windows partition 

If you already have free unallocated space to create the macOS partition, you can skip to the next section. 

Use a partition manager shrink to your Windows partition so that there is enough free space to create a partition that will hold your macOS installation. 

![Gparted shrink Windows](../images/ex-os/shrink_windows_gparted.png)

## Create new exFAT partition

Create a new exFAT **or FAT32** volume on the free unallocated space (GParted does not support exFAT natively until v1.2.0). 

![Gparted create FAT32](../images/ex-os/create_fat32_gparted.png)

If you have other drives you intend to use between both operating systems, now is a good time to format them too. Don't forget to unplug the other drives before proceeding with the macOS installation. 

If you moved partitions around, verify your Windows installation is still functioning before proceeding. If you cannot boot into Windows, restore your backup and try again using a reputable partition manager.

![Windows after partitions](../images/ex-os/after_windows_disk_mgmt.png)

For the next section, you will need your OpenCore USB ready to boot into the macOS installation. 

## Reformat partition to APFS using Disk Utility

It is advised to use [LauncherOption=Full](https://dortania.github.io/OpenCore-Post-Install/multiboot/bootstrap.html) or to create a custom BIOS entry for the USB so that during the installation process when the system reboots, it will not automatically boot into Windows. When system reboot does happen during the installation process, even if OpenCore loads, the picker's default option might be Windows so watch it carefully and be ready to press the arrow keys depending on how short the timeout is set in your config.plist: `Misc > Boot > Timeout`.

![Mac install screen](../images/ex-os/mac_disk_util.png)

Once you reach the main installation menu click Disk Utility and select the target partition. Click Erase in the top button bar to format the partition to APFS (or whatever you prefer).

![Mac disk utility](../images/ex-os/mac_erase_button.png)

![Mac format partition](../images/ex-os/mac_erase_partition.png)

## Continue with macOS installation

![Mac continue install](../images/ex-os/mac_install.png)

Once installation is finished remove OpenCore USB and the system will boot into Windows.

## Mount EFI partition from Windows

Using a partition manager or diskpart, mount the EFI partition. [Using MiniTool Partition Wizard](https://www.partitionwizard.com/free-partition-manager.html), this is as simple as assigning a letter to the drive. It will then be visible to Windows in File Explorer.

![Windows mount efi 1](../images/ex-os/mount_efi_windows_a.png)

![Windows mount efi 2](../images/ex-os/mount_efi_windows_b.png)

Plug your OpenCore USB in and copy contents of Open Core USB EFI into the mounted EFI partition. In File Explorer, you can see the EFI partition but will not be able to access it. An easy workaround is to just use [Explorer++](https://explorerplusplus.com/download). Right click and select Run as administrator to read and write to the EFI folder.

![Windows explorer++](../images/ex-os/explorer++_windows.png)

Backup your existing EFI folder before continuing. Copy the BOOT and OC folder from inside the USB EFI into the partition's EFI folder from within Explorer++. When prompted, overwrite the BOOTx64.efi that exists with the one from OpenCore.

Open command prompt with Administrator priveleges and run:

```
bcdedit /set {bootmgr} path \EFI\OC\OpenCore.efi 
```

After this is complete, do a reboot of the system.  If the OpenCore picker shows, then you can skip the next section.

## Manually add OpenCore boot menu option

Using your BIOS setup menu, add a custom boot entry for OpenCore. How to do this varies, so Google how to do it per your specific model if you're not sure.

![Bios add entry 1](../images/ex-os/bios_add_entry_a.png)

![Bios add entry 2](../images/ex-os/bios_add_entry_b.png)

Add a boot entry to the path `EFI/OC/OpenCore.efi`. Verify that this entry has priority over Windows in the boot order.

![Bios add entry 3](../images/ex-os/bios_add_entry_c.png)

## Change startup disk

When OpenCore loads, your default boot entry may be Windows, so be ready with the arrow keys. Once you are into macOS, you can change the default picker option using Startup Disk in System Preferences.

![Mac startup disk a](../images/ex-os/startup_disk_mac.png)

![Mac startup disk b](../images/ex-os/startup_disk_selection_mac.png)

If your default option is Windows, then you can change it to macOS or vice versa. 

When restoring a full disk backup of a dual boot Windows/Mac, the system may boot into Windows; if so, run bcdedit command above to restore OpenCore picker again. As a final note, don't forget to delete OpenCore USB boot entry in BIOS.