// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // For NFT minting
import "@openzeppelin/contracts/utils/Counters.sol"; // For NFT token ID management

contract UserSmartWallet is Ownable, ReentrancyGuard, Pausable, ERC721 {
    using Counters for Counters.Counter;

    // Structs
    struct Profile {
        string eid; // eUICC Identifier (EID)
        string iccid; // Integrated Circuit Card Identifier
        string msisdn; // Mobile Station International Subscriber Directory Number
        string imei; // International Mobile Equipment Identity
        string deviceModel; // Device Model
        string osVersion; // Operating System Version
        string mcc; // Mobile Country Code
        string mnc; // Mobile Network Code
        string plmn; // Public Land Mobile Network (MCC + MNC)
        ProfileStatus status; // Profile Status
        uint256 createdAt; // Creation Timestamp
        bool exists; // Whether the profile exists
    }

    struct Subscription {
        string planId; // Subscription Plan ID
        uint256 startDate; // Subscription Start Date
        uint256 endDate; // Subscription End Date
        bool active; // Whether the subscription is active
    }

    struct NetworkConfig {
        string apn; // Access Point Name
        string authenticationKey; // Authentication Key for eSIM
        string encryptionKey; // Encryption Key for eSIM
        bool activated; // Whether the eSIM is activated
    }

    struct ESimNFTMetadata {
        string iccid; // ICCID of the eSIM profile
        string qrCodeUri; // URI for the QR code image
        string networkConfigUri; // URI for the network configuration metadata
    }

    // Enums
    enum ProfileStatus { Inactive, Active, Suspended }

    // Events
    event ProfileRegistered(address indexed user, string eid, string iccid, string msisdn);
    event ProfileStatusUpdated(address indexed user, string iccid, ProfileStatus status);
    event SubscriptionCreated(address indexed user, string iccid, string planId);
    event PaymentProcessed(address indexed user, uint256 amount);
    event MessageSent(address indexed from, address indexed to, bytes32 messageHash);
    event NetworkConfigReceived(address indexed user, string iccid, string apn, string authenticationKey, string encryptionKey);
    event ESimActivated(address indexed user, string iccid);
    event ESimNFTMinted(address indexed user, uint256 tokenId, string iccid, string qrCodeUri);

    // Mappings
    mapping(address => mapping(string => Profile)) public profiles;
    mapping(address => mapping(string => Subscription)) public subscriptions;
    mapping(address => mapping(string => NetworkConfig)) public networkConfigs;
    mapping(address => string[]) public userProfiles;
    mapping(address => uint256) public balances;
    mapping(uint256 => ESimNFTMetadata) public eSimNFTMetadata; // NFT token ID to metadata

    // Constants
    uint256 public constant MINIMUM_DEPOSIT = 0.01 ether;
    uint256 public constant PROFILE_LIMIT = 5;

    // ZKP Verification
    mapping(address => bool) public zkpVerified;

    // NFT Token ID Counter
    Counters.Counter private _tokenIdCounter;

    // Modifiers
    modifier profileExists(string memory iccid) {
        require(profiles[msg.sender][iccid].exists, "Profile does not exist");
        _;
    }

    modifier withinProfileLimit() {
        require(userProfiles[msg.sender].length < PROFILE_LIMIT, "Profile limit reached");
        _;
    }

    modifier requiresZKP() {
        require(zkpVerified[msg.sender], "ZKP verification required");
        _;
    }

    // Constructor
    constructor() ERC721("ESimNFT", "ESIM") {
        _pause(); // Start paused for security
        unpause(); // Unpause after setup
    }

    // ZKP Verification Function
    function verifyZKP(bytes32 proof) external whenNotPaused {
        // Simulate ZKP verification logic (replace with actual ZKP library)
        bool isValidProof = validateProof(proof);
        require(isValidProof, "Invalid ZKP proof");

        zkpVerified[msg.sender] = true;
    }

    // Simulated ZKP Validation (Replace with actual ZKP library)
    function validateProof(bytes32 proof) internal pure returns (bool) {
        // Placeholder logic for ZKP validation
        return proof != bytes32(0); // Example: Non-zero proof is valid
    }

    // Profile Management Functions
    function registerProfile(
        string memory eid,
        string memory iccid,
        string memory msisdn,
        string memory imei,
        string memory deviceModel,
        string memory osVersion,
        string memory mcc,
        string memory mnc,
        bytes32 proof
    ) external whenNotPaused withinProfileLimit requiresZKP {
        require(!profiles[msg.sender][iccid].exists, "Profile already exists");
        
        // Verify ZKP before proceeding
        bool isValidProof = validateProof(proof);
        require(isValidProof, "Invalid ZKP proof");

        Profile memory newProfile = Profile({
            eid: eid,
            iccid: iccid,
            msisdn: msisdn,
            imei: imei,
            deviceModel: deviceModel,
            osVersion: osVersion,
            mcc: mcc,
            mnc: mnc,
            plmn: string(abi.encodePacked(mcc, mnc)),
            status: ProfileStatus.Inactive,
            createdAt: block.timestamp,
            exists: true
        });

        profiles[msg.sender][iccid] = newProfile;
        userProfiles[msg.sender].push(iccid);
        
        emit ProfileRegistered(msg.sender, eid, iccid, msisdn);
    }

    function updateProfileStatus(
        string memory iccid,
        ProfileStatus newStatus,
        bytes32 proof
    ) external whenNotPaused profileExists(iccid) requiresZKP {
        Profile storage profile = profiles[msg.sender][iccid];
        require(profile.status != newStatus, "Status already set");
        
        // Verify ZKP before proceeding
        bool isValidProof = validateProof(proof);
        require(isValidProof, "Invalid ZKP proof");

        profile.status = newStatus;
        
        emit ProfileStatusUpdated(msg.sender, iccid, newStatus);
    }

    // Subscription Management
    function createSubscription(
        string memory iccid,
        string memory planId,
        uint256 duration,
        bytes32 proof
    ) external payable whenNotPaused profileExists(iccid) nonReentrant requiresZKP {
        require(msg.value >= MINIMUM_DEPOSIT, "Insufficient payment");
        require(profiles[msg.sender][iccid].status == ProfileStatus.Active, "Profile not active");

        // Verify ZKP before proceeding
        bool isValidProof = validateProof(proof);
        require(isValidProof, "Invalid ZKP proof");

        Subscription memory newSub = Subscription({
            planId: planId,
            startDate: block.timestamp,
            endDate: block.timestamp + duration,
            active: true
        });

        subscriptions[msg.sender][iccid] = newSub;
        balances[msg.sender] += msg.value;

        emit SubscriptionCreated(msg.sender, iccid, planId);
        emit PaymentProcessed(msg.sender, msg.value);
    }

    // Secure Messaging
    function sendSecureMessage(
        address to,
        bytes32 encryptedMessage,
        bytes32 proof
    ) external whenNotPaused requiresZKP {
        require(to != address(0), "Invalid recipient");

        // Verify ZKP before proceeding
        bool isValidProof = validateProof(proof);
        require(isValidProof, "Invalid ZKP proof");

        emit MessageSent(msg.sender, to, encryptedMessage);
    }

    // Network Configuration for eSIM Activation
    function receiveNetworkConfig(
        string memory iccid,
        string memory apn,
        string memory authenticationKey,
        string memory encryptionKey,
        bytes32 proof
    ) external whenNotPaused profileExists(iccid) requiresZKP {
        require(!networkConfigs[msg.sender][iccid].activated, "Network config already received");

        // Verify ZKP before proceeding
        bool isValidProof = validateProof(proof);
        require(isValidProof, "Invalid ZKP proof");

        NetworkConfig memory newConfig = NetworkConfig({
            apn: apn,
            authenticationKey: authenticationKey,
            encryptionKey: encryptionKey,
            activated: true
        });

        networkConfigs[msg.sender][iccid] = newConfig;

        emit NetworkConfigReceived(msg.sender, iccid, apn, authenticationKey, encryptionKey);
    }

    // Activate eSIM with Network Configuration
    function activateESim(string memory iccid) external whenNotPaused profileExists(iccid) requiresZKP {
        NetworkConfig storage config = networkConfigs[msg.sender][iccid];
        require(config.activated, "Network config not received");

        // Mark eSIM as activated
        config.activated = true;

        emit ESimActivated(msg.sender, iccid);
    }

    // Mint NFT with QR Code for eSIM Activation
    function mintESimNFT(
        string memory iccid,
        string memory qrCodeUri,
        string memory networkConfigUri
    ) external whenNotPaused profileExists(iccid) requiresZKP {
        require(networkConfigs[msg.sender][iccid].activated, "eSIM not activated");

        // Mint NFT
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId);

        // Store NFT metadata
        eSimNFTMetadata[tokenId] = ESimNFTMetadata({
            iccid: iccid,
            qrCodeUri: qrCodeUri,
            networkConfigUri: networkConfigUri
        });

        emit ESimNFTMinted(msg.sender, tokenId, iccid, qrCodeUri);
    }

    // View Functions
    function getUserProfiles() external view returns (Profile[] memory) {
        string[] memory userProfileIds = userProfiles[msg.sender];
        Profile[] memory userProfilesData = new Profile[](userProfileIds.length);
        
        for (uint i = 0; i < userProfileIds.length; i++) {
            userProfilesData[i] = profiles[msg.sender][userProfileIds[i]];
        }
        
        return userProfilesData;
    }

    function getNetworkConfig(string memory iccid) external view profileExists(iccid) returns (NetworkConfig memory) {
        return networkConfigs[msg.sender][iccid];
    }

    function getESimNFTMetadata(uint256 tokenId) external view returns (ESimNFTMetadata memory) {
        require(_exists(tokenId), "Token does not exist");
        return eSimNFTMetadata[tokenId];
    }

    // Emergency Functions
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // Receive function
    receive() external payable {
        balances[msg.sender] += msg.value;
        emit PaymentProcessed(msg.sender, msg.value);
    }
}
