INSA BED Wireless Sensor Netework for MSP-430
========================

TI MSP-430 board code
------------------

*Prerequisites:* use a Raspberry Pi, with a user "pi" and IP address 192.168.0.14, and a connected MSP-430 attached to the USB port. You should change these values in the Makefile, to fit your need.

1. Put `INSemBEDded` folder into the Raspberry Pi, in `~/INSemBEDded/`.
2. On the host machine, `cd INSemBEDded/ez430-applications/insa-bed/`
3. Run: `make TARGET` to download the code to the Raspberry Pi, cross-compile it and download it to the MSP-430. For instance:
   * `make deploy_rx`
   * `make deploy_tx`

Set `PI_IP`with your RPI @IP.

All user code is in `INSemBEDdded/ez430-applications/demo/insa-bed/`, everything else are drivers and utilities.
