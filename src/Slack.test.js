import Slack from './Slack'

const utilities = {
  formatDate: jest.fn().mockReturnValue('15:04')
}

describe('Slack', () => {
  describe('.formatMessage()', () => {
    test('format a change', () => {
      const slack = new Slack('', '', {}, utilities)
      /** @type {import("./types").Change} */
      const change = {
        name: 'awesome file',
        url: 'http://example.com',
        type: 'updated',
        date: new Date()
      }
      expect(slack.formatMessage(change)).toBe('<http://example.com|awesome file> updated at 15:04')
    })
  })
})
