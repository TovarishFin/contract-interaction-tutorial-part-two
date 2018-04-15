const assert = require('assert')
const BigNumber = require('bignumber.js')
const ExampleContract = artifacts.require('ExampleContract')
const ExampleUser = artifacts.require('ExampleUser')

const testWillThrow = async (fn, args) => {
  try {
    await fn.apply(null, args)
    assert(false, 'the contract should throw here')
  } catch (error) {
    assert(
      /invalid opcode/.test(error) || /revert/.test(error),
      `the error message should be invalid opcode or revert, the error was ${error}`
    )
  }
}

describe('when using our beautiful example user with example contract', () => {
  contract('ExampleContract/ExampleUser', () => {
    const contractNumber = new BigNumber(5)
    let ec
    let eu

    before('setup contracts', async () => {
      ec = await ExampleContract.new()
      eu = await ExampleUser.new(ec.address)
      await ec.setNumber(contractNumber)
    })

    it('should addNumbers using ExampleContract', async () => {
      const numberToAdd = new BigNumber(7)

      const someNumber = await ec.someNumber()
      await eu.addNumbers(numberToAdd)
      const addedNumbers = await eu.addedNumbers()

      assert.equal(
        someNumber.toString(),
        contractNumber.toString(),
        'someNumber should have been set'
      )
      assert.equal(
        addedNumbers.toString(),
        someNumber.add(numberToAdd).toString(),
        'addNumbers should add someNumber and numberToAdd'
      )
    })
  })
})

describe('when testing our new utility functions', () => {
  contract('ExampleContract/ExampleUser', () => {
    const shortString = 'test string'
    // ascii representation of short string in bytes
    // verify for yourself here: https://www.asciitohex.com/
    const shortStringBytes = '0x7465737420737472696e67' + '0'.repeat(42)
    let ec
    let eu

    before('setup contracts', async () => {
      ec = await ExampleContract.new()
      eu = await ExampleUser.new(ec.address)
    })

    it('should convert a short string to bytes32 on ExampleUser', async () => {
      const returnedBytes = await eu.toBytes32(shortString)

      assert.equal(
        shortStringBytes,
        returnedBytes,
        'returned bytes should match shortStringBytes'
      )
    })

    it('should NOT convert string more than 32 characters using toBytes32', async () => {
      testWillThrow(eu.toBytes32, ['some really long string that is longer'])
    })

    it('should convert bytes32 to a short string', async () => {
      const returnedString = await ec.toShortString(shortStringBytes)

      assert.equal(
        shortString,
        returnedString,
        'returned string should match shortString'
      )
    })
  })
})

describe('when handling strings less than or equal to 32 characters', () => {
  contract('ExampleContract/ExampleUser', () => {
    const shortString = 'test string'
    let ec
    let eu

    before('setup contracts', async () => {
      ec = await ExampleContract.new()
      eu = await ExampleUser.new(ec.address)
    })

    it('should set a given string on ExampleContract from ExampleUser contract', async () => {
      const preContractString = await ec.shortString()

      await eu.setRemoteString(shortString)

      const postContractString = await ec.shortString()

      assert.equal(
        '',
        preContractString,
        'ExampleContract should start with an empty string for shortString'
      )
      assert.equal(
        shortString,
        postContractString,
        'ExampleContract shortString should match the string given from ExampleUser'
      )
    })
  })
})
