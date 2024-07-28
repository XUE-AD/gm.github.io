// require('dotenv').config();
const puppeteer = require('puppeteer');

const user = process.env.USER;
const password = process.env.PASSWORD;


async function processInput(title, date, startHour, endHour, teacherEmail, studentEmail) {
    const inputData = {
        title: title,
        date: date,
        startHour: startHour,
        endHour: endHour,
        teacherEmail: teacherEmail,
        studentEmail: studentEmail
    };

    const sleep = ms => new Promise(res => setTimeout(res, ms));

    try {
        const browser = await puppeteer.launch({ headless: false, args: ['--window-size=1189,731'] });
        const page = await browser.newPage();
        const timeout = 5000;

        // Go to Google login page
        await page.goto('https://accounts.google.com/signin');

        // Enter email
        await page.type('input[type="email"]',user);
        await page.click('#identifierNext');
        await sleep(5000); // Adjust the wait time as necessary

        // Enter password
        await page.type('input[type="password"]', password);
        await page.click('#passwordNext');
        await sleep(5000); // Adjust the wait time as necessary

        // Go to Google Calendar
        await page.goto('https://calendar.google.com/calendar/u/0/r');
        await sleep(5000); // Wait for the page to load

        {
            const targetPage = page;
            await targetPage.setViewport({
                width: 1189,
                height: 731
            })
            await puppeteer.Locator.race([
                targetPage.locator('div.mr0WL'),
                targetPage.locator('::-p-xpath(//*[@id=\\"ow40\\"]/span/span/span/div[2])'),
                targetPage.locator(':scope >>> div.mr0WL')
            ])
                .setTimeout(timeout)
                .click({
                  offset: {
                    x: 76.5,
                    y: 11,
                  },
                });
        }

        {
            
            const targetPage = page;
            await puppeteer.Locator.race([
                targetPage.locator('span.FwR7Pc > div.uyYuVb > div'),
                targetPage.locator('::-p-xpath(/html/body/div[26]/div/div/span[1]/div[2]/div)'),
                targetPage.locator(':scope >>> span.FwR7Pc > div.uyYuVb > div'),
                targetPage.locator('::-p-text(Event)')
            ])
                .setTimeout(timeout)
                .click({
                  offset: {
                    x: 62,
                    y: 11,
                  },
                });
        }
        {
            const targetPage = page;
            await sleep(3000); 
            await targetPage.waitForSelector("[aria-label='固定在側欄']");
            await targetPage.click("[aria-label='固定在側欄']")

        }
        {
            const targetPage = page;
            await targetPage.waitForSelector("[aria-label='新增標題']");
            await targetPage.type("[aria-label='新增標題']", inputData.title);
        }
        {

            await sleep(2000); 
            await page.mouse.click(131, 132);
            await sleep(2000); 
            await page.keyboard.type(inputData.date);
            await sleep(2000); 
            await page.keyboard.press('Enter');
            await sleep(1000); 
            await page.mouse.click(232, 132);
            await page.keyboard.type(inputData.startHour);
            await sleep(1000); 
            await page.mouse.click(316, 132);
            await page.keyboard.type(inputData.endHour);  

        }
        {
            // await page.waitForSelector("input[aria-label='邀請對象']"); // 請替換為實際的輸入框選擇器
            // await page.focus("input[aria-label='邀請對象']"); // 聚焦到輸入框
            await sleep(3000);
            await page.mouse.click(95, 240);
            await sleep(1000);
            await page.keyboard.type(inputData.teacherEmail);
            await sleep(1000);
            await page.keyboard.press('Enter');


        }

        {
            await sleep(6000); 
            // await page.click('::-p-xpath(//*[@id=\\"yDmH0d\\"]/div[1]/div/div[2]/span/div/div[1]/div[2]/div[1]/div[3]/div[2]/span/div/div[4]/div/div[2]/div/div/div/div[3]/div/div[1]/div[2]/div/span[2]/button)')
            await page.click("[aria-label='視訊通話選項']")
            // const targetPage = page;
            // await puppeteer.Locator.race([
            //     targetPage.locator('::-p-aria(Video call options)'),
            //     targetPage.locator('div.m2hqkd span:nth-of-type(2) > button'),
            //     targetPage.locator('::-p-xpath(//*[@id=\\"yDmH0d\\"]/div[1]/div/div[2]/span/div/div[1]/div[2]/div[1]/div[3]/div[2]/span/div/div[4]/div/div[2]/div/div/div/div[3]/div/div[1]/div[2]/div/span[2]/button)'),
            //     targetPage.locator(':scope >>> div.m2hqkd span:nth-of-type(2) > button')
            // ])
            //     .setTimeout(timeout)
            //     .click({
            //       offset: {
            //         x: 21.3828125,
            //         y: 11,
            //       },
            //     });
            // await sleep(5000); // Wait for the page to load
        }
    
        {
            
            await page.waitForSelector(`[data-hovercard-id='${teacherEmail}'] span`);
            console.log( teacherEmail);
            // 執行document.querySelector並獲取textContent
            const guestName = await page.evaluate((email) => {
                const element = document.querySelector(`[data-hovercard-id='${email}'] span`);
                return element ? element.textContent : null;
              }, teacherEmail);
          
            console.log('元素文本內容:', guestName);
            await sleep(3000);
            await page.mouse.click(961, 222);
            await page.mouse.click(250, 238);//會議記錄
            await page.mouse.click(430, 298);//錄製會議
            await page.mouse.click(262, 276);//邀請對象

            await sleep(5000);
            page.mouse.click(550, 563);

            await page.keyboard.type(guestName);
            await sleep(3000);
            page.mouse.click(406, 701);
        }
        {
            await sleep(3000);
            await page.mouse.move(250, 563);
            // 使用 mouse.wheel 方法在指定位置向下滾動
            let scrollStep = 100; // 每次滾動的距離
            let totalScroll = 0;
            const maxScroll = 2000; // 假設需要滾動的總距離，可以根據實際情況調整
    
            while (totalScroll < maxScroll) {
                await page.mouse.wheel({ deltaY: scrollStep }); // 正數表示向下滾動
                totalScroll += scrollStep;
                 
            }
            
        }
        {
            await sleep(3000);
            page.mouse.click(940, 662);
            await sleep(2000);
            page.mouse.click(400, 700);
            await sleep(2000);
            page.mouse.click(779, 400);
            await sleep(1000);
            page.mouse.click(779, 400);
            await sleep(2000);
        }

        await browser.close();
    } catch (err) {
        console.error(err);
    }
}

module.exports = { processInput };
