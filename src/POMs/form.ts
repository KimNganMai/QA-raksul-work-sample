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
     * @param infoSource: one of list "Search engines" | "Recommended by friend" | "Social media" | "Email marketing" | "Other".
     */
    async selectInfoSource(infoSource: string) {
        const firstNameLocator = this.page.locator(`//*[@id="form_item_firstName"]`);
        await firstNameLocator.click();
        await this.page.keyboard.press('Tab');

        //Define the default index for each info Source option
        const infoSourceOptions = ["Search engines", "Recommended by friend", "Social media", "Email marketing", "Other"];

        //Get index of expected option source
        const infoSourceIndex = infoSourceOptions.indexOf(infoSource);

        //Get index of current option source
        const infoSourceFieldLocator = this.page.locator(`//input[@id="form_item_infoSource"]`);
        const activedescendantValue = await infoSourceFieldLocator.getAttribute('aria-activedescendant'); //Format: "form_item_infoSource_list_${index}"
        const currentInfoSourceIndex = Number(activedescendantValue.split("_", last()));

        //Calculate time to press up or down to choose the infoSource
        let timeToPressDown: number;
        timeToPressDown = currentInfoSourceIndex - infoSourceIndex;
        if (timeToPressDown < 0) {
            for (let i = 0; i < Math.abs(timeToPressDown); i++) {
                await this.page.keyboard.down();
            }
        } else if (timeToPressDown > 0) {
            for (let i = 0; i < timeToPressDown; i++) {
                await this.page.keyboard.up();
            }
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
