import request from 'request'
import cheerio from 'cheerio'

const requestMeetingLinks = (date, res) => {
  const url = `https://wol.jw.org/en/wol/meetings/r1/lp-e/${date}`
  const options = {
    url,
    method: 'GET',
  }
  request(options, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html)
      const meetingLinkSelector = `.todayItems > .todayItem > .itemCaption > .linkCard > a.jwac`
      const meetingLinkElements = $(meetingLinkSelector)
      if (meetingLinkElements) {
        const weekElement = $(
          '.todayItems > .todayItem:nth-child(1) > .itemData h1 strong'
        )
        const week = weekElement.text()
        const mwElement = $(
          '.todayItems > .todayItem:nth-child(1) > .itemCaption > .linkCard > a.jwac'
        )
        const wtElement = $(
          '.todayItems > .todayItem:nth-child(2) > .itemData a'
        )
        const baseUrl = 'https://wol.jw.org'
        res.send({
          success: true,
          date,
          url,
          week,
          mw: `${baseUrl}${mwElement.attr('href')}`,
          wt: `${baseUrl}${wtElement.attr('href')}`,
          wtTitle: wtElement.text(),
        })
      } else {
        res.send({
          success: false,
          date,
          url,
        })
      }
    } else console.log('error')
  })
}

export default requestMeetingLinks
