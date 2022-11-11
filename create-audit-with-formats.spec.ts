import {login} from "../../../flows/digitalsafe/LoginUtils";
import {browser, protractor} from "protractor";
import {dsTeardown} from "../../../utils/TearDown"
import DSOldSplashPage from "../../../page-objects/digitalsafe/DSOldSplashPage";
import AuditCenterHomePage from "../../../page-objects/digitalsafe/AuditCenterHomePage";
import CreateAudit from "../../../page-objects/digitalsafe/CreateAudit";

describe("Suite::Create audit with different delivery/workflow combinations", function () {
    const auditData = require('../../../data/digitalsafe/audit.json');

    let create = new CreateAudit;

    beforeEach(async () => {
        await browser.waitForAngularEnabled(false);
        let dsOldSplashPage = new DSOldSplashPage();
        await login();
        await dsOldSplashPage.clickAuditCenterHeader();
    });

 /*   it("Test::Creation of audit with no data conversion format", async function () {
        await browser.logger.info("This test creates an audit with no data conversion format");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("NoDataConversion",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890");
        await create.formatType(createAuditPane, auditData.audit.format1);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit with PST conversion", async function () {
        await browser.logger.info("This test creates an with PST conversion");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("PST",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890");
        await create.formatType(createAuditPane, auditData.audit.format2);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit with native with metadata format", async function () {
        await browser.logger.info("This test creates an audit with native with metadata format");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("NativeWithMetadata",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format3)
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit for PST conversion with total de-duplication ", async function () {
        await browser.logger.info("This test creates an audit for PST conversion with total de-duplication");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("PST_totalMsg",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format2);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType1);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit for PST conversion with no duplication ", async function () {
        await browser.logger.info("This test creates an audit for PST conversion with no duplication");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("PST_NoDup",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format2);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType2);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit for native with metadata and total de-duplication ", async function () {
        await browser.logger.info("This test creates an audit for native with metadata and total de-duplication");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("NM_TotalMsg",  createAuditPane );
        await create.createQuery(createAuditPane,"634567890" );
        await create.formatType(createAuditPane, auditData.audit.format3);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType1);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit for native with metadata and no duplication ", async function () {
        await browser.logger.info("This test creates an audit for native with metadata and no duplication");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("NM_NoDup",  createAuditPane );
        await create.createQuery(createAuditPane,"634567890" );
        await create.formatType(createAuditPane, auditData.audit.format3);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType2);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit for PST and total de-duplication with No Archives ", async function () {
        await browser.logger.info("This test creates an audit for PST and total de-duplication with No Archives");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("PST_NoArchive",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format2);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType1);
        await create.archiveFormat(createAuditPane, auditData.audit.archiveFormat1);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit for PST and total de-duplication with Zip(s)No compression ", async function () {
        await browser.logger.info("This test creates an audit for PST and total de-duplication with Zip(s)No compression");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("PST_TotalMsg_NoCmp",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format2);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType1);
        await create.archiveFormat(createAuditPane, auditData.audit.archiveFormat3);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit for PST and no duplication with Zip(s)No compression ", async function () {
        await browser.logger.info("This test creates an audit for PST and no duplication with Zip(s)No compression");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("PST_NoCompression",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format2);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType2);
        await create.archiveFormat(createAuditPane, auditData.audit.archiveFormat3);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit for native metadata and total de-duplication with No Archives ", async function () {
        await browser.logger.info("This test creates an audit for native metadata and total de-duplication with No Archives ");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("NM_NoArchive",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format3);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType1);
        await create.archiveFormat(createAuditPane, auditData.audit.archiveFormat1);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit for native metadata and no duplication with No Archives ", async function () {
        await browser.logger.info("This test creates an audit for native metadata and no duplication with No Archives ");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("NM_NoCompression",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format3);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType2);
        await create.archiveFormat(createAuditPane, auditData.audit.archiveFormat1);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit for native metadata and no duplication with Zip(s)No compression ", async function () {
        await browser.logger.info("This test creates an audit for native metadata and no duplication with Zip(s)No compression");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("NM_NoCompression",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format3);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType2);
        await create.archiveFormat(createAuditPane, auditData.audit.archiveFormat3);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit with secure FTP delivery result", async function () {
        await browser.logger.info("This test creates an audit with secure ftp delivery result");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("PST_FTP",  createAuditPane );
        await create.createQuery(createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format2);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType3);
        await create.archiveFormat(createAuditPane, auditData.audit.archiveFormat2);
        await create.deliveryBy(createAuditPane, auditData.audit.deliveryBy);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit with no delivery result", async function () {
        await browser.logger.info("This test creates an audit with no delivery result");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("PST_NoDelivery",  createAuditPane );
        await create.createQuery( createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format2);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType3);
        await create.archiveFormat(createAuditPane, auditData.audit.archiveFormat2);
        await create.deliveryBy(createAuditPane, auditData.audit.noDelivery);
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });

    it("Test::Creation of audit with encrypt results", async function () {
        await browser.logger.info("This test creates an audit with encrypt results");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("Encrypt_Results",  createAuditPane );
        await create.createQuery( createAuditPane, "634567890" );
        await create.formatType(createAuditPane, auditData.audit.format1);
        await create.duplicateType(createAuditPane, auditData.audit.duplicateType3);
        await create.archiveFormat(createAuditPane, auditData.audit.archiveFormat2);
        await create.deliveryBy(createAuditPane, auditData.audit.ftpDelivery);
        await createAuditPane.selectEncryptResult();
        await expect(createAuditPane.checkBoxEncryptResult.isSelected()).toBe(true, "Encrypt result checkbox is not deselected");
        await createAuditPane.enterPassphrase("skyline  ");
        await browser.actions().sendKeys(protractor.Key.TAB).perform();
        await browser.driver.switchTo().alert().accept();
        await createAuditPane.enterPassphrase("skyline");
        await createAuditPane.enterPassphraseChk("skyline")
        await create.runAudit(createAuditPane);
        let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
    });
       
    it("Test::Create Audit with Pause for review", async function () {
        await browser.logger.info("This test creates an audit with Pause for review");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepository("PauseForReview",  createAuditPane );
        await create.createQuery(createAuditPane,"634567890" );
        await create.formatType(createAuditPane, auditData.audit.format2);
        await createAuditPane.selectPauseForReview();
        await expect(createAuditPane.checkBoxPauseForReview.isSelected()).toBe(true, "PauseForReview checkbox is not selected");
        await create.runAudit(createAuditPane);
        let status = await create.validatePausedStatusForPreservationPolicy(createAuditPane);
        await expect(status).toContain("Reviewing", "Status is not completed but it is: " + status);
    }); 
       
    it("Test::Create Audit with Preservation policy", async function () {
        await browser.logger.info("This test an audit creates Preservation policy");
        let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
        await create.createRepositoryWithSentDate("PreservationPolicy",  createAuditPane );
        await createAuditPane.selectDateRangeForSentDate(auditData.audit.sentDateStartMonth, auditData.audit.sentDateStartDay, auditData.audit.sentDateStartYear, auditData.audit.sentDateEndMonth, auditData.audit.sentDateEndDay, auditData.audit.sentDateEndYear);
        await create.proceedtoCreateAudit(createAuditPane);
        await create.createQueryWithSentDate(createAuditPane,auditData.audit.bodyText);
        await createAuditPane.next();
        await createAuditPane.selectPreservationPolicy();
        await expect(createAuditPane.checkBoxPreservationPolicy.isSelected()).toBe(true, "Preservation Policy checkbox is not selected");
        await create.runAudit(createAuditPane);
        let status = await create.validatePausedStatusForPreservationPolicy(createAuditPane);
        await expect(status).toContain("Paused", "Status is not completed but it is: " + status);
    }); 
  
	it("Test::Create Audit with Single user packaging with single custodian", async function() {
		await browser.logger.info("This test creates an audit with Single user packaging with one custodian");
		let auditCenterHomePage = new AuditCenterHomePage();
		let createAuditPane = await auditCenterHomePage.clickCreateCustodian();
		await create.createCustodian(auditData.audit.custodian1FirstName, auditData.audit.custodian1LastName, auditData.audit.recipientEmail,createAuditPane);
		await auditCenterHomePage.clickCreateAudit();
		await create.createRepositoryForSingleUserPackagingWithOneCustodian("SingleUserPackaging1", createAuditPane);
		await create.selectOneCustodiansAndProceed(auditData.audit.custodian1FirstName, auditData.audit.custodian1LastName,createAuditPane);
		await create.createQueryWithSentDate(createAuditPane,auditData.audit.bodyText);
		await create.formatType(createAuditPane, auditData.audit.format2);
		await createAuditPane.selectcheckBoxSingleUserPackaging();
		await expect(createAuditPane.checkBoxSingleUserPackaging.isSelected()).toBe(true, "Single user packaging checkbox is not selected");
		await create.confirmAndRunAudit(createAuditPane);
		await auditCenterHomePage.clickCreateCustodian();
		await create.deleteCustodian(auditData.audit.custodian1FirstName, auditData.audit.custodian1LastName,createAuditPane);
		await create.clickOnAuditManagemetPage(createAuditPane);
		let status = await create.validateAuditStatus(createAuditPane);
        await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
	}); */
	
    it("Test::Create Audit with Single user packaging", async function() {
		await browser.logger.info("This test creates an audit with Single user packaging with two custodians");
		let auditCenterHomePage = new AuditCenterHomePage();
        let createAuditPane = await auditCenterHomePage.clickCreateAudit();
		await create.createRepositoryForSingleUserPackagingWithTwoCustodians("SingleUserPackaging2",createAuditPane);
		await create.createCustodian(auditData.audit.custodian1FirstName, auditData.audit.custodian1LastName, auditData.audit.recipientEmail,createAuditPane);
		await create.createCustodian(auditData.audit.custodian2FirstName, auditData.audit.custodian2LastName, auditData.audit.recipientEmail,createAuditPane);
		await create.selectTwoCustodiansAndProceed(auditData.audit.custodian1FirstName, auditData.audit.custodian1LastName,auditData.audit.custodian2FirstName, auditData.audit.custodian2LastName,createAuditPane);
		await create.createQueryWithSentDate(createAuditPane,auditData.audit.bodyText);
		await create.formatType(createAuditPane, auditData.audit.format2);
		await createAuditPane.selectcheckBoxSingleUserPackaging();
		await expect(createAuditPane.checkBoxSingleUserPackaging.isSelected()).toBe(true, "Single user packaging checkbox is not selected");
		await create.runAudit(createAuditPane);
		await auditCenterHomePage.clickCreateCustodian();
		await create.deleteCustodian(auditData.audit.custodian1FirstName, auditData.audit.custodian1LastName,createAuditPane);
		await create.deleteCustodian(auditData.audit.custodian2FirstName, auditData.audit.custodian2LastName,createAuditPane);
		await create.clickOnAuditManagemetPage(createAuditPane);
	//	let status = await create.validateAuditStatus(createAuditPane);
     //   await expect(status).toContain("Completed", "Status is not completed but it is: " + status);
        await create.validateAuditDetails(createAuditPane);
	}); 

    afterEach(async () => {
        await dsTeardown();
    });
});
