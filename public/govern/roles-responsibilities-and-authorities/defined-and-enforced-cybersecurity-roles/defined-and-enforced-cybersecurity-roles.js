document.addEventListener('DOMContentLoaded', () => {
    const peopleListContainer = document.getElementById('people-list');
    const personInputs = document.getElementById('person-inputs');
    const addPersonButton = document.getElementById('add-person-btn');
    const savePersonButton = document.getElementById('save-person-btn');
    const savedRolesListContainer = document.getElementById('saved-roles-list');
    let peopleList = [];
    let editingIndex = -1;

    // Function to render the people list below the Add Person section
    function renderPeopleList() {
        peopleListContainer.innerHTML = '';
        peopleList.forEach((person, index) => {
            const personDiv = document.createElement('div');
            personDiv.classList.add('saved-person');
            personDiv.innerHTML = `
                <strong>Name:</strong> ${person.name}<br>
                <strong>Responsibilities:</strong> ${person.responsibilities}<br>
                <strong>Authority:</strong> ${person.authority}<br>
                <div class="action-buttons">
                    <button onclick="editPerson(${index})">Edit</button>
                    <button onclick="deletePerson(${index})">Delete</button>
                </div>
            `;
            peopleListContainer.appendChild(personDiv);
        });
    }

    // Handle add person functionality
    addPersonButton.addEventListener('click', () => {
        personInputs.style.display = 'block';
        document.getElementById('person-name').value = '';
        document.getElementById('person-responsibilities').value = '';
        document.getElementById('person-authority').value = '';
        editingIndex = -1;
    });

    // Handle saving person to the list
    savePersonButton.addEventListener('click', () => {
        const name = document.getElementById('person-name').value;
        const responsibilities = document.getElementById('person-responsibilities').value;
        const authority = document.getElementById('person-authority').value;

        if (name && responsibilities && authority) {
            if (editingIndex === -1) {
                // Add new person
                peopleList.push({ name, responsibilities, authority });
            } else {
                // Edit existing person
                peopleList[editingIndex] = { name, responsibilities, authority };
            }
            renderPeopleList();
            personInputs.style.display = 'none';
        } else {
            alert('Please fill out all fields.');
        }
    });

    // Edit a person entry
    window.editPerson = (index) => {
        const person = peopleList[index];
        document.getElementById('person-name').value = person.name;
        document.getElementById('person-responsibilities').value = person.responsibilities;
        document.getElementById('person-authority').value = person.authority;
        personInputs.style.display = 'block';
        editingIndex = index;
    };

    // Delete a person entry
    window.deletePerson = (index) => {
        peopleList.splice(index, 1);
        renderPeopleList();
    };

    // Save and load functions for the entire form
    window.saveCybersecurityRolesData = () => {
        const formData = {
            enterpriseRiskManagement: document.getElementById('integrated-enterprise-risk-management').value,
            peopleList,
            seniorManagementInvolvement: document.getElementById('senior-management-involvement').value,
            escalationThresholds: document.getElementById('escalation-thresholds').value,
            informInvolved: document.getElementById('inform-involved').value,
            escalationTimeline: document.getElementById('escalation-timeline').value,
            responsibleEscalation: document.getElementById('responsible-escalation').value,
            escalationDocumentation: document.getElementById('escalation-documentation').value,
            escalationReview: document.getElementById('escalation-review').value,
        };

        // Save data to the server
        fetch('/save-defined-cybersecurity-roles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data saved:', data);
                displaySavedData(formData); // Display saved data below "Saved Cybersecurity Roles Data"
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    };

    // Function to display the saved data below "Saved Cybersecurity Roles Data"
    function displaySavedData(data) {
        savedRolesListContainer.innerHTML = `
            <strong>Cybersecurity Integrated into Enterprise Risk Management:</strong> ${data.enterpriseRiskManagement}<br>
            <strong>People List:</strong>
            <ul>
                ${data.peopleList.map(person => `
                    <li><strong>Name:</strong> ${person.name}, <strong>Responsibilities:</strong> ${person.responsibilities}, <strong>Authority:</strong> ${person.authority}</li>
                `).join('')}
            </ul>
            <strong>Senior Management Involvement:</strong> ${data.seniorManagementInvolvement}<br>
            <strong>Escalation Thresholds:</strong> ${data.escalationThresholds}<br>
            <strong>Inform Involved:</strong> ${data.informInvolved}<br>
            <strong>Escalation Timeline:</strong> ${data.escalationTimeline}<br>
            <strong>Responsible for Escalation:</strong> ${data.responsibleEscalation}<br>
            <strong>Escalation Documentation:</strong> ${data.escalationDocumentation}<br>
            <strong>Escalation Review Frequency:</strong> ${data.escalationReview}
        `;
    }

    // Fetch existing data from the server and populate fields
    fetch('/defined-cybersecurity-roles-data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('integrated-enterprise-risk-management').value = data.enterpriseRiskManagement || '';
            document.getElementById('senior-management-involvement').value = data.seniorManagementInvolvement || '';
            document.getElementById('escalation-thresholds').value = data.escalationThresholds || '';
            document.getElementById('inform-involved').value = data.informInvolved || '';
            document.getElementById('escalation-timeline').value = data.escalationTimeline || '';
            document.getElementById('responsible-escalation').value = data.responsibleEscalation || '';
            document.getElementById('escalation-documentation').value = data.escalationDocumentation || '';
            document.getElementById('escalation-review').value = data.escalationReview || '';

            if (data.peopleList) {
                peopleList = data.peopleList;
                renderPeopleList();
            }
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
});
