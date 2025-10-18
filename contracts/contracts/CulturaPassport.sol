// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title CulturaPassport - Soulbound NFT for cultural identity
/// @notice This contract implements a soulbound (non-transferable) ERC-721 NFT for cultural passports
contract CulturaPassport is ERC721, Ownable {
    uint256 private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;

    // Events for better tracking
    event PassportMinted(address indexed to, uint256 indexed tokenId, string uri);

    constructor(string memory name_, string memory symbol_) 
        ERC721(name_, symbol_) 
        Ownable(msg.sender) 
    {}

    /// @notice Mint a new cultural passport (only owner can call this)
    /// @param to The address to mint the passport to
    /// @param uri The IPFS URI containing passport metadata
    /// @return tokenId The ID of the newly minted passport
    function mintPassport(address to, string memory uri) 
        public 
        onlyOwner 
        returns (uint256) 
    {
        require(to != address(0), "Cannot mint to zero address");
        require(bytes(uri).length > 0, "URI cannot be empty");
        
        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;
        
        _safeMint(to, newTokenId);
        _tokenURIs[newTokenId] = uri;
        
        emit PassportMinted(to, newTokenId, uri);
        return newTokenId;
    }

    /// @notice Get the token URI for a given token ID
    /// @param tokenId The ID of the token
    /// @return The URI string for the token metadata
    function tokenURI(uint256 tokenId) 
        public 
        view 
        override 
        returns (string memory) 
    {
        _requireOwned(tokenId);
        
        string memory _tokenURI = _tokenURIs[tokenId];
        return bytes(_tokenURI).length > 0 ? _tokenURI : "";
    }

    /// @notice Get the total number of tokens minted
    /// @return The total supply of passports
    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }

    /// @notice Check if a token exists
    /// @param tokenId The ID of the token to check
    /// @return Whether the token exists
    function exists(uint256 tokenId) public view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}