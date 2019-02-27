export default class GoogleDrive {
  /**
   * @param {GoogleAppsScript.Drive.DriveApp} [driveApp]
   */
  constructor(driveApp = DriveApp) {
    this.driveApp = driveApp
  }

  /**
   * @param {Date} since
   * @return {import('./types').Change[]}
   */
  getChanges(since) {
    const events = []
    const params = `modifiedDate >= "${since.toISOString()}"`
    const files = this.driveApp.searchFiles(params)
    while (files.hasNext()) {
      const file = files.next()
      const createdAt = file.getDateCreated()
      const type = createdAt >= since ? 'added' : 'updated'
      events.push({
        name: file.getName(),
        url: file.getUrl(),
        type,
        date: type === 'added' ? createdAt : file.getLastUpdated()
      })
    }
    return events
  }
}
