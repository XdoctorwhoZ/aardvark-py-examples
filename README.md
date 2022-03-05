# Aardvark-py Examples

Examples to understand how to use the python module **aardvark-py** to drive aardvark adapters

## Setup Files and Pinout

```bash
pip install aardvark-py
```

Most informations for installation and pinout are in the online manual here : [Aardvark I2C SPI Host Adapter User Manual](https://www.totalphase.com/support/articles/200468316-Aardvark-I2C-SPI-Host-Adapter-User-Manual)

### Linux

On Linux be careful you need to configure udev rules: chapter *3.3.1 UDEV*

In this repository, you can find the file [99-totalphase.rules](files/99-totalphase.rules).

```bash
# cd path/to/aardvark-py-examples
sudo cp  files/99-totalphase.rules  /etc/udev/rules.d/99-totalphase.rules
sudo chmod 644 /etc/udev/rules.d/99-totalphase.rules
```

## Devices Discovery

This example provides an example to list connected devices, print their serial numbers and features.

To find connected devices use those functions:

- aa_find_devices
- aa_find_devices_ext

Before using the aardvark you need to open it and get an *handle*:

- aa_open
- aa_close

To get version and features of the probe:

- aa_version
- aa_features

Versions are hex numbers for example 0x0300. You need to understand them as 2 digits version 0x0300 => 03.00

```bash
python3 discovery/device_simple_discovery.py
```

## Master/Slave SPI/I2C examples

In this example, you can connect 2 aardvark together pin to pin and perform the following communications.

- i2c_master_read:
- i2c_master_write
- spi_master_write
- spi_slave_response

Those examples provides a slave and a master application. Start the slave first.

```bash
# First run the spi slave
python3 XXXX/slave.py
```

```bash
# Then trigger an spi write
python3 XXXX/master.py
```

## Power pin

5V pins on aardvark are not connected by default.

- aa_target_power
