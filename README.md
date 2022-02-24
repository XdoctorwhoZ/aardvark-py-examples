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

```bash
python3 1_discovery/device_simple_discovery.py
# Example output
#
# 2 aardvark found
# +++++++++++++++++++++++++
# ++ device on port 0
#     - serial id 2237170206
#     - open connection aardvark
#     - versions
#             * software     : 1320
#             * firmware     : 819
#             * hardware     : 768
#             * sw_req_by_fw : 768
#             * fw_req_by_sw : 818
#             * api_req_by_sw: 1280
#     - features 27
#             * SPI ok
#             * I2C ok
#             * GPIO ok
#             * I2C MONITOR ok
#     - close connection
# +++++++++++++++++++++++++
# ++ device on port 1
#     ...
```

## 2) SPI Master/Slave

In this example, you can connect 2 aardvark together and perform a spi communication.

```bash
# First run the spi slave
python3 2_spi/spi_slave.py
```

```bash
# Then trigger an spi write
python3 2_spi/spi_master.py
```

## 3) I2C Master/Slave

