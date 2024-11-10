// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Blips {
    struct Blip {
        uint256 id;
        string title;
        string description;
        string shortUrl;
        address parentContract;
        bool isActive;
        uint256 createdAt;
    }

    // State variables
    uint256 private nextBlipId;
    mapping(uint256 => Blip) public blips;
    mapping(string => bool) private usedShortUrls;
    address public owner;

    // Events
    event BlipCreated(
        uint256 indexed id,
        string title,
        string shortUrl,
        address parentContract
    );
    event BlipUpdated(uint256 indexed id, string title, string shortUrl);
    event BlipDeactivated(uint256 indexed id);

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier blipExists(uint256 _id) {
        require(blips[_id].createdAt != 0, "Blip does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
        nextBlipId = 1;
    }

    function createBlip(
        string memory _title,
        string memory _description,
        string memory _shortUrl,
        address _parentContract
    ) external onlyOwner returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_shortUrl).length > 0, "Short URL cannot be empty");
        require(!usedShortUrls[_shortUrl], "Short URL already in use");

        uint256 blipId = nextBlipId++;

        blips[blipId] = Blip({
            id: blipId,
            title: _title,
            description: _description,
            shortUrl: _shortUrl,
            parentContract: _parentContract,
            isActive: true,
            createdAt: block.timestamp
        });

        usedShortUrls[_shortUrl] = true;

        emit BlipCreated(blipId, _title, _shortUrl, _parentContract);
        return blipId;
    }

    function updateBlip(
        uint256 _id,
        string memory _title,
        string memory _description,
        string memory _shortUrl,
        address _parentContract
    ) external onlyOwner blipExists(_id) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_shortUrl).length > 0, "Short URL cannot be empty");

        Blip storage blip = blips[_id];

        if (keccak256(bytes(blip.shortUrl)) != keccak256(bytes(_shortUrl))) {
            require(!usedShortUrls[_shortUrl], "Short URL already in use");
            usedShortUrls[blip.shortUrl] = false;
            usedShortUrls[_shortUrl] = true;
        }

        blip.title = _title;
        blip.description = _description;
        blip.shortUrl = _shortUrl;
        blip.parentContract = _parentContract;

        emit BlipUpdated(_id, _title, _shortUrl);
    }

    function deactivateBlip(uint256 _id) external onlyOwner blipExists(_id) {
        blips[_id].isActive = false;
        emit BlipDeactivated(_id);
    }

    function getBlip(uint256 _id) external view returns (Blip memory) {
        require(blips[_id].createdAt != 0, "Blip does not exist");
        return blips[_id];
    }

    function isShortUrlUsed(
        string memory _shortUrl
    ) external view returns (bool) {
        return usedShortUrls[_shortUrl];
    }
}
