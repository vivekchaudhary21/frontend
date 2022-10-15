const fetchData = require('./async')

describe('Async.js', () => {
  it('should return correct id', async () => {
    const { id } = await fetchData(1)
    expect(id).toBe(1)
  })
})
