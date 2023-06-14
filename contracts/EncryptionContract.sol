// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract EncryptionContract {
    // Declare private immutable variable to store secret key
    bytes32 private immutable secretKey;

    // Constructor to initialize the secret key
    constructor(bytes32 _secretKey) {
        secretKey = _secretKey;
    }

    function pickCharsFromString(
        string memory str
    ) public view returns (bytes32[5] memory) {
        bytes memory strBytes = bytes(str);
        bytes32[5] memory pickedChars;

        for (uint256 i = 0; i < strBytes.length && i < 5; i++) {
            pickedChars[i] = encryptLetter(
                string(abi.encodePacked(strBytes[i]))
            );
        }

        return pickedChars;
    }

    function encryptLetter(
        string memory _letter
    ) public view returns (bytes32) {
        // Encrypt letter using the secret key as a salt
        return keccak256(abi.encodePacked(_letter, secretKey));
    }

    function encryptWord(
        string memory _word
    ) public view returns (bytes32[5] memory) {
        // Encrypt letter using the secret key as a salt
        return pickCharsFromString(_word);
    }

    function isCorrect(
        bytes32[5] memory _encryptedWordArray,
        string[5] memory _wordArray
    ) public view returns (bool) {
        for (uint256 i = 0; i < _wordArray.length; i++) {
            bytes32 encryptedLetter = encryptLetter(_wordArray[i]);
            if (_encryptedWordArray[i] != encryptedLetter) {
                return false;
            }
        }
        return true;
    }
}
