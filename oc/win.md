# Dualbooting with Windows

**WORK IN PROGRESS**

* MBR based Windows installs **ARE NOT SUPPORTED**, you will need to convert it to GPT.

If Windows is not picked up automagically, add the following to your config.plist:

```
Misc -> BlessOverride -> \EFI\Microsoft\Boot\bootmgfw.efi
```

* **Note**: As of OpenCore 0.5.9, this no longer needs to be specified. OpenCore should pick up on this entry automatically

![](/images/win-md/blessoverride.png)
