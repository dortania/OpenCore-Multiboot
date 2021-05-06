# Multiboot with OpenCore

Hello there! Looks like you're trying to get macOS and `[OtherOS]` installed on your system, but you also do not want to mess `[OtherOS]` or macOS in the process. You will be guided here through a multitude of steps to achieve just that while keeping the OS setups as unaffected as possible.

## Firmware Types

Multibooting is greatly affected by the type of firmware you're running. This guide will cover the known 2 types which are:

- UEFI
- Legacy/CSM/BIOS

The differences are minimal once you're using OpenCore but also it might be a bit difficult for the latter. Other than that, this guide will cover these elements:

1. Introduction to multi-booting
   1. What is it?
   2. UEFI? Legacy? CSM? What?
2. UEFI
   1. Multibooting on empty drives
      1. One disk for all OSes
      2. Different disks for different OSes
   2. Multibooting on filled drives
      1. One disk for all OSes
      2. Different disks for different OSes
3. Opencore Configuration
   1. For Linux booting
   2. For Legacy/CSM/BIOS booting
4. Troubleshooting
5. Windows installation

## Disclaimer

We are not responsible for bricked devices, dead hard drives, thermonuclear war, or you getting fired because you got a kernel panic and didn't save your work. You are responsible for reading everything carefully before you do anything. Do your research and ask for support if you have any questions or issues before trying random things on the internet because "it's the internet". If you do, YOU are choosing to follow random things on the internet, and if YOU point the finger at us for messing up your device, WE will laugh at you.

So please backup your data and have a plan B in case things break (unlikely, but it happens more than you know).
