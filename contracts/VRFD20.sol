// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "./EncryptionContract.sol";

contract VRFD20 is VRFConsumerBaseV2, EncryptionContract {
    uint256 private constant ROLL_IN_PROGRESS = 42;

    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;

    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    // address vrfCoordinator;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    // For a list of available gas lanes on each network,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    bytes32 s_keyHash;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 40,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 callbackGasLimit = 40000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 1 random value in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords = 1;

    // map rollers to requestIds
    mapping(uint256 => address) private s_rollers;
    // map vrf results to rollers
    mapping(address => uint256) private s_results;
    //map users address to request time
    mapping(address => uint256) private s_lastRequestTime;

    event DiceRolled(uint256 indexed requestId, address indexed roller);
    event DiceLanded(uint256 indexed requestId, uint256 indexed result);

    /**
     * @notice Constructor inherits VRFConsumerBaseV2
     *
     * @dev NETWORK: specify upon deployment
     *
     * @param subscriptionId subscription id that this consumer contract can use
     */
    constructor(
        uint64 subscriptionId,
        bytes32 _secretKey,
        address vrfCoordinator,
        bytes32 _keyHash
    ) VRFConsumerBaseV2(vrfCoordinator) EncryptionContract(_secretKey) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        s_keyHash = _keyHash;
    }

    /**
     * @notice Requests randomness
     * @dev Warning: if the VRF response is delayed, avoid calling requestRandomness repeatedly
     * as that would give miners/VRF operators latitude about which VRF response arrives first.
     * @dev You must review your implementation details with extreme care.
     *
     * @param roller address of the roller
     */
    function rollDice(address roller) public returns (uint256 requestId) {
        require(
            block.timestamp >= s_lastRequestTime[roller] + 1 days,
            "Can only request once per day"
        );
        require(s_results[roller] == 0, "Already rolled");
        // Will revert if subscription is not set and funded.
        requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );

        s_rollers[requestId] = roller;
        s_results[roller] = ROLL_IN_PROGRESS;
        s_lastRequestTime[roller] = block.timestamp;

        emit DiceRolled(requestId, roller);
    }

    /**
     * @notice Callback function used by VRF Coordinator to return the random number to this contract.
     *
     * @dev Some action on the contract state should be taken here, like storing the result.
     * @dev WARNING: take care to avoid having multiple VRF requests in flight if their order of arrival would result
     * in contract states with different outcomes. Otherwise miners or the VRF operator would could take advantage
     * by controlling the order.
     * @dev The VRF Coordinator will only send this function verified responses, and the parent VRFConsumerBaseV2
     * contract ensures that this method only receives randomness from the designated VRFCoordinator.
     *
     * @param requestId uint256
     * @param randomWords  uint256[] The random result returned by the oracle.
     */
    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        uint256 d20Value = (randomWords[0] % 261) + 1;
        s_results[s_rollers[requestId]] = d20Value;
        emit DiceLanded(requestId, d20Value);
    }

    /**
     * @notice Get the word assigned to the player once the address has rolled
     * @param player address
     * @return word as a string
     */
    function word(address player) public view returns (bytes32[5] memory) {
        require(s_results[player] != 0, "Dice not rolled");
        require(s_results[player] != ROLL_IN_PROGRESS, "Roll in progress");
        string memory userWord = getWord(s_results[player]);

        return encryptWord(userWord);
    }

    /**
     * @notice Get the word name from the id
     * @param id uint256
     * @return word name string
     */
    function getWord(uint256 id) private pure returns (string memory) {
        string[261] memory words = [
            "there",
            "their",
            "about",
            "would",
            "these",
            "other",
            "words",
            "could",
            "write",
            "first",
            "water",
            "after",
            "where",
            "right",
            "think",
            "three",
            "years",
            "place",
            "sound",
            "great",
            "again",
            "still",
            "every",
            "small",
            "found",
            "those",
            "never",
            "under",
            "might",
            "while",
            "house",
            "world",
            "below",
            "asked",
            "going",
            "large",
            "until",
            "along",
            "shall",
            "being",
            "often",
            "earth",
            "began",
            "since",
            "study",
            "night",
            "light",
            "above",
            "paper",
            "parts",
            "young",
            "story",
            "point",
            "times",
            "heard",
            "whole",
            "white",
            "given",
            "means",
            "music",
            "miles",
            "thing",
            "today",
            "later",
            "using",
            "money",
            "lines",
            "order",
            "group",
            "among",
            "learn",
            "known",
            "space",
            "table",
            "early",
            "trees",
            "short",
            "hands",
            "state",
            "black",
            "shown",
            "stood",
            "front",
            "voice",
            "kinds",
            "makes",
            "comes",
            "close",
            "power",
            "lived",
            "vowel",
            "taken",
            "built",
            "heart",
            "ready",
            "quite",
            "class",
            "bring",
            "round",
            "horse",
            "shows",
            "piece",
            "green",
            "stand",
            "birds",
            "start",
            "river",
            "tried",
            "least",
            "field",
            "whose",
            "girls",
            "leave",
            "added",
            "color",
            "third",
            "hours",
            "moved",
            "plant",
            "doing",
            "names",
            "forms",
            "heavy",
            "ideas",
            "cried",
            "check",
            "floor",
            "begin",
            "woman",
            "alone",
            "plane",
            "spell",
            "watch",
            "carry",
            "wrote",
            "clear",
            "named",
            "books",
            "child",
            "glass",
            "human",
            "takes",
            "party",
            "build",
            "seems",
            "blood",
            "sides",
            "seven",
            "mouth",
            "solve",
            "north",
            "value",
            "death",
            "maybe",
            "happy",
            "tells",
            "gives",
            "looks",
            "shape",
            "lives",
            "steps",
            "areas",
            "sense",
            "speak",
            "force",
            "ocean",
            "speed",
            "women",
            "metal",
            "south",
            "grass",
            "scale",
            "cells",
            "lower",
            "sleep",
            "wrong",
            "pages",
            "ships",
            "needs",
            "rocks",
            "eight",
            "major",
            "level",
            "total",
            "ahead",
            "reach",
            "stars",
            "store",
            "sight",
            "terms",
            "catch",
            "works",
            "board",
            "cover",
            "songs",
            "equal",
            "stone",
            "waves",
            "guess",
            "dance",
            "spoke",
            "break",
            "cause",
            "radio",
            "weeks",
            "lands",
            "basic",
            "liked",
            "trade",
            "fresh",
            "final",
            "fight",
            "meant",
            "drive",
            "spent",
            "local",
            "waxes",
            "knows",
            "train",
            "bread",
            "homes",
            "teeth",
            "coast",
            "thick",
            "brown",
            "clean",
            "quiet",
            "sugar",
            "facts",
            "steel",
            "forth",
            "rules",
            "notes",
            "units",
            "peace",
            "month",
            "verbs",
            "seeds",
            "helps",
            "sharp",
            "visit",
            "woods",
            "chief",
            "walls",
            "cross",
            "wings",
            "grown",
            "cases",
            "foods",
            "crops",
            "fruit",
            "stick",
            "wants",
            "stage",
            "sheep",
            "nouns",
            "plain",
            "drink",
            "bones",
            "apart",
            "turns"
        ];
        return words[id - 1];
    }
}
