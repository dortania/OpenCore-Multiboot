# On a filled OS related disk (Windows/Linux)
This guide has been split into 2 parts, Windows and Linux.

# Windows

We assume that you already have Windows installed and your MacOs USB is ready to be booted. We would first shrink our windows partition to free some space for MacOs, format the unallocated space to Fat32 and then go in the Disk Utility to format the Fat32 to APFS and then install MacOs on it. 

With that said let's see how to do it. 

**In Windows** 
* Open Disk Manager. 
* Select the disk on which Windows is installed. 
* You'll see a disk with description (EFI SYSTEM PARTITION).
   * The size of this partition is usually between 100MB and 500MB (any more and it's a waste of storage space)
   * In case the size of it is <200MB, expand the partition to 200MB (or a bit more)
   * In case the size of it is >500MB, shrink the partition to 500MB (or 200MB) because it's a waste of space
   * In case you have multiple partitions with EF00, that means your partitioning is bad, you only really need just 1 EFI partition in the whole system (if not per disk,      there is no real need for multiple EFI partitions, makes no sense)
   * Note: In case you need to expand and the space you freed from the main drive ends up the opposite side of EFI (Which it will probably do) you would have to use          external tools such as Partion Wizard, Easeus Partition Master etc. to give that space to the EFI, Windows does not have a builtin tool for this.
* With that done, Select your main storage Partition, right click it and select Shrink volume. It will show you how much you can shrink, Select as much as you want for     MacOs (If the shrinkable space is very low then free some space in your drive).
* This will create some unallocated space in your drive in which we shall install MacOs but first we need to Format it to Fat32. Right click the unallocated space and click new simple volume, Hit next until you see the option to select the file system, select Fat32 in the drop down and let it make the partion. 

With that we are done with Windows. 

# Linux 
Work in progress. 

# In MacOs Installer
* Open Disk Utility, select the Fat32 partition we made and hit Erase. 
* Now it will show as unallocated space so format it as APFS. When its done formatting head back to the Main Page and install MacOs. 
