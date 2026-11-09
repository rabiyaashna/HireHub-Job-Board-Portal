
// HIREHUB - ADMIN DASHBOARD

let jobs = [];
let applications = [];

const jobForm = document.getElementById("jobForm");
const adminJobList = document.getElementById("adminJobList");
const adminJobCount = document.getElementById("adminJobCount");
const applicationList = document.getElementById("applicationList");
const applicationCount = document.getElementById("applicationCount");
const adminMessage = document.getElementById("adminMessage");

function loadData() {
    jobs = JSON.parse(localStorage.getItem("hirehubJobs") || "[]");
    applications = JSON.parse(
        localStorage.getItem("hirehubApplications") || "[]"
    );
}

function saveJobs() {
    localStorage.setItem("hirehubJobs", JSON.stringify(jobs));
}

function displayAdminJobs() {
    adminJobList.innerHTML = "";
    adminJobCount.textContent = jobs.length;

    if (jobs.length === 0) {
        adminJobList.innerHTML =
            '<p class="empty-message">No jobs available.</p>';
        return;
    }

    jobs.forEach(job => {
        const card = document.createElement("div");
        card.className = "admin-job";

        const details = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = job.title;

        const company = document.createElement("p");
        company.textContent =
            `${job.company} | ${job.location} | ${job.type}`;

        details.append(title, company);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete Job";

        deleteBtn.addEventListener("click", () => {
            const confirmed = confirm(
                `Are you sure you want to delete ${job.title}?`
            );

            if (!confirmed) return;

            jobs = jobs.filter(item => item.id !== job.id);
            saveJobs();
            displayAdminJobs();
        });

        card.append(details, deleteBtn);
        adminJobList.appendChild(card);
    });
}

function displayApplications() {
    applicationList.innerHTML = "";
    applicationCount.textContent = applications.length;

    if (applications.length === 0) {
        applicationList.innerHTML =
            '<p class="empty-message">No applications received yet.</p>';
        return;
    }

    applications.forEach(app => {
        const card = document.createElement("div");
        card.className = "admin-job";

        const details = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = app.name;

        const info = document.createElement("p");
        info.textContent =
            `${app.email} | ${app.phone} | ${app.jobTitle}`;

        const skills = document.createElement("p");
        skills.textContent = `Skills: ${app.skills}`;

        const date = document.createElement("p");
        date.textContent = `Applied: ${app.appliedAt}`;

        details.append(name, info, skills, date);
        card.appendChild(details);

        applicationList.appendChild(card);
    });
}

jobForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newJob = {
        id: Date.now(),
        title: document.getElementById("title").value.trim(),
        company: document.getElementById("company").value.trim(),
        location: document.getElementById("location").value.trim(),
        role: document.getElementById("role").value,
        type: document.getElementById("type").value,
        salary: document.getElementById("salary").value.trim()
    };

    jobs.push(newJob);
    saveJobs();

    jobForm.reset();

    adminMessage.style.color = "green";
    adminMessage.textContent = "Job added successfully!";

    displayAdminJobs();
});

loadData();
displayAdminJobs();
displayApplications();
