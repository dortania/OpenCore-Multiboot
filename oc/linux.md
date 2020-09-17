# Dualbooting with Linux

**WORK IN PROGRESS**

## Chainloading a EFI Bootloader (GRUB2, Systems-Boot)

If Linux is not picked up automagically, add the following to your config.plist:

```
Misc -> BlessOverride -> \EFI\arch\grubx64.efi
```

Some common Linux bootloader paths:

* `\EFI\arch\grubx64.efi`
* `\EFI\ubuntu\grubx64.efi`
* `\EFI\systemd\systemd\systemd-bootx64.efi`
* Check your distribution

![](../images/linux-md/blessoverride.png)

## Chainloading the kernel (must support EFISTUB)

