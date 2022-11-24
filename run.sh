npx tsc && \
node index.js | xxd -r -ps | protoscope > out.txt
cat out.txt
