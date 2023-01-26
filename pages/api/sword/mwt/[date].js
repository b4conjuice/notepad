import requestMeetingLinks from '../../../../lib/requestMeetingLinks'

export default (req, res) => {
  const {
    query: { date },
  } = req

  const yearWeekFormat = /^\d{4}-\d{1,2}$/
  if (yearWeekFormat.test(date)) {
    const dt = date.replace(/-/g, '/')
    requestMeetingLinks(dt, res)
  } else {
    res.send({
      success: false,
      date,
      message: 'date must be formatted as `year-week`, such as 2023-05`',
    })
  }
}
