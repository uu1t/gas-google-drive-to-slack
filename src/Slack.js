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
   * @param {import('./types').Change[]} changes
   */
  postChanges(changes) {
    if (changes.length === 0) {
      return
    }

    const params = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        username,
        icon_url,
        attachments: [
          {
            fallback: `${changes.length} file(s) modified`,
            fields: [
              {
                value: changes.map(this.formatMessage, this).join('\n'),
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
   * @param {import('./types').Change} change
   */
  formatMessage({ name, url, type, date }) {
    const time = this.utilities.formatDate(date, this.timeZone, 'HH:mm')
    return `<${url}|${name}> ${type} at ${time}`
  }
}
