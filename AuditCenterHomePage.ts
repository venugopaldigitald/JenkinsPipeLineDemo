import {browser, by, element, ElementFinder, ExpectedConditions as EC} from 'protractor';
import {click} from "../../utils/protractorHelpers";
import {waitForElementClickable, waitForElementPresence, waitForElementVisibility} from "../../utils/waits";
import CreateAuditContentPane from "./CreateAuditContentPane";


export default class AuditCenterHomePage {
    createAudit : ElementFinder;
    manageCustodian : ElementFinder;
    private auditOptionsLeftPane = element(by.xpath("//div[@id='leftSide']"));

    constructor() {
        this.createAudit = element(by.xpath("//div[.=' Create Audit ']"));
        this.manageCustodian = element(by.xpath("//div[.=' Manage Custodians ']"));

    }

    async clickCreateAudit() : Promise<CreateAuditContentPane>{
        await browser.wait(EC.visibilityOf(this.createAudit), 2000);
        await waitForElementClickable(this.createAudit, 2000);
        await click(this.createAudit);
        let createAuditContentPane = new CreateAuditContentPane();
        return Promise.resolve(createAuditContentPane);
    }
    
    async clickCreateCustodian() : Promise<CreateAuditContentPane>{
        await browser.wait(EC.visibilityOf(this.manageCustodian), 2000);
        await waitForElementClickable(this.manageCustodian, 2000);
        await click(this.manageCustodian);
        let createAuditContentPane = new CreateAuditContentPane();
        return Promise.resolve(createAuditContentPane);
    }
}