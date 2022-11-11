import {browser, by, element, ElementFinder, ExpectedConditions as EC} from 'protractor';
import {waitForElementClickable, waitForElementDisplayed, waitForElementPresence} from "../../utils/waits";
import {click, fillFieldWithText} from "../../utils/protractorHelpers";
import CreateAuditContentPane from "./CreateAuditContentPane";

export default class CreateAudit {

    async createRepository(name?: string, createAuditPane?: CreateAuditContentPane) {
        await browser.sleep(1000);
        let auditName = "AutomationAudit"+ name + Date.now();
        await createAuditPane.enterAuditName(auditName);
        await createAuditPane.navigateNextPage();
        await createAuditPane.selectArchiveDate();
        await createAuditPane.selectSentDate();
        await expect(createAuditPane.checkBoxSentDate.isSelected()).toBe(false, "Sent date range checkbox is not deselected");
        await expect(createAuditPane.checkBoxArchiveDate.isSelected()).toBe(true, "Archive date range checkbox is not selected");
        await createAuditPane.navigateNextPage();
        await createAuditPane.showAllRepository();
        await createAuditPane.selectAllRepositories();
        await createAuditPane.next();
        await createAuditPane.navigateNextPage();
    }
    
	async createRepositoryWithSentDate(name?: string, createAuditPane?: CreateAuditContentPane) {
        await browser.sleep(1000);
        let auditName = "AutomationAudit"+ name + Date.now();
        await createAuditPane.enterAuditName(auditName);
        await createAuditPane.navigateNextPage();
        await expect(createAuditPane.checkBoxSentDate.isSelected()).toBe(true, "Sent date range checkbox is not deselected");
        await expect(createAuditPane.checkBoxArchiveDate.isSelected()).toBe(false, "Archive date range checkbox is not selected");
    }
    
    async proceedtoCreateAudit(createAuditPane?: CreateAuditContentPane){
        await createAuditPane.navigateNextPage();
        await createAuditPane.showAllRepository();
        await createAuditPane.selectAllRepositories();
        await createAuditPane.next();
        await createAuditPane.navigateNextPage();
    }
    
    async createQuery(createAuditPane?: CreateAuditContentPane, query?: string) {
        await createAuditPane.selectQuery();
        await createAuditPane.enterQuery(query);
    }
    
    async createQueryWithSentDate(createAuditPane?: CreateAuditContentPane, query?: string) {
        await createAuditPane.selectBodyOrAttachmentQuery();
        await createAuditPane.enterQuery(query);
    }
   
    async createQueryForEmailVariance(createAuditPane?: CreateAuditContentPane, query?: string) {
        await createAuditPane.queryForEmailVariance();
        await createAuditPane.enterQuery(query);
    }

    async formatType(createAuditPane?: CreateAuditContentPane, formatType?: string) {
        await createAuditPane.next();
        await createAuditPane.selectFormat(formatType);
        await createAuditPane.removePauseAfterEstimates();
        await expect(createAuditPane.checkBoxPauseAfterEstimate.isSelected()).toBe(false, "Pause after estimates checkbox is not unselected");
    }

    async duplicateType(createAuditPane?: CreateAuditContentPane, duplicateType?: string) {
        await createAuditPane.selectManageDuplicates(duplicateType);
    }

    async archiveFormat(createAuditPane?: CreateAuditContentPane, archiveFormat?: string) {
        await createAuditPane.selectArchiveFormat(archiveFormat);
    }

    async deliveryBy(createAuditPane?: CreateAuditContentPane, deliveryBy?: string) {
        await createAuditPane.selectDeliveryResult(deliveryBy);
    }

    async runAudit(createAuditPane?: CreateAuditContentPane) {
        await createAuditPane.next();
        await createAuditPane.next();
        await createAuditPane.createAudit();
    }
	
    async confirmAndRunAudit(createAuditPane?: CreateAuditContentPane) {
        await createAuditPane.next();
        await createAuditPane.next();
        await createAuditPane.vaerifySingleUserPackagingOnConfirmPage();
        await createAuditPane.createAudit();
    }
    
    async validateAuditStatus(createAuditPane?: CreateAuditContentPane) {
        let status = await createAuditPane.getParticularContentInReportTable( 11);
        await browser.refresh();
        if (status != 'Completed') {
            await browser.wait(async () => {
                await browser.sleep(5000);
                await browser.refresh();
                status = await createAuditPane.getParticularContentInReportTable(11)
                if (status === 'Completed' || status === 'Running /Query') {
                    return true;
                }
            }, 100000)
        }
        return status;
    }

    async validatePausedStatus(createAuditPane?: CreateAuditContentPane) {
        let status = await createAuditPane.getParticularContentInReportTable(11);
        await browser.refresh();
        if (status != 'Paused /\n' + 'Move Unique Hits') {
            await browser.wait(async () => {
                await browser.sleep(5000);
                await browser.refresh();
                status = await createAuditPane.getParticularContentInReportTable(11)
                if (status === 'Paused /\n' + 'Move Unique Hits') {
                    return true;
                }
            }, 100000)
        }
        return status;
    }

    async validatePausedStatusForPreservationPolicy(createAuditPane?: CreateAuditContentPane) {
        let status = await createAuditPane.getParticularContentInReportTable(11);
        await browser.refresh();
        if (status != 'Reviewing /\n' + 'Post-verification' || status != 'Paused /\n' +'Estimate' ) {
            await browser.wait(async () => {
                await browser.sleep(5000);
                await browser.refresh();
                status = await createAuditPane.getParticularContentInReportTable(11)
                if (status === 'Reviewing /\n' + 'Post-verification' || status === 'Paused /\n' +'Estimate') {
                    return true;
                }
            }, 100000)
        }
        return status;
    }
    
	async getEstimatedResult(createAuditPane?: CreateAuditContentPane) {
		let status = await this.validateAuditStatus(createAuditPane);
		let resultCount = await createAuditPane.getParticularContentInReportTable(15);
		return resultCount;
	}
	
	async createRepositoryForSingleUserPackagingWithOneCustodian(name?: string, createAuditPane?: CreateAuditContentPane) {
		let auditName = "AutomationAudit" + name + Date.now();
		await createAuditPane.enterAuditName(auditName);
		await createAuditPane.navigateNextPage();
		await createAuditPane.selectArchiveDate();
		await createAuditPane.selectSentDate();
		await expect(createAuditPane.checkBoxSentDate.isSelected()).toBe(false, "Sent date range checkbox is not deselected");
		await expect(createAuditPane.checkBoxArchiveDate.isSelected()).toBe(true, "Archive date range checkbox is not selected");
		await createAuditPane.navigateNextPage();
		await createAuditPane.showAllRepository();
		await createAuditPane.selectAllRepositories();
		await createAuditPane.next();
	}
	
	async selectOneCustodiansAndProceed(firstName1?: string, lastName1?: string, createAuditPane?: CreateAuditContentPane) {
		await createAuditPane.selectCustodian(firstName1, lastName1);
		await createAuditPane.navigateNextPage();
		await createAuditPane.validateCustodianOnQueryPage(firstName1,lastName1);
	}
	
	async createRepositoryForSingleUserPackagingWithTwoCustodians(name?: string, createAuditPane?: CreateAuditContentPane) {
		let auditName = "AutomationAudit" + name + Date.now();
		await createAuditPane.enterAuditName(auditName);
		await createAuditPane.navigateNextPage();
		await createAuditPane.selectArchiveDate();
		await createAuditPane.selectSentDate();
		await expect(createAuditPane.checkBoxSentDate.isSelected()).toBe(false, "Sent date range checkbox is not deselected");
		await expect(createAuditPane.checkBoxArchiveDate.isSelected()).toBe(true, "Archive date range checkbox is not selected");
		await createAuditPane.navigateNextPage();
		await createAuditPane.showAllRepository();
		await createAuditPane.selectAllRepositories();
		await createAuditPane.next();
	}
	
	async selectTwoCustodiansAndProceed(firstName1?: string, lastName1?: string, firstName2?: string, lastName2?: string, createAuditPane?: CreateAuditContentPane) {
		await createAuditPane.selectCustodian(firstName1, lastName1);
		await createAuditPane.selectCustodian(firstName2, lastName2);
		await createAuditPane.navigateNextPage();
	}

	async createCustodian(firstName?: string, lastName?: string, recipientEmail?: string, createAuditPane?: CreateAuditContentPane) {
		await createAuditPane.clickOnCreateCustodian();
		await createAuditPane.enterFirstName(firstName);
		await createAuditPane.enterLastName(lastName);
		await createAuditPane.selectOptionAsRecipient();
		await createAuditPane.enterRecipientName(recipientEmail);
		await createAuditPane.clickOnaddButton();
		await createAuditPane.clickOnaddButton();
		await createAuditPane.clickOnSaveCustodian();
	}

	async deleteCustodian(firstName?: string, lastName?: string, createAuditPane?: CreateAuditContentPane) {
		await createAuditPane.clickOnDeleteCustodian(firstName, lastName);
		await browser.driver.switchTo().alert().accept();
	}

	async clickOnAuditManagemetPage(createAuditPane?: CreateAuditContentPane) {
		await createAuditPane.clickOnAuditManagemetPage();
	}
	
	async validateAuditDetails(createAuditPane?: CreateAuditContentPane) {
		await createAuditPane.clickOnFirstAudit();
		
		
	}
	
}