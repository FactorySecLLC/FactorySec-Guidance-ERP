document.addEventListener('DOMContentLoaded', loadOffboardingProcedureData);

async function loadOffboardingProcedureData() {
    const vendors = await fetchVendors();
    const offboardingData = await fetchOffboardingData();

    const container = document.getElementById('offboarding-procedure-container');
    container.innerHTML = '';

    vendors.forEach((vendor, index) => {
        const vendorDiv = document.createElement('div');
        vendorDiv.classList.add('vendor-item');

        vendorDiv.innerHTML = `
            <h3>${vendor.name}</h3>
            <button onclick="toggleVendorInfo(${index})" id="toggle-button-${index}">Show Offboarding Information</button>
            <div class="vendor-info" id="vendor-info-${index}" style="display: none;">
                <div class="question-group">
                    <label for="termination-reason-${index}">Describe the reason for terminating the vendor relationship.</label>
                    <textarea id="termination-reason-${index}">${offboardingData[vendor.name]?.terminationReason || ''}</textarea>
                </div>
                <div class="question-group">
                    <label for="termination-date-${index}">What is the official date of termination of the vendor contract?</label>
                    <input type="date" id="termination-date-${index}" value="${offboardingData[vendor.name]?.terminationDate || ''}">
                </div>
                <div class="question-group">
                    <label>Have all vendor access rights to systems, networks, and facilities been revoked?</label>
                    <select id="access-revoked-${index}" onchange="toggleSection('${index}', 'access-details', this.value, true)">
                        <option value="" ${offboardingData[vendor.name]?.accessRevoked === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.accessRevoked === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.accessRevoked === 'no' ? 'selected' : ''}>No</option>
                    </select>
                    <div id="access-details-${index}" class="toggle-section" style="display: ${offboardingData[vendor.name]?.accessRevoked === 'no' ? 'block' : 'none'};">
                        <label for="remaining-access-${index}">Provide details on any remaining access or planned actions.</label>
                        <textarea id="remaining-access-${index}">${offboardingData[vendor.name]?.remainingAccess || ''}</textarea>
                    </div>
                </div>
                <div class="question-group">
                    <label>Have all user accounts associated with the vendor been deactivated?</label>
                    <select id="accounts-deactivated-${index}">
                        <option value="" ${offboardingData[vendor.name]?.accountsDeactivated === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.accountsDeactivated === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.accountsDeactivated === 'no' ? 'selected' : ''}>No</option>
                    </select>
                </div>
                <div class="question-group">
                    <label>Have all physical access cards, devices, or keys provided to the vendor been returned?</label>
                    <select id="access-cards-returned-${index}">
                        <option value="" ${offboardingData[vendor.name]?.accessCardsReturned === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.accessCardsReturned === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.accessCardsReturned === 'no' ? 'selected' : ''}>No</option>
                    </select>
                </div>
                <div class="question-group">
                    <label>Has the vendor returned or securely disposed of all data related to our organization?</label>
                    <select id="data-returned-${index}" onchange="toggleSection('${index}', 'data-method', this.value)">
                        <option value="" ${offboardingData[vendor.name]?.dataReturned === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.dataReturned === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.dataReturned === 'no' ? 'selected' : ''}>No</option>
                    </select>
                    <div id="data-method-${index}" class="toggle-section" style="display: ${offboardingData[vendor.name]?.dataReturned === 'yes' ? 'block' : 'none'};">
                        <label for="data-method-details-${index}">Specify the method of return or disposal.</label>
                        <textarea id="data-method-details-${index}">${offboardingData[vendor.name]?.dataMethod || ''}</textarea>
                    </div>
                </div>
                <div class="question-group">
                    <label>Is there a need for the vendor to retain any of our data for a specific period (e.g., regulatory compliance)?</label>
                    <select id="data-retention-${index}" onchange="toggleSection('${index}', 'data-retention-details', this.value)">
                        <option value="" ${offboardingData[vendor.name]?.dataRetention === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.dataRetention === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.dataRetention === 'no' ? 'selected' : ''}>No</option>
                    </select>
                    <div id="data-retention-details-${index}" class="toggle-section" style="display: ${offboardingData[vendor.name]?.dataRetention === 'yes' ? 'block' : 'none'};">
                        <label for="retention-period-${index}">What's the data retention period and purpose?</label>
                        <textarea id="retention-period-${index}">${offboardingData[vendor.name]?.retentionPeriod || ''}</textarea>
                    </div>
                </div>
                <div class="question-group">
                    <label>Have all contractual obligations been reviewed and fulfilled by both parties?</label>
                    <select id="obligations-fulfilled-${index}" onchange="toggleSection('${index}', 'obligations-details', this.value, true)">
                        <option value="" ${offboardingData[vendor.name]?.obligationsFulfilled === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.obligationsFulfilled === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.obligationsFulfilled === 'no' ? 'selected' : ''}>No</option>
                    </select>
                    <div id="obligations-details-${index}" class="toggle-section" style="display: ${offboardingData[vendor.name]?.obligationsFulfilled === 'no' ? 'block' : 'none'};">
                        <label for="outstanding-obligations-${index}">Detail any outstanding obligations or actions.</label>
                        <textarea id="outstanding-obligations-${index}">${offboardingData[vendor.name]?.outstandingObligations || ''}</textarea>
                    </div>
                </div>
                <div class="question-group">
                    <label>Has the vendor complied with all security clauses in the contract related to offboarding?</label>
                    <select id="security-compliance-${index}">
                        <option value="" ${offboardingData[vendor.name]?.securityCompliance === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.securityCompliance === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.securityCompliance === 'no' ? 'selected' : ''}>No</option>
                    </select>
                </div>
                <div class="question-group">
                    <label for="transition-plan-${index}">Describe the plan for transitioning the vendor's services to another provider or internal team.</label>
                    <textarea id="transition-plan-${index}">${offboardingData[vendor.name]?.transitionPlan || ''}</textarea>
                </div>
                <div class="question-group">
                    <label>Have measures been put in place to ensure continuity of services during the transition?</label>
                    <select id="continuity-plan-${index}" onchange="toggleSection('${index}', 'continuity-details', this.value)">
                        <option value="" ${offboardingData[vendor.name]?.continuityPlan === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.continuityPlan === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.continuityPlan === 'no' ? 'selected' : ''}>No</option>
                    </select>
                    <div id="continuity-details-${index}" class="toggle-section" style="display: ${offboardingData[vendor.name]?.continuityPlan === 'yes' ? 'block' : 'none'};">
                        <label for="continuity-plan-details-${index}">Detail the continuity plan.</label>
                        <textarea id="continuity-plan-details-${index}">${offboardingData[vendor.name]?.continuityPlanDetails || ''}</textarea>
                    </div>
                </div>
                <div class="question-group">
                    <label>Have any security risks been identified during the offboarding process?</label>
                    <select id="security-risks-${index}" onchange="toggleSection('${index}', 'risk-details', this.value)">
                        <option value="" ${offboardingData[vendor.name]?.securityRisks === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.securityRisks === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.securityRisks === 'no' ? 'selected' : ''}>No</option>
                    </select>
                    <div id="risk-details-${index}" class="toggle-section" style="display: ${offboardingData[vendor.name]?.securityRisks === 'yes' ? 'block' : 'none'};">
                        <label for="risks-mitigation-${index}">Describe the risks and mitigation plans.</label>
                        <textarea id="risks-mitigation-${index}">${offboardingData[vendor.name]?.risksMitigation || ''}</textarea>
                    </div>
                </div>
                <div class="question-group">
                    <label>Was a final cybersecurity audit conducted on the vendor before termination?</label>
                    <select id="cyber-audit-${index}" onchange="toggleSection('${index}', 'audit-details', this.value)">
                        <option value="" ${offboardingData[vendor.name]?.cyberAudit === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.cyberAudit === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.cyberAudit === 'no' ? 'selected' : ''}>No</option>
                    </select>
                    <div id="audit-details-${index}" class="toggle-section" style="display: ${offboardingData[vendor.name]?.cyberAudit === 'yes' ? 'block' : 'none'};">
                        <label for="audit-findings-${index}">Summarize the findings.</label>
                        <textarea id="audit-findings-${index}">${offboardingData[vendor.name]?.auditFindings || ''}</textarea>
                    </div>
                </div>
                <div class="question-group">
                    <label>Does the vendor need to continue reporting any cybersecurity incidents after termination?</label>
                    <select id="incident-reporting-${index}" onchange="toggleSection('${index}', 'reporting-details', this.value)">
                        <option value="" ${offboardingData[vendor.name]?.incidentReporting === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.incidentReporting === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.incidentReporting === 'no' ? 'selected' : ''}>No</option>
                    </select>
                    <div id="reporting-details-${index}" class="toggle-section" style="display: ${offboardingData[vendor.name]?.incidentReporting === 'yes' ? 'block' : 'none'};">
                        <label for="reporting-requirements-${index}">Outline the duration and scope of this reporting requirement.</label>
                        <textarea id="reporting-requirements-${index}">${offboardingData[vendor.name]?.reportingRequirements || ''}</textarea>
                    </div>
                </div>
                <div class="question-group">
                    <label for="vendor-contact-${index}">Who will be the point of contact at the vendor’s organization in case of post-termination security incidents?</label>
                    <textarea id="vendor-contact-${index}">${offboardingData[vendor.name]?.vendorContact || ''}</textarea>
                </div>
                <div class="question-group">
                    <label>Has the vendor submitted their final invoice?</label>
                    <select id="final-invoice-${index}" onchange="toggleSection('${index}', 'invoice-details', this.value)">
                        <option value="" ${offboardingData[vendor.name]?.finalInvoice === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.finalInvoice === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.finalInvoice === 'no' ? 'selected' : ''}>No</option>
                    </select>
                    <div id="invoice-details-${index}" class="toggle-section" style="display: ${offboardingData[vendor.name]?.finalInvoice === 'yes' ? 'block' : 'none'};">
                        <label for="invoice-confirmation-${index}">Confirm whether the invoice has been paid.</label>
                        <textarea id="invoice-confirmation-${index}">${offboardingData[vendor.name]?.invoiceConfirmation || ''}</textarea>
                    </div>
                </div>
                <div class="question-group">
                    <label>Have all financial obligations between our organization and the vendor been cleared?</label>
                    <select id="financial-obligations-cleared-${index}">
                        <option value="" ${offboardingData[vendor.name]?.financialObligationsCleared === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.financialObligationsCleared === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.financialObligationsCleared === 'no' ? 'selected' : ''}>No</option>
                    </select>
                </div>
                <div class="question-group">
                    <label for="offboarding-summary-${index}">Provide a summary of the offboarding process, including any notable issues or successes.</label>
                    <textarea id="offboarding-summary-${index}">${offboardingData[vendor.name]?.offboardingSummary || ''}</textarea>
                </div>
                <div class="question-group">
                    <label for="lessons-learned-${index}">Document any lessons learned during the offboarding process that could improve future vendor management.</label>
                    <textarea id="lessons-learned-${index}">${offboardingData[vendor.name]?.lessonsLearned || ''}</textarea>
                </div>
                <div class="question-group">
                    <label>Have all regulatory and legal requirements related to the vendor’s services been met?</label>
                    <select id="regulatory-requirements-${index}" onchange="toggleSection('${index}', 'regulatory-details', this.value, true)">
                        <option value="" ${offboardingData[vendor.name]?.regulatoryRequirements === '' ? 'selected' : ''}></option>
                        <option value="yes" ${offboardingData[vendor.name]?.regulatoryRequirements === 'yes' ? 'selected' : ''}>Yes</option>
                        <option value="no" ${offboardingData[vendor.name]?.regulatoryRequirements === 'no' ? 'selected' : ''}>No</option>
                    </select>
                    <div id="regulatory-details-${index}" class="toggle-section" style="display: ${offboardingData[vendor.name]?.regulatoryRequirements === 'no' ? 'block' : 'none'};">
                        <label for="regulatory-steps-${index}">Outline the steps that still need to be completed.</label>
                        <textarea id="regulatory-steps-${index}">${offboardingData[vendor.name]?.regulatorySteps || ''}</textarea>
                    </div>
                </div>
                <div class="vendor-buttons">
                    <button onclick="saveOffboardingData('${vendor.name}', ${index})">Save</button>
                </div>
            </div>
        `;

        container.appendChild(vendorDiv);
    });
}

function toggleVendorInfo(index) {
    const infoDiv = document.getElementById(`vendor-info-${index}`);
    const toggleButton = document.getElementById(`toggle-button-${index}`);

    if (infoDiv.style.display === 'none' || !infoDiv.style.display) {
        infoDiv.style.display = 'block';
        toggleButton.innerText = 'Hide Offboarding Information';
    } else {
        infoDiv.style.display = 'none';
        toggleButton.innerText = 'Show Offboarding Information';
    }
}

function toggleSection(index, sectionId, value, toggleForNo = false) {
    const section = document.getElementById(`${sectionId}-${index}`);
    if (toggleForNo) {
        section.style.display = value === 'no' ? 'block' : 'none';
    } else {
        section.style.display = value === 'yes' ? 'block' : 'none';
    }
}

async function fetchVendors() {
    const response = await fetch('/suppliers-data');
    const data = await response.json();
    return data.suppliers || [];
}

async function fetchOffboardingData() {
    const response = await fetch('/offboarding-data');
    const data = await response.json();
    return data.offboarding || {};
}



async function saveOffboardingData(vendorName, index) {
    const offboardingQuestionData = {
        terminationReason: document.getElementById(`termination-reason-${index}`).value,
        terminationDate: document.getElementById(`termination-date-${index}`).value,
        remainingAccess: document.getElementById(`remaining-access-${index}`).value || '',
        accessRevoked: document.getElementById(`access-revoked-${index}`).value || '', // Yes/No
        accountsDeactivated: document.getElementById(`accounts-deactivated-${index}`).value || '', // Yes/No
        accessCardsReturned: document.getElementById(`access-cards-returned-${index}`).value || '', // Yes/No
        dataReturned: document.getElementById(`data-returned-${index}`).value || '', // Yes/No
        dataMethod: document.getElementById(`data-method-details-${index}`).value || '',
        dataRetention: document.getElementById(`data-retention-${index}`).value || '', // Yes/No
        retentionPeriod: document.getElementById(`retention-period-${index}`).value || '',
        obligationsFulfilled: document.getElementById(`obligations-fulfilled-${index}`).value || '', // Yes/No
        outstandingObligations: document.getElementById(`outstanding-obligations-${index}`).value || '',
        securityCompliance: document.getElementById(`security-compliance-${index}`).value || '', // Yes/No
        transitionPlan: document.getElementById(`transition-plan-${index}`).value || '',
        continuityPlan: document.getElementById(`continuity-plan-${index}`).value || '', // Yes/No
        continuityPlanDetails: document.getElementById(`continuity-plan-details-${index}`).value || '',
        securityRisks: document.getElementById(`security-risks-${index}`).value || '', // Yes/No
        risksMitigation: document.getElementById(`risks-mitigation-${index}`).value || '',
        auditFindings: document.getElementById(`audit-findings-${index}`).value || '',
        cyberAudit: document.getElementById(`cyber-audit-${index}`).value || '', // Yes/No
        incidentReporting: document.getElementById(`incident-reporting-${index}`).value || '', // Yes/No
        reportingRequirements: document.getElementById(`reporting-requirements-${index}`).value || '',
        vendorContact: document.getElementById(`vendor-contact-${index}`).value || '',
        finalInvoice: document.getElementById(`final-invoice-${index}`).value || '', // Yes/No
        invoiceConfirmation: document.getElementById(`invoice-confirmation-${index}`).value || '',
        financialObligationsCleared: document.getElementById(`financial-obligations-cleared-${index}`).value || '', // Yes/No
        offboardingSummary: document.getElementById(`offboarding-summary-${index}`).value || '',
        lessonsLearned: document.getElementById(`lessons-learned-${index}`).value || '',
        regulatoryRequirements: document.getElementById(`regulatory-requirements-${index}`).value || '', // Yes/No
        regulatorySteps: document.getElementById(`regulatory-steps-${index}`).value || ''
    };

    const response = await fetch('/save-offboarding', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            vendor: vendorName,
            offboardingQuestionData: offboardingQuestionData,
        }),
    });

    if (response.ok) {
        alert('Offboarding questions saved successfully!');
    } else {
        alert('Failed to save offboarding questions.');
    }
}
