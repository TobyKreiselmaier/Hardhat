const { expect } = require('chai');

let Token, token, owner, addr1, addr2;

describe('Token contract', () => {

    beforeEach(async () => {
        Token = await ethers.getContractFactory('Token');
        token = await Token.deploy();
        [owner, addr1, addr2, _] = await ethers.getSigners();
    })

    describe('Deployment', () => {
        it('Sets the correct owner', async () => {
            expect(await token.owner()).to.equal(owner.address)
        })
        it('The total supply is assigned to the owner', async () => {
            const ownerBalance = await token.balanceOf(owner.address)
            expect(await token.totalSupply()).to.equal(ownerBalance)
        })
    })

    describe('Transactions', () => {
        it('Should transfer tokens between accounts', async () => {
            await token.transfer(addr1.address, 50);
            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50)
            await token.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await token.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50)
        })
        it('Should fail if sender does not have enough balance', async () => {
            const initialBalanceOwner = await token.balanceOf(owner.address)

            await expect(token.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith('Balance too low');
            expect(await token.balanceOf(owner.address)).to.equal(initialBalanceOwner)
        })
        it('Should update balances after transfers', async () => {
            const initialBalanceOwner = await token.balanceOf(owner.address)
            await token.transfer(addr1.address, 100)
            await token.transfer(addr2.address, 100)
            expect(await token.balanceOf(owner.address)).to.equal(initialBalanceOwner - 200)
            expect(await token.balanceOf(addr1.address)).to.equal(100)
            expect(await token.balanceOf(addr2.address)).to.equal(100)
        })
    })
})
