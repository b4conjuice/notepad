import request from 'request'
import cheerio from 'cheerio'
import format from 'date-fns/format'

export default (date, res) => {
  const url = `https://wol.jw.org/en/wol/dt/r1/lp-e/${date}`
  const options = {
    url,
    method: 'GET',
  }
  request(options, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html)
      const year = format(new Date(), 'yy')
      const dailyTextSelector = `.todayItems .todayItem.pub-es`
      const dailyTextElement = $(dailyTextSelector).text()
      if (dailyTextElement !== '') {
        const dt = $(`${dailyTextSelector} header h2`).text()
        const text = $(`${dailyTextSelector} p.themeScrp`).text()
        const comment = $(`${dailyTextSelector} .sb`).text()
        const dailyText = `${dt}\n${text}\n${comment}`
        const scripture = $(`${dailyTextSelector} p.themeScrp a`).text()
        // res.contentType('json');
        // res.send({
        //   success: true,
        //   date,
        //   text,
        //   comment,
        //   dailyText,
        // });
        res.send({
          success: true,
          date: dt,
          text,
          comment,
          dailyText,
          scripture,
        })
      } else {
        // res.contentType('json');
        res.send({
          success: false,
        })
      }
    } else console.log('error')
  })
}
