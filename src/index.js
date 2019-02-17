import GoogleDrive from './GoogleDrive'
import Slack from './Slack'
import Store from './Store'

export function main() {
  const store = new Store()

  const slackWebhookUrl = store.get('slackWebhookUrl')
  if (!slackWebhookUrl) {
    Logger.log('Error: `slackWebhookUrl` is not set in script properties')
    return
  }

  const now = new Date()
  const executedAt = store.get('executedAt')
  const since = executedAt ? new Date(executedAt) : new Date(Date.now() - 1000 * 60 * 5)

  const googleDrive = new GoogleDrive()
  const events = googleDrive.getEvents(since)

  const slack = new Slack(slackWebhookUrl)
  slack.postEvents(events)

  store.set('executedAt', now.toISOString())
}
