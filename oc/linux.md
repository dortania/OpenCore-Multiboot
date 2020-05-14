# Dualbooting with Linux

**WORK IN PROGRESS**

If Linux is not picked up automagically, add the following to your config.plist:

```
Misc -> BlessOverride -> \EFI\arch\grubx64.efi
```

Other common Linux bootloader paths:

* `\EFI\arch\grubx64.efi`
* `\EFI\ubuntu\grubx64.efi`

![](/images/linux-md/blessoverride.png)
