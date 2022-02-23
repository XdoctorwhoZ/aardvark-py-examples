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

# print(f"configure SPI")
# print(f"- bitrate {bitrate_khz}khz")
# if polarity == AA_SPI_POL_RISING_FALLING:
#     print(f"- polarity falling")
# else:
#     print(f"- polarity rising")

# if phase == AA_SPI_PHASE_SAMPLE_SETUP:
#     print(f"- phase SAMPLE_SETUP")
# else:
#     print(f"- phase SETUP_SAMPLE")

# if bitorder == AA_SPI_BITORDER_MSB:
#     print(f"- phase MSB")
# else:
#     print(f"- phase LSB")


# #
# aa_spi_bitrate(aardvark_handle, bitrate_khz)
# aa_spi_configure(aardvark_handle, polarity, phase, bitorder)

# # Enable as slave
# aa_spi_slave_disable(aardvark_handle)

# #
# aa_spi_master_ss_polarity(aardvark_handle, ss_polarity)

# #
# status, data_in = aa_spi_write (aardvark_handle, array('B', [1, 2, 3, 4]), array('B'))
# if status < 0:
#     print(f"fail sending data ({aa_status_string(status)})")
# else:
#     print("data [1, 2, 3, 4] sent on spi")

###############################################################################
# CLEANUP
aa_close(aardvark_handle)
