# Installing OpenCore on a legacy system

At the moment there is no official support for MBR/Legacy based Windows installs, there are plans though unlikely to see anything anytime soon: [Add MBR loading tool to OpenCore](https://github.com/acidanthera/bugtracker/issues/912)

Currently, there are 2 workarounds:

* Convert Windows into a GPT based drive(this means you will have to boot with OpenCore each time)
* Chainload rEFInd which does have support

For the latter:

1. [Setup rEFInd](https://www.rodsbooks.com/refind/installing.html)
2. Add BlessOverride path for rEFInd(`\EFI\refind\refind_x64.efi`)
3. Boot OpenCore
4. Chain-load rEFInd
5. Select Windows

![](../images/duet-md/blessoverride.png)
