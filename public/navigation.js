document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    let dbName = '';

    // Fetch the database name from the server
    fetch('/get-db-name')
        .then(response => response.json())
        .then(data => {
            dbName = data.dbName; // Set the dbName dynamically from the server
            console.log('Database Name:', dbName);  // You can remove this after testing
        })
        .catch(error => {
            console.error('Error fetching database name:', error);
        });

    if (sidebar) {
        sidebar.innerHTML = `
            <h2>Navigation</h2>
            <ul>
                <li class="nav-item" data-section="govern">Govern</li>
                <ul id="govern" class="sub-nav">
                    <li data-section="organizational-context">Organizational Context</li>
                    <li data-section="risk-management-strategy">Risk Management Strategy</li>
                    <li data-section="roles-responsibilities">Roles, Responsibilities, and Authorities</li>
                    <li data-section="policy">Policy</li>
                    <li data-section="oversight">Oversight</li>
                    <li data-section="vendor-management">Vendor Management</li>
                </ul>
                <li class="nav-item" data-section="identify">Identify</li>
                <ul id="identify" class="sub-nav">
                    <li data-section="asset-management">Asset Management</li>
                    <li data-section="bill-of-materials">Bill of Materials</li>
                    <li data-section="data-classification">Data Classification</li>
                </ul>
                <li class="nav-item" data-section="cybersecurity-framework-mapping">Automated Cybersecurity Framework Mapping</li>
                <ul id="cybersecurity-framework-mapping" class="sub-nav">
                    <li data-section="govern-mapping">Govern Mapping</li>
                </ul>
                <button id="download-db">Download Database Backup</button> <!-- New button to download the DB -->
            </ul>
        `;

        // Add event listener for the download button
        document.getElementById('download-db').addEventListener('click', function() {
            // Trigger the database download using the dynamically fetched dbName
            window.location.href = `/download-db/${dbName}`;
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                toggleSubNav(sectionId);
            });
        });

        document.querySelectorAll('.sub-nav li').forEach(subItem => {
            subItem.addEventListener('click', function() {
                const section = this.getAttribute('data-section');
                loadSection(section);
            });
        });
    }
});

function toggleSubNav(sectionId) {
    const subNav = document.getElementById(sectionId);
    const subNavs = document.querySelectorAll('.sub-nav');

    subNavs.forEach(nav => {
        if (nav !== subNav) {
            nav.style.display = 'none';
        }
    });

    if (subNav.style.display === 'block') {
        subNav.style.display = 'none';
    } else {
        subNav.style.display = 'block';
    }
}

function loadSection(section) {
    const mainContent = document.getElementById('main-content');

    // Define the content for each section, using absolute paths
    const sectionContent = {
        'organizational-context': `
            <h2>Organizational Context</h2>
            <ul>
                <li><a href="/govern/organizational-context/organizational-mission/organizational-mission.html">Organizational Mission</a></li>
                <li><a href="/govern/organizational-context/stakeholders/stakeholders.html">Stakeholders</a></li>
                <li><a href="/govern/organizational-context/legal-requirements/legal-requirements.html">Legal, Regulatory, and Contractual Requirements</a></li>
                <li><a href="/govern/organizational-context/organizational-dependencies/organizational-dependencies.html">Organizational Dependencies</a></li>
            </ul>
        `,
        'risk-management-strategy': `
            <h2>Risk Management Strategy</h2>
            <ul>
                <li><a href="/govern/risk-management-strategy/communication-lines/communication-lines.html">Communication Lines</a></li>
                <li><a href="/govern/risk-management-strategy/cybersecurity-risk-management-activities-and-outcomes/cybersecurity-risk-management-activities-and-outcomes.html">Cybersecurity Risk Management Activities and Outcomes</a></li>
                <li><a href="/govern/risk-management-strategy/risk-appetite/risk-appetite.html">Risk Appetite</a></li>
                <li><a href="/govern/risk-management-strategy/risk-management-objectives/risk-management-objectives.html">Risk Management Objectives</a></li>
                <li><a href="/govern/risk-management-strategy/standardized-risk-methods/standardized-risk-methods.html">Standardized Risk Methods</a></li>
                <li><a href="/govern/risk-management-strategy/strategic-direction/strategic-direction.html">Strategic Direction</a></li>
                <li><a href="/govern/risk-management-strategy/strategic-opportunities/strategic-opportunities.html">Strategic Opportunities</a></li>
            </ul>
        `,
        'roles-responsibilities': `
            <h2>Roles, Responsibilities, and Authorities</h2>
            <ul>
                <li><a href="/govern/roles-responsibilities-and-authorities/leadership-accountability-and-risk-culture/leadership-accountability-and-risk-culture.html">Leadership Accountability and Risk Culture</a></li>
                <li>Defined and Enforced Cybersecurity Roles [Under Construction]</li>
                <li><a href="/govern/roles-responsibilities-and-authorities/resource-allocation-for-cybersecurity/resource-allocation-for-cybersecurity.html">Resource Allocation for Cybersecurity</a></li>
                <li><a href="/govern/roles-responsibilities-and-authorities/cybersecurity-in-HR-practices/cybersecurity-in-HR-practices.html">Cybersecurity in HR Practices</a></li>
            </ul>
        `,
        'policy': `
            <h2>Policy</h2>
            <ul>
                <li><a href="/govern/policy/clear-and-approved-cybersecurity-policy/clear-and-approved-cybersecurity-policy.html">Clear and Approved Cybersecurity Policy</a></li>
                <li><a href="/govern/policy/regularly-updated-cybersecurity-policy/regularly-updated-cybersecurity-policy.html">Regularly Updated Cybersecurity Policy</a></li>
            </ul>
        `,
        'oversight': `
            <h2>Oversight</h2>
            <ul>
                <li><a href="/govern/oversight/compliance-and-oversight-adjustment/compliance-and-oversight-adjustment.html">Compliance and Oversight Adjustment</a></li>
                <li><a href="/govern/oversight/strategic-risk-management-review/strategic-risk-management-review.html">Strategic Risk Management Review</a></li>
                <li><a href="/govern/oversight/performance-and-metrics-evaluation/performance-and-metrics-evaluation.html">Performance and Metrics Evaluation</a></li>
            </ul>
        `,
        'vendor-management': `
            <h2>Vendor Management</h2>
            <ul>
                <li><a href="/govern/vendor-management/vendors/vendors.html">Enter Vendor Information</a></li>
                <li><a href="/govern/vendor-management/vendor-criticality/vendor-criticality.html">Vendor Criticality Diagram</a></li>
                <li><a href="/govern/vendor-management/due-diligence/due-diligence.html">Vendor Due Diligence</a></li>
                <li><a href="/govern/vendor-management/onboarding-procedure/onboarding-procedure.html">Vendor Onboarding Procedure</a></li>
                <li><a href="/govern/vendor-management/offboarding-procedure/offboarding-procedure.html">Vendor Offboarding Procedure</a></li>
            </ul>
        `,
        'asset-management': `
            <h2>Asset Management</h2>
            <p>
            <h3>Fixed Assets</h3>
            <li><a href="/identify/asset-management/fixed-assets/it-ot-assets/it-ot-assets.html">Information Technology, Internet of Things, and Operational Technology Assets</a></li>
            <li><a href="/identify/asset-management/fixed-assets/software-assets/software-assets.html">Software Assets</a></li>
            <li><a href="/identify/asset-management/fixed-assets/other-fixed-assets/other-fixed-assets.html">Other Fixed Assets</a></li>
            <li><a href="/identify/asset-management/network-diagram/network-diagram.html">Network Diagram</a></li>
            </p>
            <p>
            <h3>Current Assets</h3>
            <li><a href="/identify/asset-management/current-assets/cash/cash.html">Cash</a></li>
            <li><a href="/identify/asset-management/current-assets/accounts-receivable/accounts-receivable.html">Accounts Receivable</a></li>
            <li><a href="/identify/asset-management/current-assets/inventory/inventory.html">Inventory</a></li>
            <li><a href="/identify/asset-management/current-assets/other/other.html">Other Current Assets</a></li>
        `,
        'bill-of-materials': `
        <h2>Bill of Materials</h2>
        <ul><li><a href="/identify/bill-of-materials/bill-of-materials.html">Inventory Bill of Materials</a></li>
        <li>Internal Software Bill of Materials</li>
        <li>Vendor Software Bill of Materials</li>
        </ul>
        `, 
        'data-classification': `
        <h2>Data Classification</h2>
        <ul><li><a href="/identify/data-classification/data-classification.html">Data Classification</a></li></ul>
    `,
        'improvement': `
            <h2>Improvement</h2>
            <p>Content for Improvement.</p>
        `,
        'liabilities': `
        <h2>Liabilities</h2>
        <p>Content for Liabilities</p>
    `,
        'govern-mapping': `
            <h2>Govern Mapping</h2>
            <ul>
                <li><a href="/cybersecurity-framework-mapping/govern/index.html">Automated Govern Mapping Report</a></li>
            </ul>
        `,
        'identify-mapping': `
            <h2>Identify Mapping</h2>
            <p>Content for Identify Mapping.</p>
        `
    };

    // Update the main content area with the new content
    mainContent.innerHTML = sectionContent[section];
}
