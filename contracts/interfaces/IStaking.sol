// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IStaking {
    function s_stakingToken() external view returns (IERC20);

    function s_balances(address account) external view returns (uint256);

    function s_totalSupply() external view returns (uint256);

    function stake(uint256 amount) external;

    function withdrawStaked(uint256 amount) external;

    function getStaked(address account) external view returns (uint256);
}
