import GoogleDrive from './GoogleDrive'

const driveApp = {
  searchFiles() {
    return {
      hasNext: jest
        .fn()
        .mockReturnValueOnce(true)
        .mockReturnValueOnce(true)
        .mockReturnValue(false),
      next: jest
        .fn()
        .mockReturnValueOnce({
          getName: jest.fn().mockReturnValue('file 1'),
          getUrl: jest.fn().mockReturnValue('http://example.com/files/1'),
          getDateCreated: jest.fn().mockReturnValue(new Date(2006, 0, 2, 14, 4)),
          getLastUpdated: jest.fn().mockReturnValue(new Date(2006, 0, 2, 16, 4))
        })
        .mockReturnValueOnce({
          getName: jest.fn().mockReturnValue('file 2'),
          getUrl: jest.fn().mockReturnValue('http://example.com/files/2'),
          getDateCreated: jest.fn().mockReturnValue(new Date(2006, 0, 2, 17, 4)),
          getLastUpdated: jest.fn().mockReturnValue(new Date(2006, 0, 2, 18, 4))
        })
    }
  }
}

describe('GoogleDribe', () => {
  describe('.getChanges()', () => {
    test('get updated and added changes', () => {
      const googleDrive = new GoogleDrive(driveApp)
      const changes = googleDrive.getChanges(new Date(2006, 0, 2, 15, 4))
      expect(changes).toHaveLength(2)
      expect(changes[0]).toEqual({
        name: 'file 1',
        url: 'http://example.com/files/1',
        type: 'updated',
        date: new Date(2006, 0, 2, 16, 4)
      })
      expect(changes[1]).toEqual({
        name: 'file 2',
        url: 'http://example.com/files/2',
        type: 'added',
        date: new Date(2006, 0, 2, 17, 4)
      })
    })
  })
})
