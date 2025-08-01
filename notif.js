const { Notification } = require('electron')

const NOTIFICATION_TITLE = 'Click'
const NOTIFICATION_BODY = 'Notif Click'

new Notification({
  title: NOTIFICATION_TITLE,
  body: NOTIFICATION_BODY
}).show()