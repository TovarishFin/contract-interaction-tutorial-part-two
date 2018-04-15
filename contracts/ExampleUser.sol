pragma solidity 0.4.21;

// a limited definition of the contract we wish to access
contract ExampleContractInterface {
  function addNumbers(uint256 _number)
    // view means we are not changing state but accessing it
    view
    public
    returns (uint256)
  {}

  function setShortString(bytes32 _stringBytes)
    public
    returns (bool)
  {}
}


contract ExampleUser {

  // notice that the type here is the contract definition itself
  ExampleContractInterface private exampleContract;
  uint256 public addedNumbers;

  // we will set the contract address that we wish to access in our constructor
  function ExampleUser(address _exampleContractAddress)
    public
  {
    // make sure that the address isn't empty
    require(_exampleContractAddress != address(0));
    // set the contract that we want to access by using the definition at the
    // at the top and use the address provided
    exampleContract = ExampleContractInterface(_exampleContractAddress);
  }

  function addNumbers(uint256 _number)
    public
    returns (bool)
  {
    // access contract function located in other contract
    addedNumbers = exampleContract.addNumbers(_number);
    return true;
  }

  // set a given string on ExampleContract
  function setRemoteString(string _string)
    public
    returns (bool)
  {
    exampleContract.setShortString(toBytes32(_string));
    return true;
  }

  // convert a string less than 32 characters long to bytes32
  function toBytes32(string _string)
    // pure means we are not accessing state nor changing state
    pure
    public
    returns (bytes32)
  {
    // make sure that the string isn't too long for this function
    // will work but will cut off the any characters past the 32nd character
    require(bytes(_string).length <= 32);
    bytes32 _stringBytes;

    // simplest way to convert 32 character long string
    assembly {
      // load the memory pointer of string with an offset of 32
      // 32 passes over non-core data parts of string such as length of text
      _stringBytes := mload(add(_string, 32))
    }

    return _stringBytes;
  }
}
