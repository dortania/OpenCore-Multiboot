# Multiboot with OpenCore

Hello there! Looks like you're trying to get macOS and `$(OtherOS)` installed on your system, but you also do not want to mess `$(OtherOS)` or macOS in the process. You will be guided here through a multitude of steps to achieve just that while keeping the OS setups as unaffected as possible.

## Firmware Types

Multibooting is greatly affected by the type of firmware you're running. This guide will cover the known 2 types which are:

- UEFI
- Legacy/CSM/BIOS

The differences are minimal once you're using OpenCore but also it might be a bit difficult for the latter. Other than that, this guide will cover these elements:

1. What is multibooting and how does it work?
2. Partitioning vs Disk separating
2. UEFI
   1. One disk for all OSes
   2. Different disks for different OSes
3. Legacy
   1. One disk for all OSes
   2. Different disks for different OSes
5. Troubleshooting
6. Tips and Tricks

### Disclaimer

We are not responsible for bricked devices, dead hard drives, thermonuclear war, or you getting fired because you got a kernel panic and didn't save your work. You are responsible for reading everything carefully before you do anything. Do your research and ask for support if you have any questions or issues before trying random things on the internet because "it's the internet". If you do, YOU are choosing to follow random things on the internet, and if YOU point the finger at us for messing up your device, WE will laugh at you. 

Now that we got that out of our way let's get going, and good luck.
