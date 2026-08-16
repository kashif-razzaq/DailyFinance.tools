killall node || true
sleep 2
PORT=3005 npm run dev > next_logs.txt 2>&1 &
