# Aardvark-py Examples

Examples to understand how to use the python module **aardvark-py** to drive aardvark adapters

## 0) Setup Files and Pinout

```bash
pip install aardvark-py
```

Most informations for installation and pinout are in the online manual here : [Aardvark I2C SPI Host Adapter User Manual](https://www.totalphase.com/support/articles/200468316-Aardvark-I2C-SPI-Host-Adapter-User-Manual)

### Linux

On Linux be careful you need to configure udev rules: chapter *3.3.1 UDEV*

In this repository, you can find the file [99-totalphase.rules](0_files/99-totalphase.rules).

```bash
# cd path/to/aardvark-py-examples
sudo cp  0_files/99-totalphase.rules  /etc/udev/rules.d/99-totalphase.rules
sudo chmod 644 /etc/udev/rules.d/99-totalphase.rules
```

## 1) Devices Discovery

This example provides an example to list connected devices, print their serial numbers and features.

## 2) SPI Master/Slave


## 3) I2C Master/Slave

