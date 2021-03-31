pragma solidity >=0.6.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "./IUniswapV2Router02.sol";
import "./KeeperCompatibleInterface.sol";

// import "@openzeppelin/contracts/math/SafeMath.sol";

//import "@openzeppelin/contracts/access/Ownable.sol"; //https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract ZkTrader is KeeperCompatibleInterface {
    AggregatorV3Interface internal priceFeed;

    address internal constant UNISWAP_ROUTER_ADDRESS =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    IUniswapV2Router02 public uniswapRouter;
    address private multiDaiKovan = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;
    int256 lastPrice = 0;
    mapping(address => uint256) public etherBalances;
    mapping(address => uint256) public daiBalances;
    mapping(uint256 => order) public orders;
    mapping(address => address[]) public followers;
    IERC20 public daiToken;
    uint256 idSeed = 0;
    uint256 lastOrderId = 0;
    // uint256[] public openOrdersId;
    mapping(uint256 => order) openOrders;
    event SetPurpose(address sender, string purpose);
    event EtherDeposit(address sender, uint256 amount);
    event WithdrawEther(address sender, uint256 amount);
    event WithdrawDai(address sender, uint256 amount);

    struct order {
        uint256 id;
        address owner;
        bytes32 hashPrice;
    }
    string public purpose = "Building Unstoppable Apps";

    constructor(address token) public {
        uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);

        daiToken = IERC20(token);
        priceFeed = AggregatorV3Interface(
            0x9326BFA02ADD2366b30bacB125260Af641031331
        );
    }

    function getLatestPrice() public view returns (int256) {
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }

    function ethDeposit() public payable {
        etherBalances[msg.sender] = etherBalances[msg.sender] + msg.value;
        emit EtherDeposit(msg.sender, msg.value);
    }

    function withdrawEther() public {
        msg.sender.transfer(etherBalances[msg.sender]);
        emit WithdrawEther(msg.sender, etherBalances[msg.sender]);
        etherBalances[msg.sender] = 0;
    }

    function withdrawDai() public {
        daiToken.transfer(msg.sender, daiBalances[msg.sender]);
        emit WithdrawDai(msg.sender, daiBalances[msg.sender]);

        daiBalances[msg.sender] = 0;
    }

    function openOrder(bytes32 hashP) public {
        uint256 id = genId();
        lastOrderId = lastOrderId + 1;
        order storage o = orders[lastOrderId];
        o.id = lastOrderId;
        o.owner = msg.sender;
        o.hashPrice = hashP;
        //convertEthToDai(1);
    }

    function follow(address add) public {
        //TODO check redundant followers
        require(msg.sender!=add);
        followers[add].push(msg.sender);
    }

    function getFollowers(address add) public view returns (address[] memory) {
        return followers[add];
    }

    function hash(int256 _text) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_text));
    }

    function convertEthToDai(uint256 amount) public returns (uint256[] memory) {
        // uint daiOveral= address(this).balance *
        uint256 deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!
        return
            uniswapRouter.swapExactETHForTokens{value: amount}(
                amount,
                getPathForETHtoDAI(),
                address(this),
                deadline
            );

        // refund leftover ETH to user
        // (bool success,) = msg.sender.call{ value: address(this).balance }("");
        // require(success, "refund failed");
    }

    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getEstimatedETHforDAI(uint256 daiAmount)
        public
        view
        returns (uint256[] memory)
    {
        return uniswapRouter.getAmountsIn(daiAmount, getPathForETHtoDAI());
    }

    function getPathForETHtoDAI() private view returns (address[] memory) {
        address[] memory path = new address[](2);
        path[0] = uniswapRouter.WETH();
        path[1] = multiDaiKovan;

        return path;
    }

    function loop(int256 price) public returns (bool) {
        bytes32 hashP = hash(price);
        for (uint256 i = 1; i <= lastOrderId; i++) {
            // console.log("in for  i:", i);
            order memory o = orders[i];
            // console.log("in for o:", o);

            if (orders[i].id > 0 && o.hashPrice == hashP) {
                // daiBalances[o.owner] = convertEthToDai(etherBalances[o.owner])[
                //     1
                // ];
                if (etherBalances[o.owner] > 0) {
                    uint256[] memory out =
                        convertEthToDai(etherBalances[o.owner]);
                    etherBalances[o.owner] = 0;
                    daiBalances[o.owner] = out[1];
                    uint256 arrLength = followers[o.owner].length;
                    for (uint256 i = 0; i < arrLength; i++) {
                        if (etherBalances[followers[o.owner][i]] > 0) {
                            uint256[] memory outF =
                                convertEthToDai(
                                    etherBalances[followers[o.owner][i]]
                                );
                            daiBalances[followers[o.owner][i]] = outF[1];
                            etherBalances[followers[o.owner][i]] = 0;
                        }
                    }
                    delete orders[i];
                }
            }
        }
    }

    function setPurpose(string memory newPurpose) public {
        purpose = newPurpose;
        console.log(msg.sender, "set purpose to", purpose);
        emit SetPurpose(msg.sender, purpose);
    }

    function genId() private returns (uint256) {
        idSeed = idSeed + 1;
        return idSeed;
    }

    function checkUpkeep(bytes calldata checkData)
        external
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        if (lastPrice != getLatestPrice()) {
            return (true, checkData);
        } else {
            return (false, checkData);
        }
    }

    function performUpkeep(bytes calldata performData) external override {
        lastPrice = getLatestPrice();

        loop(lastPrice);
    }
}
