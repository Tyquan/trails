const Block = require("./block");

class BlockChain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }

    getBlocks() {
        return this.chain;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

    replaceChain (newBlocks){
        if (this.isValidChain(newBlocks) && newBlocks.length > this.block.length) {
            console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
            this.block = newBlocks;
        } else {
            console.log('Received blockchain invalid');
        }
    };

}

module.exports = BlockChain;