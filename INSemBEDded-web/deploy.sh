#!/bin/bash
PI_IP=${PI_IP:=192.168.0.16}
scp -r ~/insa-bed-msp430/INSemBEDded-web pi@$PI_IP:~/
exit 0