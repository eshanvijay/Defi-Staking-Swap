// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenSwap is Ownable, ReentrancyGuard {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public exchangeRate = 2; // 1 tokenA = 2 tokenB
    uint256 public constant RATE_DECIMALS = 100; // For precision

    mapping(address => uint256) public swapHistory;

    event SwapExecuted(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        uint256 timestamp
    );

    constructor(address _tokenA, address _tokenB, address initialOwner) Ownable(initialOwner) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function swapAToB(uint256 amountA) external nonReentrant {
        require(amountA > 0, "Amount must be greater than 0");
        require(tokenA.balanceOf(msg.sender) >= amountA, "Insufficient balance");

        uint256 amountB = (amountA * exchangeRate * RATE_DECIMALS) / (100 * RATE_DECIMALS);
        require(tokenB.balanceOf(address(this)) >= amountB, "Insufficient liquidity");

        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transfer(msg.sender, amountB);

        swapHistory[msg.sender] += amountA;

        emit SwapExecuted(msg.sender, address(tokenA), address(tokenB), amountA, amountB, block.timestamp);
    }

    function swapBToA(uint256 amountB) external nonReentrant {
        require(amountB > 0, "Amount must be greater than 0");
        require(tokenB.balanceOf(msg.sender) >= amountB, "Insufficient balance");

        uint256 amountA = (amountB * 100 * RATE_DECIMALS) / (exchangeRate * RATE_DECIMALS);
        require(tokenA.balanceOf(address(this)) >= amountA, "Insufficient liquidity");

        tokenB.transferFrom(msg.sender, address(this), amountB);
        tokenA.transfer(msg.sender, amountA);

        swapHistory[msg.sender] += amountB;

        emit SwapExecuted(msg.sender, address(tokenB), address(tokenA), amountB, amountA, block.timestamp);
    }

    function setExchangeRate(uint256 _rate) external onlyOwner {
        require(_rate > 0, "Rate must be greater than 0");
        exchangeRate = _rate;
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external onlyOwner {
        require(amountA > 0 && amountB > 0, "Amounts must be greater than 0");
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);
    }

    function getSwapAmount(uint256 amountIn, bool isAToB) external view returns (uint256) {
        if (isAToB) {
            return (amountIn * exchangeRate * RATE_DECIMALS) / (100 * RATE_DECIMALS);
        } else {
            return (amountIn * 100 * RATE_DECIMALS) / (exchangeRate * RATE_DECIMALS);
        }
    }
}

