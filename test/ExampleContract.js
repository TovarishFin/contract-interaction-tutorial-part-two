const assert = require('assert')
const BigNumber = require('bignumber.js')
const ExampleContract = artifacts.require('ExampleContract')

describe('when using our beautiful example contract', () => {
  contract('ExampleContract', accounts => {
    let ec

    before('setup contract', async () => {
      ec = await ExampleContract.new()
    })

    it('should setNumber', async () => {
      const numberToSet = new BigNumber(7)

      const preNumber = await ec.someNumber()
      await ec.setNumber(numberToSet)
      const postNumber = await ec.someNumber()

      assert.equal(
        preNumber.toString(),
        new BigNumber(0).toString(),
        'someNumber should start uninitialized as 0'
      )
      assert.equal(
        postNumber.toString(),
        numberToSet.toString(),
        'someNumber should match numberToSet'
      )
    })

    it('should addNumbers', async () => {
      const numberToAdd = new BigNumber(7)

      const someNumber = await ec.someNumber()
      const addedNumbers = await ec.addNumbers(numberToAdd)

      assert.equal(
        someNumber.toString(),
        numberToAdd.toString(),
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
