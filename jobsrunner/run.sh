#!/bin/bash
stop.sh
rm botjobs_job.py
wget 192.168.56.1:8888/botjobs/get_job.php?id_job=$1 -Obotjobs_job.py
hdebut=`date -u`
python botjobs_job.py 2&> logs.txt 
status=$? # ou ${PIPESTATUS[0]}
hfin=`date -u`
python postresult.py -d \"${hdebut}\" -e \"${hfin}\" -s $status 

