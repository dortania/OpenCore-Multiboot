# Dualbooting with Windows

**WORK IN PROGRESS**

* MBR based Windows installs **ARE NOT SUPPORTED**, you will need to convert it to GPT.

If Windows is not picked up automagically, add the following to your config.plist:

```
Misc -> BlessOverride -> \EFI\Microsoft\Boot\bootmgfw.efi
```

![](/images/win-md/blessoverride.png)
