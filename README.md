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
   3. Disclaimer
2. Partitioning vs Disk separating
3. UEFI
   1. Multibooting on empty drives
      1. One disk for all OSes
      2. Different disks for different OSes
   2. Multibooting on filled drives
      1. One disk for all OSes
      2. Different disks for different OSes
4. Opencore Configuration
   2. For Linux booting
   3. For Legacy/CSM/BIOS booting
5. Troubleshooting
6. Windows installation

### [Disclaimer](../Intro/disc.md)
