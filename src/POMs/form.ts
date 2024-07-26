import { Page } from "@playwright/test";

export enum MessageContent {
    SUBMIT_SUCCESS = "Your inquiry has been submitted successfully!",
    EMAIL_REQUIRED = "'email' is required",
    EMAIL_VALID = "'email' is not a valid email"
}

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
     * @param infoSource: one of list "Search engines" | "Recommended by friend" | "Social media" | "Email marketing" | "Other".
     */
    async selectInfoSource(infoSource: string) {
        const firstNameLocator = this.page.locator(`//*[@id="form_item_firstName"]`);
        await firstNameLocator.click();
        await this.page.keyboard.press('Tab');
        
        //Try with happy case when tab on infoSource field in the 1st time. The function will be improved for flexible after
        let timeToPressDown: number;
        switch (infoSource) {
            case "Search engines":
                timeToPressDown = 5;
                break;
            case "Recommended by friend":
                timeToPressDown = 1;
                break;
            case "Social media":
                timeToPressDown = 2;
                break;
            case "Email marketing":
                timeToPressDown = 3;
                break;
            case "Other":
                timeToPressDown = 4;
                break;
        }
        for (let i = 0; i < timeToPressDown; i++) {
            await this.page.keyboard.down();
        }
        await this.page.keyboard.press('Enter');
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
    async isMessageVisible(message: MessageContent): Promise<boolean> {
        const xpath = `//div[text()="${message}"]`;
        return await this.page.locator(xpath).isVisible();
    }
}
