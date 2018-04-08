pragma solidity 0.4.21;

// a limited definition of the contract we wish to access
contract ExampleContractInterface {
  function addNumbers(uint256 _number)
    view
    public
    returns (uint256)
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
}
