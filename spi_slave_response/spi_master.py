'''
This script provides an example of how to use aardvark-py to run an aardvark as spi slave
'''
__author__ = "XdoctorwhoZ (Xavier Rodriguez)"

# Imports
from aardvark_py import *

# -----------------------------------------------------------------------------

# HERE DEFINE THE SERIAL ID OF THE AARDVARK YOU WANT TO USE
AARDVARK_SERIAL_ID=2237170206

# -----------------

bitrate_khz = 4000

# -----------------

polarity = AA_SPI_POL_RISING_FALLING
# polarity = AA_SPI_POL_FALLING_RISING

# -----------------

phase = AA_SPI_PHASE_SAMPLE_SETUP
# phase = AA_SPI_PHASE_SETUP_SAMPLE

# -----------------

bitorder = AA_SPI_BITORDER_MSB
# bitorder = AA_SPI_BITORDER_LSB

# -----------------
# Change the output polarity on the SS line.

ss_polarity = AA_SPI_SS_ACTIVE_LOW
# ss_polarity = AA_SPI_SS_ACTIVE_HIGH

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
# SPI MASTER

print(f"configure SPI")
print(f"- bitrate {bitrate_khz}khz")
if polarity == AA_SPI_POL_RISING_FALLING:
    print(f"- polarity falling")
else:
    print(f"- polarity rising")

if phase == AA_SPI_PHASE_SAMPLE_SETUP:
    print(f"- phase SAMPLE_SETUP")
else:
    print(f"- phase SETUP_SAMPLE")

if bitorder == AA_SPI_BITORDER_MSB:
    print(f"- phase MSB")
else:
    print(f"- phase LSB")


#
aa_spi_bitrate(aardvark_handle, bitrate_khz)
aa_spi_configure(aardvark_handle, polarity, phase, bitorder)

# Enable as slave
aa_spi_slave_disable(aardvark_handle)

#
aa_spi_master_ss_polarity(aardvark_handle, ss_polarity)

# To read on spi from this fonction you need to:
# - write N bytes on data_out (N is the number of byte you want to receive)
# - Set the max size of the input buffer (set a big value and the python function will adjust the buffer for you)

NUMBER_OF_BYTE_TO_READ = 4

status, data_in = aa_spi_write(aardvark_handle, array('B', bytearray(NUMBER_OF_BYTE_TO_READ)),  9999 )
if status < 0:
    print(f"fail sending data ({aa_status_string(status)})")

print(data_in)

###############################################################################
# CLEANUP
aa_close(aardvark_handle)
