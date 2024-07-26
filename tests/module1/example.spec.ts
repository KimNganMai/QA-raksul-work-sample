import { test, expect } from '@playwright/test';
import { Form, MessageContent } from '../../src/POMs/form';

import fs from 'fs';
import path from 'path';

// Read config from file JSON
const configPath = path.resolve(__dirname, 'example.json');
const suiteConf = JSON.parse(fs.readFileSync(configPath, 'utf8'));

test('TC1: Submit form successfully with all valid information', async ({ page }) => {
  const caseConf = suiteConf.case.TC1;
  const form = new Form(page);
  
  await test.step("Open form then input data",  async () => {
    await page.goto(suiteConf.base_url)
    await form.inputData(caseConf.input_data)
  });
  
  await test.step("Click Submit button then verify",  async () => {
    await page.locator(`//button[@type="submit"]`).click();
    expect(await form.isMessageVisible(MessageContent.SUBMIT_SUCCESS)).toBeTruthy();
  });
});