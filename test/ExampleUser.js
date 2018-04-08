const assert = require('assert')
const BigNumber = require('bignumber.js')
const ExampleContract = artifacts.require('ExampleContract')
const ExampleUser = artifacts.require('ExampleUser')

describe('when using our beautiful example user with example contract', () => {
  contract('ExampleContract/ExampleUser', accounts => {
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
