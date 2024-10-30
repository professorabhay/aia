// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeFiNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    string private _baseTokenURI;

    struct Meme {
        uint256 memeId;
        uint256 highestBid;
        address payable highestBidder;
        address payable creator;
        bool onAuction;
    }

    mapping(uint256 => Meme) public memes;

    event MemeCreated(uint256 memeId, string tokenURI, address creator);
    event NewBidPlaced(uint256 memeId, uint256 bidAmount, address bidder);
    event MemeTransferred(uint256 memeId, address newOwner);

    constructor(string memory baseURI) ERC721("MemeFiNFT", "MFNFT") Ownable(msg.sender) {
        _tokenIdCounter = 1; // Start token ID from 1
        _baseTokenURI = baseURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function createMeme(string memory tokenURI) public returns (uint256) {
        uint256 newMemeId = _tokenIdCounter; // Assign the current token ID
        _tokenIdCounter++; // Increment for the next token

        _mint(msg.sender, newMemeId);
        _setTokenURI(newMemeId, tokenURI);

        memes[newMemeId] = Meme({
            memeId: newMemeId,
            highestBid: 0,
            highestBidder: payable(address(0)),
            creator: payable(msg.sender),
            onAuction: false
        });

        emit MemeCreated(newMemeId, tokenURI, msg.sender);

        return newMemeId;
    }

    function startAuction(uint256 memeId) public {
        require(ownerOf(memeId) == msg.sender, "You must own the meme to auction it.");
        require(!memes[memeId].onAuction, "Meme is already on auction.");

        memes[memeId].onAuction = true;
    }

    function bid(uint256 memeId) public payable {
        require(memes[memeId].onAuction, "This meme is not on auction.");
        require(msg.value > memes[memeId].highestBid, "Bid must be higher than the current bid.");

        if (memes[memeId].highestBid > 0) {
            // Refund previous highest bidder
            memes[memeId].highestBidder.transfer(memes[memeId].highestBid);
        }

        memes[memeId].highestBid = msg.value;
        memes[memeId].highestBidder = payable(msg.sender);

        emit NewBidPlaced(memeId, msg.value, msg.sender);
    }

    function endAuction(uint256 memeId) public {
        require(ownerOf(memeId) == msg.sender, "Only the owner can end the auction.");
        require(memes[memeId].onAuction, "Meme is not on auction.");

        memes[memeId].onAuction = false;

        // Transfer ownership to the highest bidder
        _transfer(msg.sender, memes[memeId].highestBidder, memeId);

        // Transfer funds to the owner
        payable(msg.sender).transfer(memes[memeId].highestBid);

        emit MemeTransferred(memeId, memes[memeId].highestBidder);
    }
}
