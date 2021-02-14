# Dualbooting with Windows

* MBR based Windows installs **ARE NOT SUPPORTED** by OpenCore at this time, you will need to convert it to GPT.

#### Solution 1: If Windows is not picked up automagically, add the following to your config.plist

```
Misc -> BlessOverride -> \EFI\Microsoft\Boot\bootmgfw.efi
```

* **Note**: As of OpenCore 0.5.9, this no longer needs to be specified. OpenCore should pick up on this entry automatically

![](../images/win-md/blessoverride.png)

#### Solution 2: To make Windows get picked up, boot to recovery mode from within Windows

- **make sure you boot windows from OpenCore**
  - after loading OpenCore, press space > OpenShell (make sure you have it in Tools and in the config)
  - run `map -r -b`
  - look for your EFI drive (usually it's in the first lines, watch out if you're a multidisk user, there might be many EFIs)
  - run `FSX:\EFI\Microsoft\Boot\bootmgfw.efi` where X is the number of the EFI partition with windows bootloader
- **make sure that RequestBootVarRouting is set to True**
- open CMD/PS with admin rights
- run `shutdown /r /o /t 0`
  - this will reboot your windows system immediately to Advanced Boot Menu menu
- select Troubleshoot > Command Prompt
- it will reboot to WinRE and you'll get to the Command Prompt
- once in there
  - run `diskpart`
  - once loaded, send `list vol`
  - look for your Windows drive letter
    - it may not have the `C` lettering, but make sure you check the size and other indicatives that points to it
    - if you cannot, just write down the mounted letters with (NTFS) filesystem then explore them one by one to check if it's your windows install
  - look for your EFI partition
    - it should say `hidden` or `system` and is usually 100-200MB (some OEM installs make it bigger as much as 500MB)
      - send `sel vol X` where X is the EFI partition number
    - if you're in doubt
      - send `list disk`
      - identify your windows disk
      - send `sel disk X` where X is the disk where Windows is installed on
      - send `list part`
      - check the partitions, usually the EFI should have 100-200MB (some OEM installs make it bigger as much as 500MB)
      - send `sel part X` where X is the EFI partition number
    - either way, send `assign letter=S`
      - S can be anything other than A/B/Y/X and any letter already assigned in the listing before it
  - send `exit` to close diskpart and return to the command prompt
  - run `bcdboot X:\Windows /s S: /f UEFI`
    - [bcdboot](https://docs.microsoft.com/en-us/windows-hardware/manufacture/desktop/bcdboot-command-line-options-techref-di) is a utility that installs Windows bootloader in either your EFI or root system partition (of choice)
    - `X:\Windows` is a path to the Windows installation folder, where X is the mount letter of the Windows partition
    - `/s S:` is the destination disk that will receive the bootloader, in our case, it's the EFI partition
    - `/f UEFI` to specify the type the bootloader should be (UEFI Bootloader)
    - This will copy a new bootmgfw.efi file as well as add a new NVRAM Boot entry which hopefully will now appear on OpenCore boot menu.
- if everything ran without any errors, type `exit` and it should return you back to the Advanced Boot Menu (or reboot)
- reboot and check if Windows boot entry has been added