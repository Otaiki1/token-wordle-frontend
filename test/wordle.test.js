const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const PERCENT = 1;
const REWARD_AMOUNT = 1;
const gameSecretKey = ethers.utils.formatBytes32String("gamesecretkey"); //won secret key
const word = "aword";

const encryptWord = (word, secretKey) => {
  const encodedWord = ethers.utils.toUtf8Bytes(word);
  const encodedSecretKey = ethers.utils.arrayify(secretKey);
  const saltedWord = ethers.utils.concat([encodedWord, encodedSecretKey]);
  const encryptedWord = ethers.utils.keccak256(saltedWord);
  return encryptedWord;
};

const codedWord = encryptWord(word, gameSecretKey);

describe("Full Wordle Test", function () {
  //deploy staking token
  //deploy our staking contract and ensure it takes an instance of the staked token
  //mint and transfer a bulk of the staking token to the Staking cntract

  async function deployAllContracts() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const StakingToken = await ethers.getContractFactory("TLCToken");
    const stakingToken = await StakingToken.deploy();
    console.log(
      "STAKING TOKEN HAS BEEN DEPLOYED TO ________",
      stakingToken.address
    );

    const StakingContract = await ethers.getContractFactory("Staking");
    const stakingContract = await StakingContract.deploy(stakingToken.address);
    console.log(
      "STAKING CONTRACT HAS BEEN DEPLOYED TO ________",
      stakingContract.address
    );

    const GameContract = await ethers.getContractFactory("GameContract");
    const gameContract = await GameContract.deploy(
      PERCENT,
      REWARD_AMOUNT,
      stakingToken.address,
      stakingContract.address,
      gameSecretKey
    );
    console.log(
      "GAME CONTRACT HAS BEEN DEPLOYED TO ________",
      gameContract.address
    );

    //we also want to give the game contract 95% of the token
    const send95PercentTo = await stakingToken.send95PercentTo(
      gameContract.address
    );
    console.log(
      "SUCCESSFULLY SENT 95 PERCENT , TXN HASH IS _____",
      send95PercentTo.hash
    );

    return { gameContract, stakingContract, stakingToken, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("All deployments should work the right way ", async function () {
      const { gameContract, stakingToken } = await loadFixture(
        deployAllContracts
      );

      const gameContractBalance = await stakingToken.balanceOf(
        gameContract.address
      );
      expect(gameContractBalance).to.eq(95000000);
      console.log("the gameContract has 95% of total token supply");
    });
  });

  describe("Staking Functionalities", async () => {
    it("should ensure staking contract has all state variables initialized properly", async () => {
      const { stakingContract, stakingToken, owner, otherAccount } =
        await loadFixture(deployAllContracts);

      expect(await stakingContract.s_totalSupply()).to.eq(0);
      console.log("Staking contract has 0 balance");
      expect(await stakingContract.getStaked(owner.address)).to.eq(0);
      console.log("users balances are initialized properly");
    });

    it("should allow user stake ", async () => {
      const { stakingContract, stakingToken, owner, otherAccount } =
        await loadFixture(deployAllContracts);

      const ownerBalanceBeforeStaking = await stakingToken.balanceOf(
        owner.address
      );
      //   console.log(ownerBalanceBeforeStaking);
      //approve allowance
      await stakingToken.approve(stakingContract.address, 10);
      await stakingContract.stake(10);
      const ownerBalanceAfterStaking = await stakingToken.balanceOf(
        owner.address
      );
      expect(ownerBalanceAfterStaking.toNumber()).to.be.lt(
        ownerBalanceBeforeStaking.toNumber()
      );
      console.log("user balance changed successfully");

      expect(await stakingContract.getStaked(owner.address)).to.eq(10);
      console.log("user balance updated in state variable");

      expect(await stakingContract.s_totalSupply()).to.eq(10);
      console.log("total supply updated successfully");

      //   console.log(ownerBalanceAfterStaking);
    });

    it("should allow user withdraw stake", async () => {
      const { stakingContract, stakingToken, owner, otherAccount } =
        await loadFixture(deployAllContracts);

      const ownerBalanceBeforeStaking = await stakingToken.balanceOf(
        owner.address
      );
      //approve allowance
      await stakingToken.approve(stakingContract.address, 10);
      await stakingContract.stake(10);
      // withdraw staked
      await stakingContract.withdrawStaked(10);

      const ownerBalanceAfterWithdrawing = await stakingToken.balanceOf(
        owner.address
      );

      expect(ownerBalanceAfterWithdrawing.toNumber()).to.eq(
        ownerBalanceBeforeStaking.toNumber()
      );
      console.log("Withdraw Successful");

      expect(await stakingContract.getStaked(owner.address)).to.eq(0);
      console.log("user balance updated in state variable");

      expect(await stakingContract.s_totalSupply()).to.eq(0);
      console.log("total supply updated successfully");

      //   console.log(ownerBalanceAfterStaking);
    });
    it("Should emit the right events for all stake cases", async () => {
      const { stakingContract, stakingToken, owner, otherAccount } =
        await loadFixture(deployAllContracts);

      //approve allowance
      await stakingToken.approve(stakingContract.address, 10);
      expect(await stakingContract.stake(10))
        .to.emit(stakingContract, "Staked")
        .withArgs(owner.address, 10);
      // withdraw staked
      expect(await stakingContract.withdrawStaked(10))
        .to.emit(stakingContract, "StakeWithdrawn")
        .withArgs(owner.address, 10);
    });
  });

  describe("GameContract", async () => {
    it("should ensure all state variables are deployed correctly", async () => {
      const { gameContract } = await loadFixture(deployAllContracts);
      const winnersArray = await gameContract.fetchWinners();
      expect(winnersArray.length).to.eq(0);
      expect(await gameContract.REWARD_AMOUNT()).to.eq(REWARD_AMOUNT);
      expect(await gameContract.REWARD_PERCENTAGE()).to.eq(PERCENT);
    });

    it("should update state variables when user starts a game", async () => {
      const { gameContract } = await loadFixture(deployAllContracts);

      await gameContract.startGame(codedWord);

      const [userCodedWord, userTimeOfPlay] =
        await gameContract.fetchPlayerInfo();
      expect(userCodedWord).to.eq(codedWord);
      console.log(userTimeOfPlay);
    });

    it("should return true if user wins ", async () => {
      const { gameContract } = await loadFixture(deployAllContracts);

      await gameContract.startGame(codedWord);
      const tx = await gameContract.playedGame(codedWord, word);
      const txReceipt = await tx.wait(1);
      const isWon = txReceipt.events[txReceipt.events.length - 1].args.isWon;
      expect(isWon).to.eq(true);
      const winnersArray = await gameContract.fetchWinners();
      expect(winnersArray.length).to.eq(1);
    });
    it("should return false if user fails ", async () => {
      const { gameContract } = await loadFixture(deployAllContracts);

      await gameContract.startGame(codedWord);
      const tx = await gameContract.playedGame(codedWord, "bword");
      const txReceipt = await tx.wait(1);
      const isWon = txReceipt.events[txReceipt.events.length - 1].args.isWon;
      expect(isWon).to.eq(false);
      const winnersArray = await gameContract.fetchWinners();
      expect(winnersArray.length).to.eq(0);
    });
  });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployAllContracts
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployAllContracts
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployAllContracts
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployAllContracts
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
