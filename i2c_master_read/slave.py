'''
This script provides an example of how to use aardvark-py to run an aardvark as I2C slave
'''
__author__ = "XdoctorwhoZ (Xavier Rodriguez)"

# Imports
from audioop import add
from os import stat
from aardvark_py import *

# -----------------------------------------------------------------------------

# HERE DEFINE THE SERIAL ID OF THE AARDVARK YOU WANT TO USE
AARDVARK_SERIAL_ID=2238487174

# -----------------

bitrate_khz = 100

# -----------------

slave_addr = 10

# -----------------

flags = AA_I2C_NO_FLAGS
# AA_I2C_10_BIT_ADDR | AA_I2C_COMBINED_FMT | AA_I2C_NO_STOP | AA_I2C_SIZED_READ | AA_I2C_SIZED_READ_EXTRA1

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
# I2C SLAVE

print(f"configure I2C")
print(f"- bitrate {bitrate_khz}khz")


#
aa_i2c_bitrate(aardvark_handle, bitrate_khz)

#
aa_i2c_slave_enable(aardvark_handle, slave_addr, 8, 8)

#
aa_i2c_slave_set_response(aardvark_handle, array('B', [42, 41, 40, 39]))

try:
    while True:
        print(f"wait for max 8 bytes of i2c data...")
        event = aa_async_poll(aardvark_handle, -1)

        if event & AA_ASYNC_I2C_READ:
            print("- event I2C read")
            status, addr, data_in = aa_i2c_slave_read(aardvark_handle, 99999)
            if status < 0:
                print(aa_status_string(status))
            print(f"from addr {addr} data recieved {data_in}")


        if event & AA_ASYNC_I2C_WRITE:
            print("- event I2C write")

            # Get number of bytes written to master
            num_bytes = aa_i2c_slave_write_stats(aardvark_handle)

            if (num_bytes < 0):
                print("error: %s" % aa_status_string(num_bytes))

            # Print status information to the screen
            print(f"Number of bytes written to master: {num_bytes}")

except KeyboardInterrupt:
    ###############################################################################
    # CLEANUP
    aa_close(aardvark_handle)
