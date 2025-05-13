const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

// // Helper function to wait for 2–5 seconds randomly
const waitRandom = () => {
  const delay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
  return new Promise((res) => setTimeout(res, delay));
};

const { email, password } = JSON.parse(
  fs.readFileSync(path.join(__dirname, "credentials.json"))
);

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  console.log("Step 1: Navigating to GitHub login page...");
  await page.goto("https://github.com/login", { waitUntil: "networkidle2" });
  await waitRandom();

  console.log("Step 2: Typing email...");
  await page.type("#login_field", email);
  await waitRandom();

  console.log("Step 3: Typing password...");
  await page.type("#password", password);
  await waitRandom();

  console.log("Step 4: Clicking 'Sign in' button...");
  await page.click('input[type="submit"].js-sign-in-button');
  await waitRandom();

  console.log("Step 5: Clicking profile icon...");
  await page.waitForSelector('button[aria-label="Open user navigation menu"]');
  await page.click('button[aria-label="Open user navigation menu"]');
  await waitRandom();

  console.log("Step 6: Clicking 'Your repositories'...");
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click(".prc-ActionList-ActionListContent-sg9-x.prc-Link-Link-85e08"),
  ]);
  await waitRandom();

  console.log("Step 7: Clicking 'Repositories' tab...");
  await page.waitForSelector("#repositories-tab");
  await page.click("#repositories-tab");
  await waitRandom();

  console.log(
    "Step 8: Clicking the 'frontend-interview-topics-summary' repository..."
  );
  await page.waitForSelector(
    'h3.wb-break-all > a[href="/DeveloperOmarFaruk/frontend-interview-topics-summary"]'
  );
  await page.click(
    'h3.wb-break-all > a[href="/DeveloperOmarFaruk/frontend-interview-topics-summary"]'
  );
  await waitRandom();

  console.log("Step 9: Clicking the edit (pencil) button...");
  await page.waitForSelector('button[aria-label="Edit file"]');
  await page.click('button[aria-label="Edit file"]');
  await waitRandom();

  console.log("Step 10: Removing '#' from the file...");
  await page.keyboard.press("Home");
  await page.keyboard.press("Delete");
  await waitRandom();

  console.log("Step 11: Clicking the 'Commit changes...' button...");
  await page.waitForSelector('button[data-hotkey="Mod+s"]');
  await page.click('button[data-hotkey="Mod+s"]');
  await waitRandom();

  console.log("Step 12: Typing commit message...");
  await page.waitForSelector("textarea#commit-description-input");
  await page.type("textarea#commit-description-input", "updated");
  await waitRandom();

  console.log("Step 13: Clicking 'Commit changes' button...");
  await page.waitForSelector("button[aria-disabled='false']");
  await page.click("button[aria-disabled='false']");
  await waitRandom();

  console.log("Step 14: Clicking the edit (pencil) button...");
  await page.waitForSelector('a[aria-label="Edit file"]');
  await page.click('a[aria-label="Edit file"]');
  await waitRandom();

  console.log("Step 15: Typing '#' in the div...");
  await page.waitForSelector("div.cm-line");
  await page.click("div.cm-line");
  await page.type("div.cm-line", "#");
  await waitRandom();

  console.log("Step 16: Clicking the 'Commit changes...' button...");
  await page.waitForSelector('button[data-hotkey="Mod+s"]');
  await page.click('button[data-hotkey="Mod+s"]');
  await waitRandom();

  console.log("Step 17: Typing commit message...");
  await page.waitForSelector("textarea#commit-description-input");
  await page.type("textarea#commit-description-input", "updated");
  await waitRandom();

  console.log("Step 18: Clicking 'Commit changes' button...");
  await page.waitForSelector("button[aria-disabled='false']");
  await page.click("button[aria-disabled='false']");
  await waitRandom();

  console.log(
    "Step 19: Changes committed. Waiting randomly before closing browser..."
  );
  await waitRandom();

  console.log("Step 20: Closing browser...");
  await browser.close();
  console.log("Done.");

  if (process.send) {
    process.send("done");
  }
})();
