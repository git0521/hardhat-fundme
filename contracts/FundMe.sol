// SPDX-License-Identifier: MIT
// 1. Pragma
pragma solidity ^0.8.7;

error FundMe_NotOwner();

contract FundMe {
    address private immutable i_owner;
    address[] private s_funders;
    mapping(address => uint256) private s_addressToAmountFund;

    modifier onlyOwner() {
        if (msg.sender != i_owner) revert FundMe_NotOwner();
        _;
    }

    constructor() {
        i_owner = msg.sender;
    }

    function fund() public payable {
        require(msg.value >= 0.01 ether, "you need to more eth");
        s_addressToAmountFund[msg.sender] += msg.value;
        s_funders.push(msg.sender);
    }

    function withdrwa() public onlyOwner {
        for (uint256 index = 0; index < s_funders.length; index++) {
            address funder = s_funders[index];
            s_addressToAmountFund[funder] = 0;
        }
        s_funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getBalance(address funder) public view returns (uint256) {
        return s_addressToAmountFund[funder];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }
}
