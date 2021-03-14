# Quick Guide no BS

Ok, if you're quite experienced with how partitioning and booting multiple OSes then here are what you need to look for:

- ***BACKUP YOUR DATA***, this can turn easily to a destructive operation.
- macOS requires:
  - EFI partition (ESP) of 200MB minumum
  - GPT formatted disk
  - UEFI system (or DUET for legacy systems, comes with OpenCorePkg)
- OpenCore should preferably be copied to the EFI of the same disk
  - Make sure you run the `BootInstall.command` **if you're on a legacy system**
  - the EFI partition **preferably** needs to be at the **beginning of the disk** for multibooting with Windows (read OpenCore's configuration.pdf)
- It doesn't matter if you already have anything on that drive:
  - You can convert it to GPT (if it's MBR) and create an EFI partition with flag hex `EF00` (using gdisk for example or gparted and choosing type `efi`<sup>(Will show up once the partition if formatted, if not already.)</sup>)
  - Resize the existing EFI to **200MB** (windows usually limits it on a new install to 100MB, some linux distros have lower or higher sizes, but usually less than 200MB)
    - Recommendation: Make sure it's a bit bigger like 210MB or something to count of the difference in byte/bit reading on macOS/Linux/Windows. (multiples of 1024 instead of 1000 and vice-versa)
  - Windows 10 1709 and later have a utility called `mbr2gpt` to convert the Windows boot disk to UEFI
    - Do this to dualboot Windows 10 and macOS on the same drive no matter what the boot mode is
      - In case of legacy system, you'll lose windows access until you install OpenCore and boot windows from it
      - UEFI systems will boot directly when the conversion happens as long as you configure your computer's firmware setup (BIOS setup) to UEFI mode
    - This utility may say that it cannot convert the setup for whatever reason, you can do that manually by:
      - Preparing a windows 10 USB installer
      - Using a linux distribution to:
        - convert the disk to gpt (gdisk)
        - create resize/create a new partition with hex `EF00` or type `efi` (gparted)
          - Make sure it's 200MB for macOS formatting
          - You can create another partition of macOS along the way
          - The EFI can preferably be at the beginning of the disk (OpenCore requirement)
      - Boot windows installer:
        - assign a letter to the EFI partition and Windows partition through `diskpart` (google diskpart assign letter)
        - run `bcdboot C:\Windows /s S: /f UEFI` (with `C:` and `S:` being the partition letter you assigned to Windows and EFI partition respectfully, read bcdboot manual)
      - Boot windows and hope nothing broke
  - If you're using linux it's the same steps as earlier (just 200MB EFI partition and somewhere to put macOS on)
- Make sure the disk doesn't have any S.M.A.R.T errors
- DO NOT have multiple EFIs on the same disk, you **MUST** only have **ONE** EFI partition per disk
- The OS Install order **does not matter at all**, however windows can be a bit of a bitch, so installing it after macOS can be challenging, linux doesn't pose such problems. [If you happen to stumble on the sad windows crap](./troubleshooting.md#Windows)

Now that you have all these information, good luck with the rest. However if you're not sure, follow then the long way that has more explanations and details on how to properly do it.
