const fs = require('fs');
const {pipeline} = require('stream');
const {isNil} = require('lodash')
const parseArgs = require('minimist');

const {CaesarTransform} = require('./encryptor')

const {action, shift, input, output} = parseArgs(
    process.argv.slice(2), 
    {
        alias: {
            a: 'action',
            s: 'shift',
            i: 'input',
            o: 'output'
        }
    }
);

if(!shift || !action) {
    process.stderr.write(`Параметр(-ы) ${ !shift ? '--shift': '' } ${ !action ? '--action': '' } не указан(-ы)`);
    process.exit(1)
}

if((!isNil(input) && !fs.existsSync(input)) || (!isNil(output) && !fs.existsSync(output))) {
    process.stderr.write(`Файл(-ы) ${ !fs.existsSync(input) ? input : '' } ${ !fs.existsSync(output) ? output: '' } не существует(-ют)`);
    process.exit(1)
}

const readStream = input ? fs.createReadStream(input, {encoding: 'utf-8'}) : process.stdin;

const caesarStream = new CaesarTransform(action, shift);

const writeStream = output ? fs.createWriteStream(output, {flags: 'a', encoding: 'utf-8'}) : process.stdout;

function errHandler(err) {
    if (err) {
        process.exit(1)
    }
}

pipeline(
    readStream,
    caesarStream,
    writeStream,
    errHandler
)
