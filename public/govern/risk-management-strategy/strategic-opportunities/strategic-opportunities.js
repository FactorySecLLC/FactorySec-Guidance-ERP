let editIndex = -1;

async function saveStrategicOpportunitiesData() {
    const data = {
        methodsFrameworks: document.getElementById('methods-frameworks')?.value || '',
        examplesOpportunities: document.getElementById('examples-opportunities')?.value || '',
        guidanceCommunication: document.getElementById('guidance-communication')?.value || '',
        responsibleGuidance: document.getElementById('responsible-guidance')?.value || '',
        stretchGoals: document.getElementById('stretch-goals')?.value || '',
        riskPrioritization: document.getElementById('risk-prioritization')?.value || '',
        examplesPositiveRisks: document.getElementById('examples-positive-risks')?.value || '',
        documentationReview: document.getElementById('documentation-review')?.value || ''
    };

    let opportunities = await fetchStrategicOpportunities();
    if (editIndex >= 0) {
        opportunities[editIndex] = data;
        editIndex = -1;
    } else {
        opportunities.push(data);
    }

    const response = await fetch('/save-strategic-opportunities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ opportunities })
    }).then(res => res.json());

    if (response.error) {
        console.error('Error:', response.error);
    } else {
        console.log('Success:', response);
        clearInputFields();
        loadSavedStrategicOpportunities();
        setEditingIndicator();
    }
}

async function loadSavedStrategicOpportunities() {
    const listContainer = document.getElementById('saved-opportunities-list');
    if (!listContainer) {
        console.error("Element 'saved-opportunities-list' not found.");
        return;
    }

    const opportunities = await fetchStrategicOpportunities();
    listContainer.innerHTML = '';
    if (opportunities.length > 0) {
        opportunities.forEach((opportunity, index) => {
            const opportunityElement = document.createElement('div');
            opportunityElement.className = 'opportunity-item';
            opportunityElement.innerHTML = `
                <div class="opportunity-info">
                    <strong>Methods/Frameworks:</strong> ${opportunity.methodsFrameworks} <br>
                    <strong>Examples of Opportunities:</strong> ${opportunity.examplesOpportunities} <br>
                    <strong>Guidance Communication:</strong> ${opportunity.guidanceCommunication} <br>
                    <strong>Responsible Guidance:</strong> ${opportunity.responsibleGuidance} <br>
                    <strong>Stretch Goals:</strong> ${opportunity.stretchGoals} <br>
                    <strong>Risk Prioritization:</strong> ${opportunity.riskPrioritization} <br>
                    <strong>Examples of Positive Risks:</strong> ${opportunity.examplesPositiveRisks} <br>
                    <strong>Documentation Review:</strong> ${opportunity.documentationReview}
                </div>
                <div class="opportunity-buttons">
                    <button onclick="editOpportunity(${index})">Edit</button>
                    <button onclick="deleteOpportunity(${index})">Delete</button>
                </div>
            `;
            listContainer.appendChild(opportunityElement);
        });
    } else {
        listContainer.innerText = 'No saved strategic opportunities found.';
    }
}

async function fetchStrategicOpportunities() {
    const response = await fetch('/strategic-opportunities-data').then(res => res.json());
    return response.opportunities || [];
}

function editOpportunity(index) {
    fetchStrategicOpportunities().then(opportunities => {
        const opportunity = opportunities[index];
        if (opportunity) {
            document.getElementById('methods-frameworks').value = opportunity.methodsFrameworks;
            document.getElementById('examples-opportunities').value = opportunity.examplesOpportunities;
            document.getElementById('guidance-communication').value = opportunity.guidanceCommunication;
            document.getElementById('responsible-guidance').value = opportunity.responsibleGuidance;
            document.getElementById('stretch-goals').value = opportunity.stretchGoals;
            document.getElementById('risk-prioritization').value = opportunity.riskPrioritization;
            document.getElementById('examples-positive-risks').value = opportunity.examplesPositiveRisks;
            document.getElementById('documentation-review').value = opportunity.documentationReview;

            editIndex = index;
            setEditingIndicator(opportunity.methodsFrameworks);
        }
    });
}

function deleteOpportunity(index) {
    fetch('/delete-strategic-opportunity/' + index, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            loadSavedStrategicOpportunities();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function clearInputFields() {
    const fields = [
        'methods-frameworks',
        'examples-opportunities',
        'guidance-communication',
        'responsible-guidance',
        'stretch-goals',
        'risk-prioritization',
        'examples-positive-risks',
        'documentation-review'
    ];

    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.value = '';
        } else {
            console.error(`Element '${field}' not found.`);
        }
    });
}

function setEditingIndicator(name = '') {
    const indicator = document.getElementById('editing-indicator');
    if (indicator) {
        indicator.innerText = name ? `Editing ${name}` : '';
    }
}

document.addEventListener('DOMContentLoaded', loadSavedStrategicOpportunities);
