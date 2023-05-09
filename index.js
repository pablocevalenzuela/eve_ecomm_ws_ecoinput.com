const puppeteer = require("puppeteer")

puppeteer
  .launch()
  .then(async browser => {
    const page = await browser.newPage()
    await page.goto("https://www.ecoinput.com/recursos/eCommerce/calendario-ecommerce-para-chile")
    await page.waitForSelector(".events_ecommerce_cl")

    let heading = await page.evaluate(() => {
      const h1 = document.body.querySelector("h1")

      return h1.innerText
    })

    console.log({ heading })

    let allEvents = await page.evaluate(() => {
      const eventsList = document.body.querySelectorAll(".events_ecommerce_cl row ")

      let fruits = []

      eventsList.forEach(value => {
        fruits.push(value.innerText)
      })
      return fruits
    })

    console.log({ allEvents })
    await browser.close()
  })
  .catch(function (err) {
    console.error(err)
  })