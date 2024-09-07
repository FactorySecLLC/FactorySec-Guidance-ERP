document.addEventListener('DOMContentLoaded', loadOnboardingProcedureData);

async function loadOnboardingProcedureData() {
    const vendors = await fetchVendors();
    const onboardingData = await fetchOnboardingData();

    const container = document.getElementById('onboarding-procedure-container');
    container.innerHTML = '';

    vendors.forEach((vendor, index) => {
        const vendorDiv = document.createElement('div');
        vendorDiv.classList.add('vendor-item');

        vendorDiv.innerHTML = `
            <h3>${vendor.name}</h3>
            <button onclick="toggleVendorInfo(${index})" id="toggle-button-${index}">Show Onboarding Information</button>
            <div class="vendor-info" id="vendor-info-${index}" style="display: none;">
            <div class="question-group">
                    <strong>Vendor Name:</strong> ${vendor.name}
                </div>
                <div class="question-group">
                    <strong>Products/Services Provided:</strong> ${vendor.productsServices}
                </div>
                <div class="question-group">
                    <strong>Vendor Contacts:</strong> ${vendor.contacts.map(contact => `
                        Name: ${contact.name}, Role: ${contact.role}, 
                        Email: ${contact.email}, Phone: ${contact.phone}`).join('<br>')}
                </div>
                <div class="question-group">
                    <strong>Additional Notes:</strong> ${vendor.additionalNotes}
                </div>
                <div class="question-group">
                    <label for="importance-${index}">Explain why this service or product from this vendor is important to your business operations.</label>
                    <textarea id="importance-${index}">${onboardingData[vendor.name]?.importance || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="cyber-policy-${index}">Does the vendor have a formal cybersecurity policy?</label>
                    <select id="cyber-policy-${index}" onchange="toggleCyberPolicyInput(${index})">
                        <option value="no" ${onboardingData[vendor.name]?.cyberPolicy === 'no' ? 'selected' : ''}>No</option>
                        <option value="yes" ${onboardingData[vendor.name]?.cyberPolicy === 'yes' ? 'selected' : ''}>Yes</option>
                    </select>
                </div>
                <div class="question-group" id="cyber-policy-description-${index}" style="display: none;">
                    <label for="policy-description-${index}">Describe the main points of the policy.</label>
                    <textarea id="policy-description-${index}">${onboardingData[vendor.name]?.policyDescription || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="cyber-certifications-${index}">List any cybersecurity certifications or standards the vendor complies with (e.g., ISO 27001, NIST CSF).</label>
                    <textarea id="cyber-certifications-${index}">${onboardingData[vendor.name]?.cyberCertifications || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="security-team-${index}">Does the vendor have a dedicated security team?</label>
                    <select id="security-team-${index}" onchange="toggleSecurityTeamInput(${index})">
                        <option value="no" ${onboardingData[vendor.name]?.securityTeam === 'no' ? 'selected' : ''}>No</option>
                        <option value="yes" ${onboardingData[vendor.name]?.securityTeam === 'yes' ? 'selected' : ''}>Yes</option>
                    </select>
                </div>
                <div class="question-group" id="security-team-description-${index}" style="display: none;">
                    <label for="team-structure-${index}">Provide details of the team’s structure and responsibilities.</label>
                    <textarea id="team-structure-${index}">${onboardingData[vendor.name]?.teamStructure || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="data-protection-${index}">How does the vendor protect sensitive data (e.g., encryption, access controls)?</label>
                    <textarea id="data-protection-${index}">${onboardingData[vendor.name]?.dataProtection || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="incident-response-${index}">Describe the vendor’s incident response process and how quickly they can respond to a breach.</label>
                    <textarea id="incident-response-${index}">${onboardingData[vendor.name]?.incidentResponse || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="risk-management-${index}">How does the vendor assess and manage risks related to their own suppliers and subcontractors?</label>
                    <textarea id="risk-management-${index}">${onboardingData[vendor.name]?.riskManagement || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="data-breach-${index}">Has the vendor been involved in any data breaches or legal actions related to cybersecurity?</label>
                    <select id="data-breach-${index}" onchange="toggleBreachDetailsInput(${index})">
                        <option value="no" ${onboardingData[vendor.name]?.dataBreach === 'no' ? 'selected' : ''}>No</option>
                        <option value="yes" ${onboardingData[vendor.name]?.dataBreach === 'yes' ? 'selected' : ''}>Yes</option>
                    </select>
                </div>
                <div class="question-group" id="breach-details-${index}" style="display: none;">
                    <label for="breach-details-text-${index}">Provide details and the outcomes.</label>
                    <textarea id="breach-details-text-${index}">${onboardingData[vendor.name]?.breachDetails || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="security-audits-${index}">Does the vendor undergo regular security audits?</label>
                    <select id="security-audits-${index}" onchange="toggleAuditDetailsInput(${index})">
                        <option value="no" ${onboardingData[vendor.name]?.securityAudits === 'no' ? 'selected' : ''}>No</option>
                        <option value="yes" ${onboardingData[vendor.name]?.securityAudits === 'yes' ? 'selected' : ''}>Yes</option>
                    </select>
                </div>
                <div class="question-group" id="audit-details-${index}" style="display: none;">
                    <label for="audit-details-text-${index}">Provide the frequency and any relevant results.</label>
                    <textarea id="audit-details-text-${index}">${onboardingData[vendor.name]?.auditDetails || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="recovery-plans-${index}">What are the vendor’s disaster recovery and business continuity plans?</label>
                    <textarea id="recovery-plans-${index}">${onboardingData[vendor.name]?.recoveryPlans || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="cyber-training-${index}">How often does the vendor provide cybersecurity training to their employees?</label>
                    <textarea id="cyber-training-${index}">${onboardingData[vendor.name]?.cyberTraining || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="cyber-responsible-person-${index}">What's the name and contact information of the person responsible for cybersecurity at the vendor’s organization?</label>
                    <textarea id="cyber-responsible-person-${index}">${onboardingData[vendor.name]?.cyberResponsiblePerson || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="shared-responsibilities-${index}">Describe how your organization will share cybersecurity responsibilities with the vendor.</label>
                    <textarea id="shared-responsibilities-${index}">${onboardingData[vendor.name]?.sharedResponsibilities || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="contract-requirements-${index}">List the key cybersecurity requirements that will be included in the vendor’s contract.</label>
                    <textarea id="contract-requirements-${index}">${onboardingData[vendor.name]?.contractRequirements || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="sbom-provision-${index}">Will the vendor provide a detailed list of all software components (SBOM) used in their products/services?</label>
                    <select id="sbom-provision-${index}" onchange="toggleSBOMSection(${index})">
                        <option value="no" ${onboardingData[vendor.name]?.sbomProvision === 'no' ? 'selected' : ''}>No</option>
                        <option value="yes" ${onboardingData[vendor.name]?.sbomProvision === 'yes' ? 'selected' : ''}>Yes</option>
                    </select>
                </div>
                <div class="question-group" id="sbom-details-${index}" style="display: none;">
                    <label for="sbom-text-${index}">Put the text of the section in the contract requiring this provision.</label>
                    <textarea id="sbom-text-${index}">${onboardingData[vendor.name]?.sbomText || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="incident-protocols-${index}">Describe the incident response protocols that will be coordinated between your organization and the vendor.</label>
                    <textarea id="incident-protocols-${index}">${onboardingData[vendor.name]?.incidentProtocols || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="incident-drills-${index}">Will the vendor participate in your incident response drills or simulations?</label>
                    <select id="incident-drills-${index}" onchange="toggleDrillDetails(${index})">
                        <option value="no" ${onboardingData[vendor.name]?.incidentDrills === 'no' ? 'selected' : ''}>No</option>
                        <option value="yes" ${onboardingData[vendor.name]?.incidentDrills === 'yes' ? 'selected' : ''}>Yes</option>
                    </select>
                </div>
                <div class="question-group" id="drill-details-${index}" style="display: none;">
                    <label for="drill-schedule-${index}">Outline the schedule and expectations.</label>
                    <textarea id="drill-schedule-${index}">${onboardingData[vendor.name]?.drillSchedule || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="product-tampering-${index}">How does the vendor ensure their products/services are secure and free from tampering?</label>
                    <textarea id="product-tampering-${index}">${onboardingData[vendor.name]?.productTampering || ''}</textarea>
                </div>

                <div class="question-group">
                    <label for="supply-chain-risks-${index}">Summarize how the vendor manages risks within their own supply chain.</label>
                    <textarea id="supply-chain-risks-${index}">${onboardingData[vendor.name]?.supplyChainRisks || ''}</textarea>
                </div>

                <div class="vendor-buttons">
                    <button onclick="saveOnboardingData('${vendor.name}', ${index})">Save</button>
                </div>
            </div>
        `;

        container.appendChild(vendorDiv);

        // Initial toggle setup
        toggleCyberPolicyInput(index);
        toggleSecurityTeamInput(index);
        toggleBreachDetailsInput(index);
        toggleAuditDetailsInput(index);
        toggleSBOMSection(index);
        toggleDrillDetails(index);
    });
}

function toggleVendorInfo(index) {
    const infoDiv = document.getElementById(`vendor-info-${index}`);
    const toggleButton = document.getElementById(`toggle-button-${index}`);

    if (infoDiv.style.display === 'none' || !infoDiv.style.display) {
        infoDiv.style.display = 'block';
        toggleButton.innerText = 'Hide Onboarding Information';
    } else {
        infoDiv.style.display = 'none';
        toggleButton.innerText = 'Show Onboarding Information';
    }
}

function toggleCyberPolicyInput(index) {
    const select = document.getElementById(`cyber-policy-${index}`);
    const descriptionDiv = document.getElementById(`cyber-policy-description-${index}`);
    descriptionDiv.style.display = select.value === 'yes' ? 'block' : 'none';
}

function toggleSecurityTeamInput(index) {
    const select = document.getElementById(`security-team-${index}`);
    const descriptionDiv = document.getElementById(`security-team-description-${index}`);
    descriptionDiv.style.display = select.value === 'yes' ? 'block' : 'none';
}

function toggleBreachDetailsInput(index) {
    const select = document.getElementById(`data-breach-${index}`);
    const breachDiv = document.getElementById(`breach-details-${index}`);
    breachDiv.style.display = select.value === 'yes' ? 'block' : 'none';
}

function toggleAuditDetailsInput(index) {
    const select = document.getElementById(`security-audits-${index}`);
    const auditDiv = document.getElementById(`audit-details-${index}`);
    auditDiv.style.display = select.value === 'yes' ? 'block' : 'none';
}

function toggleSBOMSection(index) {
    const select = document.getElementById(`sbom-provision-${index}`);
    const sbomDiv = document.getElementById(`sbom-details-${index}`);
    sbomDiv.style.display = select.value === 'yes' ? 'block' : 'none';
}

function toggleDrillDetails(index) {
    const select = document.getElementById(`incident-drills-${index}`);
    const drillDiv = document.getElementById(`drill-details-${index}`);
    drillDiv.style.display = select.value === 'yes' ? 'block' : 'none';
}

async function fetchVendors() {
    const response = await fetch('/suppliers-data');
    const data = await response.json();
    return data.suppliers || [];
}

async function fetchOnboardingData() {
    const response = await fetch('/onboarding-data');
    const data = await response.json();
    return data.onboarding || {};
}

async function saveOnboardingData(vendorName, index) {
    const onboardingQuestionData = {
        importance: document.getElementById(`importance-${index}`).value,
        cyberPolicy: document.getElementById(`cyber-policy-${index}`).value,
        policyDescription: document.getElementById(`policy-description-${index}`)?.value || '',
        cyberCertifications: document.getElementById(`cyber-certifications-${index}`).value,
        securityTeam: document.getElementById(`security-team-${index}`).value,
        teamStructure: document.getElementById(`team-structure-${index}`)?.value || '',
        dataProtection: document.getElementById(`data-protection-${index}`).value,
        incidentResponse: document.getElementById(`incident-response-${index}`).value,
        riskManagement: document.getElementById(`risk-management-${index}`).value,
        dataBreach: document.getElementById(`data-breach-${index}`).value,
        breachDetails: document.getElementById(`breach-details-text-${index}`)?.value || '',
        securityAudits: document.getElementById(`security-audits-${index}`).value,
        auditDetails: document.getElementById(`audit-details-text-${index}`)?.value || '',
        recoveryPlans: document.getElementById(`recovery-plans-${index}`).value,
        cyberTraining: document.getElementById(`cyber-training-${index}`).value,
        cyberResponsiblePerson: document.getElementById(`cyber-responsible-person-${index}`).value,
        sharedResponsibilities: document.getElementById(`shared-responsibilities-${index}`).value,
        contractRequirements: document.getElementById(`contract-requirements-${index}`).value,
        sbomProvision: document.getElementById(`sbom-provision-${index}`).value,
        sbomText: document.getElementById(`sbom-text-${index}`)?.value || '',
        incidentProtocols: document.getElementById(`incident-protocols-${index}`).value,
        incidentDrills: document.getElementById(`incident-drills-${index}`).value,
        drillSchedule: document.getElementById(`drill-schedule-${index}`)?.value || '',
        productTampering: document.getElementById(`product-tampering-${index}`).value,
        supplyChainRisks: document.getElementById(`supply-chain-risks-${index}`).value,
    };

    const response = await fetch('/save-onboarding', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            vendor: vendorName,
            onboardingQuestionData: onboardingQuestionData,
        }),
    });

    if (response.ok) {
        alert('Onboarding question saved successfully!');
    } else {
        alert('Failed to save onboarding question.');
    }
}
