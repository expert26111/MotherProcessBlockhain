const SHA256 = require('crypto-js/sha256');
const express = require("express");
const bodyParser = require('body-parser');
var WebSocket = require("ws");
//var cp = require('child_process');
var childProcess = require('child_process');
var exec = require('child-process-promise').exec;
/**
 * Created by Yoana on 12/2/2017.
 */


class Block
{
            constructor(index,timestamp,data,previousHash = '')
            {
                   this.index = index;
                   this.timestamp = timestamp;
                   this.data = data;
                   this.previousHash = previousHash;
                   this.hash = this._calculateHash();//calculate our hash
                    //nonce value a random value that has not anything to do
                    this.nonce = 0;
            }

            //take the properties of the constructor and run them through a hash
            _calculateHash()
            {
                 return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
            }

            _mineBlock(difficulty)
            {
                    while(this.hash.substring(0,difficulty)!== Array(difficulty + 1).join("0"))
                    {
                       this.nonce++;
                       this.hash  = this._calculateHash();
                    }
                    console.log("Blocked mine : "+this.hash);
            }

}

class Blockchain
{
    constructor()
    {
        //first block is genesis block and is added manually
        this.chain=[this._createGenesisBlock()];//an array of blocks
        this.difficulty = 3;
    }

    _createGenesisBlock()
    {
       return new Block(0,"01/01/2017","Genesis block","0");
    }

    _getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }


    _pushToBlockChain(newBlock)
    {
         this.chain.push(newBlock);
    }

    _addBlock(newBlock)
    {

                newBlock.previousHash = this._getLatestBlock().hash;
                newBlock.hash = newBlock._calculateHash();
                newBlock._mineBlock(this.difficulty);//so our hash startswith 000
                var child = childProcess.fork('C:\\Users\\Yoana\\WebstormProjects\\ChildProcess\\mining1.js');

                       child.on('message', function (newBlock)
                       {
                               // Receive results from child process
                               console.log('received: ', newBlock);
                              // callback(newBlock);
                               // array.push(newBlock);
                             //  console.log('LATER: ', newBlock);
                       });

                        child.on('exit', function (newBlock)
                        {
                            // Receive results from child process
                            console.log('exit: ', newBlock);
                            callback(newBlock);
                            // array.push(newBlock);
                            console.log('exit LATER: ', newBlock);
                        });

                        child.send(newBlock);

    }



    _isChainValid()
    {
            for(let i = 1; i < this.chain.length;i++)
            {
                    const currentBlock = this.chain[i];
                    const previousBlock = this.chain[i - 1];


                    if (currentBlock.hash !== currentBlock._calculateHash())
                    {
                        return false;
                    }
                    if (currentBlock.previousHash !== previousBlock.hash)
                    {
                        return false;
                    }
            }
            return true;
    }
}

    let savjeeCoin = new Blockchain();
    console.log('Mining block 1...');
    savjeeCoin._addBlock(new Block(1,"10/10/2017", {amount: 4}));
    console.log('Mining block 2...');
    savjeeCoin._addBlock(new Block(2,"10/10/2017", {amount: 10}));



    // savjeeCoin.chain[1]._mineBlock(3);
    // console.log('Is valid '+savjeeCoin._isChainValid());
    //
    //  console.log(JSON.stringify(savjeeCoin,null,4));
    //
    // savjeeCoin.chain[1].data = {amount: 100}; //lets make ourselves rich
    // savjeeCoin.chain[1].hash = savjeeCoin.chain[1]._calculateHash();
    // // the relationship with the previous block is broken
    // console.log('Is valid '+savjeeCoin._isChainValid());