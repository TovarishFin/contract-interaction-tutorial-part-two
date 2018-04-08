pragma solidity ^0.4.21;

contract ExampleContract {
  uint256 public someNumber;

  function setNumber(uint256 _number)
    public
    returns (bool)
  {
    someNumber = _number;
  }

  function addNumbers(uint256 _number)
    view
    public
    returns (uint256)
  {
    return someNumber + _number;
  }

}
