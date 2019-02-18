export default class GoogleDrive {
  /**
   * @param {GoogleAppsScript.Drive.DriveApp} [driveApp]
   */
  constructor(driveApp = DriveApp) {
    this.driveApp = driveApp
  }

  /**
   * @param {Date} since
   */
  getChanges(since) {
    const events = []
    const params = `modifiedDate >= "${since.toISOString()}"`
    const files = this.driveApp.searchFiles(params)
    while (files.hasNext()) {
      const file = files.next()
      events.push({
        name: file.getName(),
        updatedAt: file.getLastUpdated(),
        url: file.getUrl()
      })
    }
    return events
  }
}
