const username = 'google-drive-to-slack'
const icon_url = 'https://developers.google.com/drive/images/drive_icon.png'

export default class Slack {
  /**
   * @param {string} webhookUrl
   * @param {string} [timeZone]
   * @param {GoogleAppsScript.URL_Fetch.UrlFetchApp} [urlFetchApp]
   * @param {GoogleAppsScript.Utilities.Utilities} [utilities]
   */
  constructor(webhookUrl, timeZone = Session.getScriptTimeZone(), urlFetchApp = UrlFetchApp, utilities = Utilities) {
    this.webhookUrl = webhookUrl
    this.timeZone = timeZone
    this.urlFetchApp = urlFetchApp
    this.utilities = utilities
  }

  /**
   * @param {{ name: string, updatedAt: Date, url: string}[]} events
   */
  postEvents(events) {
    if (events.length === 0) {
      return
    }

    const title = `${events.length} file(s) modified`
    const value = this.formatMessage(events)

    const params = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        username,
        icon_url,
        attachments: [
          {
            fallback: title,
            fields: [
              {
                title,
                value,
                short: false
              }
            ]
          }
        ]
      })
    }

    this.urlFetchApp.fetch(this.webhookUrl, params)
  }

  /**
   * @param {{ name: string, updatedAt: Date, url: string}[]} events
   */
  formatMessage(events) {
    return events
      .map(({ name, updatedAt, url }) => {
        const time = this.utilities.formatDate(updatedAt, this.timeZone, 'HH:mm')
        return `<${url}|${name}> @ ${time}`
      })
      .join('\n')
  }
}
