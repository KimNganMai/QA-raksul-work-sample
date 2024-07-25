import { Page } from "@playwright/test";

export class Form {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Input data to text field
     * @param fieldName 
     * @param fieldData 
     */
    async inputTextField(fieldName: string, fieldData: string) {
        const field = this.page.locator(`//*[@id="form_item_${fieldName}"]`);
        await field.fill(fieldData);
    }

    /**
     * Select "Where did you hear about us?" drop-down
     * Note: Function not ready
     * @param infoSource 
     */
    async selectInfoSource(infoSource: string) {
        const field = `//span[@class="ant-select-arrow"]`;
        await this.page.locator(field).scrollIntoViewIfNeeded();
        await this.page.locator(field).click();
        // Can not click, and I don't know why.

        // await this.page.addInitScript(() => {
        //     document.addEventListener('mousemove', event => {
        //       var bullet = document.getElementsByClassName("editor-bullet")[0] as HTMLElement
        //       bullet.dataset.mousePosX = String(event.pageX);
        //       bullet.dataset.mousePosY = String(event.pageY);
        //     })
        //   })

        // const [mousePosX, mousePosY] = await this.page.evaluate(() => {
        //     let bullet = document.getElementsByClassName("editor-bullet")[0] as HTMLElement
        //     return [Number(bullet.dataset.mousePosX), Number(bullet.dataset.mousePosY)]
        // });

        // await this.page.mouse.move(mousePosX + 50, mousePosY);
        // await this.page.waitForTimeout(10000);
    }

    /**
     * Tick on Service checkbox with label
     * @param service 
     */
    async selectServiceOfInterest (service: string) {
        const checkbox = this.page.locator(`//label[child::span[text()="${service}"]]//input[@type="checkbox"]`);
        await checkbox.check();
    }

    /**
     * Select multiple services of interest
     * @param services: string of multiple services, split by "; "
     * Example: "Printing; Logistics"
     */
    async selectServicesOfInterest(services: string) {
        const listSevices = services.split("; ");
        for (let service of listSevices) {
            await this.selectServiceOfInterest(service);
        }
    }

    /**
     * Select Type Of Association by label
     * @param type 
     */
    async selectTypeOfAssociation (type: string) {
        const radioBtn = this.page.locator(`//label[child::span[text()="${type}"]]//input[@type="radio"]`);
        await radioBtn.check();
    }

    /**
     * Input multiple fields of form
     */
    async inputData(data: {
        email?: string;
        lastName?: string;
        firstName?: string;
        infoSource?: "Search engines" | "Recommended by friend" | "Social media" | "Email marketing" | "Other";
        servicesOfInterest?: string;
        typeOfAssociation?: "Prospect" | "Partner" | "Reseller" | "Vendor" | "Other";
        explanation?: string;
    }) {
        for (const [key, value] of Object.entries(data)) {
            switch (key) {
                case "email":
                case "lastName":
                case "firstName":
                case "explanation":
                    await this.inputTextField(key, value);
                    break;
                case "infoSource":
                    await this.selectInfoSource(value);
                    break;
                case "servicesOfInterest":
                    await this.selectServicesOfInterest(value);
                    break;
                case "typeOfAssociation":
                    await this.selectTypeOfAssociation(value);
                    break;
            }
        }
    }

    /**
     * Return True if Message is visible
     * @param message 
     * @returns 
     */
    async isMessageVisible(message: string): Promise<boolean> {
        const xpath = `//div[text()="${message}"]`;
        return await this.page.locator(xpath).isVisible();
    }
}