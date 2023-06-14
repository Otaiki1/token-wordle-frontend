// SPDX-License-Identifier: MIT
// This is a Solidity smart contract for a simple game where players can play and win rewards
// The contract uses encryption to verify the data provided by the players

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IStaking.sol";
import "./EncryptionContract.sol";

contract GameContract is EncryptionContract {
    error Error__NotPlayed();
    error Error__AlreadyPlayed();

    IERC20 public immutable s_stakingToken;
    uint256 public immutable REWARD_AMOUNT;
    uint256 public immutable REWARD_PERCENTAGE;
    IStaking public immutable s_stakingContract;

    event GameStarted(
        address player,
        uint256 startTime,
        bytes32[5] codedWordArray
    );
    event PlayedGame(
        address indexed player,
        bool indexed isWon,
        uint256 indexed _amountWon
    );

    constructor(
        uint256 _rewardPercent,
        uint256 _rewardAmount,
        address _stakingToken,
        address _stakingContract,
        bytes32 _secretKey
    ) EncryptionContract(_secretKey) {
        REWARD_PERCENTAGE = _rewardPercent;
        REWARD_AMOUNT = _rewardAmount;
        s_stakingToken = IERC20(_stakingToken);
        s_stakingContract = IStaking(_stakingContract);
    }

    //mapping that stores winners
    address[] private winners;
    //mapping that stores users encryptedword
    mapping(address => bytes32[5]) private userToCodedWordArray;
    //mapping that maps users time of play
    mapping(address => uint256) timeOfPlay;

    function startGame(bytes32[5] memory _codedWordArray) public {
        //update user's word
        userToCodedWordArray[msg.sender] = _codedWordArray;
        //update user time
        timeOfPlay[msg.sender] = block.timestamp;

        emit GameStarted(msg.sender, block.timestamp, _codedWordArray);
    }

    function playedGame(
        bytes32[5] memory _encryptedWordArray,
        string[5] memory _wordArray
    ) public returns (bool) {
        if (block.timestamp == 0) {
            revert Error__NotPlayed();
        }
        if (block.timestamp >= timeOfPlay[msg.sender] + 1 days) {
            revert Error__AlreadyPlayed();
        }
        uint userStake = s_stakingContract.getStaked(msg.sender);
        uint _payAmount = (REWARD_PERCENTAGE * userStake) / 100;
        s_stakingToken.transfer(msg.sender, _payAmount);

        bool isWon = isCorrect(_encryptedWordArray, _wordArray);
        //check if won
        if (isWon) {
            winners.push(msg.sender);
            s_stakingToken.transfer(msg.sender, REWARD_AMOUNT);
        }
        emit PlayedGame(msg.sender, isWon, _payAmount + REWARD_AMOUNT);
    }

    function fetchWinners() public view returns (address[] memory) {
        return winners;
    }

    function fetchPlayerInfo()
        public
        view
        returns (bytes32[5] memory, uint256)
    {
        return (userToCodedWordArray[msg.sender], timeOfPlay[msg.sender]);
    }
}
