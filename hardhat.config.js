/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle');

const INFURA_URL = 'https://goerli.infura.io/v3/c2f69015a46346a3a1beb31b48cdac2b'
const PRIVATE_KEY = '96371452a0febcd710247607113c2805f7bd9256f166cec0219d6f6721f83a6b'

module.exports = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};
