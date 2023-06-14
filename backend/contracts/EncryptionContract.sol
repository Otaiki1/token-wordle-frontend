// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract EncryptionContract {
    // Declare private immutable variable to store secret key
    bytes32 private immutable secretKey;

    // Constructor to initialize the secret key
    constructor(bytes32 _secretKey) {
        secretKey = _secretKey;
    }

    function encryptWord(string memory _word) public view returns (bytes32) {
        // Encrypt word using the secret key as a salt
        return keccak256(abi.encodePacked(_word, secretKey));
    }

    function isCorrect(
        bytes32 _encryptedWord,
        string memory _word
    ) public view returns (bool) {
        bytes32 codedWord = encryptWord(_word);
        return (codedWord == _encryptedWord);
    }
}
