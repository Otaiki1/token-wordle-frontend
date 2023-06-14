// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RewardItem is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("RewardItem", "TW") {}

    function awardItem(
        address player,
        string memory _tokenURI
    ) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    //redeem Item function that checks if the item exists , then burns it , and returns a bool
    function redeemItem(uint256 itemId) public returns (bool) {
        require(_exists(itemId), "Item does not exist");
        require(ownerOf(itemId) == msg.sender, "Item does not belong to you");

        _burn(itemId);

        return true;
    }
}
