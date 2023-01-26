import format from 'date-fns/format'

import requestMeetingLinks from '../../../../lib/requestMeetingLinks'

export default (req, res) => {
  const date = format(new Date(), 'yyyy/w')
  requestMeetingLinks(date, res)
}
