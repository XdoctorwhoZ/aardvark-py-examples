'''
This script provides an example of how to use aardvark-py to run an aardvark as I2C slave
'''
__author__ = "XdoctorwhoZ (Xavier Rodriguez)"

# Imports
from aardvark_py import *

# -----------------------------------------------------------------------------

# HERE DEFINE THE SERIAL ID OF THE AARDVARK YOU WANT TO USE
AARDVARK_SERIAL_ID=2237170206

# -----------------

bitrate_khz = 100

# -----------------

slave_addr = 10

# -----------------

flags = AA_I2C_NO_FLAGS
# AA_I2C_10_BIT_ADDR | AA_I2C_COMBINED_FMT | AA_I2C_NO_STOP | AA_I2C_SIZED_READ | AA_I2C_SIZED_READ_EXTRA1

# -----------------

data_out = array('B', [1, 2, 3, 4])

# -----------------------------------------------------------------------------

###############################################################################
# DEVICE DISCOVERY

# Run a simple discovery
MAX_NUMBER_OF_DEVICE_TO_DETECT=8
aa_devices_extended = aa_find_devices_ext(MAX_NUMBER_OF_DEVICE_TO_DETECT, MAX_NUMBER_OF_DEVICE_TO_DETECT)

#
number_of_connected_aardvark = aa_devices_extended[0]
if number_of_connected_aardvark == 0:
    print("NO aardvark found")
    sys.exit(0)

# Get the index of the port of the aardvark we want to control
index_of_the_port=0
try:
    index_of_the_port = aa_devices_extended[2].index(AARDVARK_SERIAL_ID)
except ValueError:
    print(f"Aadvark with serial id {AARDVARK_SERIAL_ID} not connected")
    sys.exit(0)

# take the port of the first device found
port_aardvark = aa_devices_extended[1][index_of_the_port]

#
aardvark_handle = aa_open(port_aardvark)
print(f"open aardvark on port {port_aardvark}")
if aardvark_handle < 0:
    print(f"error opening aardvark '{aa_status_string(aardvark_handle)}'")
    sys.exit(1)


###############################################################################
# I2C MASTER

print(f"configure I2C")
print(f"- bitrate {bitrate_khz}khz")

#
aa_i2c_bitrate(aardvark_handle, bitrate_khz)

#
status, data_in = aa_i2c_read(aardvark_handle, slave_addr, flags, 4)
if status < 0:
    print(f"fail reading data ({aa_status_string(status)})")
else:
    print(f"data {data_in} received on i2c")


###############################################################################
# CLEANUP
aa_close(aardvark_handle)
