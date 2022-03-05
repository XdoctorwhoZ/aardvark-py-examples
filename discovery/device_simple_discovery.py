'''
This script provides an example of how to use aardvark-py to discover connected devices
'''
__author__ = "XdoctorwhoZ (Xavier Rodriguez)"

# Imports
from aardvark_py import *

# Run a simple discovery
MAX_NUMBER_OF_DEVICE_TO_DETECT=8
aa_devices = aa_find_devices(MAX_NUMBER_OF_DEVICE_TO_DETECT)

# Run an extended discovery
aa_devices_extended = aa_find_devices_ext(MAX_NUMBER_OF_DEVICE_TO_DETECT, MAX_NUMBER_OF_DEVICE_TO_DETECT)

# First parameter is the number of connected devices
number_of_connected_aardvark = aa_devices[0]
print(f"{number_of_connected_aardvark} aardvark found")
if number_of_connected_aardvark == 0:
    sys.exit(0)

# The array contains the port ID of each device
for port_aardvark in aa_devices[1]:
    print(f"+++++++++++++++++++++++++")
    print(f"++ device on port {port_aardvark}")
    print(f"    - serial id {aa_devices_extended[2][port_aardvark]}")

    # Open the device
    aardvark_handle = aa_open(port_aardvark)
    print(f"    - open connection aardvark")
    if aardvark_handle < 0:
        print(f"\t\t- error opening aardvark '{aa_status_string(aardvark_handle)}'")
        sys.exit(1)

    # Get versions
    status, version = aa_version(aardvark_handle)
    print(f"    - versions")
    print(f"            * software     : {hex(version.software     )}")
    print(f"            * firmware     : {hex(version.firmware     )}")
    print(f"            * hardware     : {hex(version.hardware     )}")
    print(f"            * sw_req_by_fw : {hex(version.sw_req_by_fw )}")
    print(f"            * fw_req_by_sw : {hex(version.fw_req_by_sw )}")
    print(f"            * api_req_by_sw: {hex(version.api_req_by_sw)}")

    # Get features
    features = aa_features(aardvark_handle)
    print(f"    - features {features}")

    if features & AA_FEATURE_SPI:
        print("            * SPI ok")
    else:
        print("            * SPI not available")

    if features & AA_FEATURE_I2C:
        print("            * I2C ok")
    else:
        print("            * I2C not available")

    if features & AA_FEATURE_GPIO:
        print("            * GPIO ok")
    else:
        print("            * GPIO not available")

    if features & AA_FEATURE_I2C_MONITOR:
        print("            * I2C MONITOR ok")
    else:
        print("            * I2C MONITOR not available")

    # Close 
    print(f"    - close connection")
    aa_close(aardvark_handle)


