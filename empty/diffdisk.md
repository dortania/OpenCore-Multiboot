# Dualbooting on different disks

I will not get too long in this part as it's the EASIEST one:

* Install macOS on one of the disks
* Install $(SECONDOS) on the other disk
* Install/copy OpenCore on the macOS disk EFI
* You're good to go

Things to keep in mind:

- Windows can be a bitch when it comes to multidisk setups (it freaks out when it sees a lot of EFI partitions on a lot of disks)
- If the above happens, disable/disconnect all the other disks and install windows as you would normally do
  - For laptops this can be a pain, you can install windows manually by following [this guide from TenForums](https://www.tenforums.com/tutorials/84331-apply-windows-image-using-dism-instead-clean-install.html)
  - Make sure you choose the proper disk
  - If your Windows install image was made in Mac or Linux using FAT32 filesystem, you will have had to split the install.wim file into two .swm files. This means that the command given in the above guide for applying the install.wim image will not work. When the guide tells you to run `dism /Apply-Image` et cetera, instead run `dism /Apply-Image /imagefile:C:\Sources\install.swm /swmfile:C:\Sources\install2.swm /index:1 /ApplyDir:E:\` replacing the drive letters and index with appropriate values.
  - Alternatively, use exFAT on your install.wim and have OpenCore load the ExFatDxe driver.
- You can still refer to other situations if you want to dualboot more than one OS on one of the disks.
- Make sure that OpenCore is on the same disk of macOS for easier troubleshooting and cleaner setup
