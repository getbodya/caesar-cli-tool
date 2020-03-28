
## Start app

1. git clone https://github.com/getbodya/caesar-cli-tool.git
2. cd caesar-cli-tool
3. npm install
4. cd task1
5. node index.js --action encode --shift 7


## Commands 
    node index.js --action encode --shift 7
    node index.js -a encode -s 7

    node index.js --action decode --shift 7
    node index.js -a decode -s 7

    node index.js -a encode -s 7 -i ./input.txt -o ./output.txt
    node index.js -a decode -s 7 -i ./input.txt -o ./output.txt

    node index.js -a encode -s 7 -o ./output.txt
    node index.js -a decode -s 7 -o ./output.txt

    node index.js -a encode -s 7 -i ./input.txt
    node index.js -a decode -s 7 -i ./input.txt
