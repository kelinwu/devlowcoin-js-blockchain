// Import stylesheets
import './style.css';

const SHA256 = require('crypto-js/SHA256')

class Block {
	constructor(index, timestamp, data, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculatieHash();
	}
	
	calculatieHash() {
		return SHA256(this.index).toString();
	}
	
}

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()]
	}
	
	createGenesisBlock() {
		return new Block(0, "10/01/2019","genesis block", "0")
	}
	
	getLatestBlock() {
		return this.chain(this.chain.length -1);
	}
	
	addBlock(newBlock) {
		newBlock.previousHash= this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculatieHash()
		this.chain.push(newBlock);
	}

  isValid() {
    for(let i=1; this.chain.length;i++) {
      const curBlock = this.chain[i];
      const preBlock = this.chain[i-1];
      
      if(curBlock.previousHash !== preBlock.hash) {
        return false;
      }

      if(curBlock.hash !== curBlock.calculatieHash()) return false

      return true;
    }
  }
}


let develowCoin = new Blockchain();
develowCoin.addBlock(new Block(1,"10/30/2019", { amount: 10 }))
develowCoin.addBlock(new Block(2,"10/31/2019", { amount: 200 }))

//validation
let isValid_test_1 = develowCoin.isValid();

// tamper chain than validating
develowCoin.chain[1].data = { amount: 30 };
let isValid_test_2 = develowCoin.isValid();

//temper the hash than validating
develowCoin.chain[2].hash = develowCoin.chain[2].calculatieHash();
let isValid_test_3 = develowCoin.isValid();

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = JSON.stringify(develowCoin, null, 4);
appDiv.innerHTML = JSON.stringify(isValid_test_1, null, 4);
appDiv.innerHTML = JSON.stringify(isValid_test_2, null, 4);
appDiv.innerHTML = JSON.stringify(isValid_test_3, null, 4);