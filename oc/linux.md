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
* Check your distribution ¯\\\_(ツ)_/¯

![](../images/linux-md/blessoverride.png)

## Chainloading the kernel (must support EFISTUB)

Some linux kernels are built with EFISTUB enabled in their configuration, which makes them loadable by the UEFI firmware like a regular UEFI application (neat, right?), we can use this feature with OpenCore and let it load the kernel as an EFI application while also passing 