import fs from 'fs';
import puppeteer from 'puppeteer';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import sharp from 'sharp';
const css1 = `
    body {
        background-color: white;
    }
    .test-element {
        width: 100px;
        height: 100px;
        background-color: blue;
        color: white;
        text-align: center;
        line-height: 100px;
        font-family: Arial, sans-serif;
    }
`;
const css2 = `
    * {
        background-color: white;
    }
    .test-element {
        width: 100px;
        height: 100px;
        color: white;
        text-align: center;
        line-height: 100px;
        font-family: Arial, sans-serif;
        background-color: blue;
    }
`;

export async function takeScreenshot(element,css, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body class="body">
            ${element}
        </body>
        </html>
    `);
    var x=await page.screenshot();
    await browser.close();
    return x;
}


async function compareScreenshots(screenshot1, screenshot2) {
  // Load images
  const image1 = await sharp(screenshot1).resize(1024, 768).toBuffer();
  const image2 = await sharp(screenshot2).resize(1024, 768).toBuffer();

  // Convert to raw pixel data
  const pixels1 = await sharp(image1).raw().toBuffer();
  const pixels2 = await sharp(image2).raw().toBuffer();

  // Compare pixel values with a tolerance level
  let differences = 0;
  const tolerance = 0; // Adjust tolerance as needed
  for (let i = 0; i < pixels1.length; i++) {
    if (Math.abs(pixels1[i] - pixels2[i]) > tolerance) {
      differences++;
    }
  }
  return differences;
}
export function compareImages(img1Path, img2Path, diffPath) {
    const img1 = PNG.sync.read(fs.readFileSync(img1Path));
    const img2 = PNG.sync.read(fs.readFileSync(img2Path));
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    return numDiffPixels;
}
export async function verdictChecker(params) {
    var x=await takeScreenshot(params.element,params.css1);
    var y=await takeScreenshot(params.element,params.css2);
    // const diffPixels = compareImages(x,y);
    // if(diffPixels===0){return true;}
    const s=await compareScreenshots(x,y);
    if(s===0)return true;
    return false;
}



export async function questionImageCapture(params) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`
        <html>
        <head>
            <style>${params.css}</style>
        </head>
        <body class="body">
            ${params.element}
        </body>
        </html>
    `);
    var s= (await page.screenshot({type:PNG,encoding:"base64"}));
    await browser.close();
    return s.toString('base64');
}