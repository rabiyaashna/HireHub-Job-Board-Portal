
// HIREHUB - HOMEPAGE

const defaultJobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "TechNova Solutions",
        role: "Developer",
        location: "Hyderabad",
        type: "Full Time",
        salary: "₹4 - 6 LPA"
    },
    {
        id: 2,
        title: "UI/UX Designer",
        company: "Creative Minds",
        role: "Designer",
        location: "Warangal",
        type: "Internship",
        salary: "₹10,000 / month"
    },
    {
        id: 3,
        title: "Python Developer",
        company: "CodeCraft Technologies",
        role: "Developer",
        location: "Bangalore",
        type: "Full Time",
        salary: "₹5 - 8 LPA"
    },
    {
        id: 4,
        title: "Data Analyst",
        company: "DataVision",
        role: "Data Science",
        location: "Hyderabad",
        type: "Full Time",
        salary: "₹4 - 7 LPA"
    },
    {
        id: 5,
        title: "Machine Learning Intern",
        company: "AI Future Labs",
        role: "AI/ML",
        location: "Warangal",
        type: "Internship",
        salary: "₹12,000 / month"
    },
    {
        id: 6,
        title: "Java Developer",
        company: "InnovateTech",
        role: "Developer",
        location: "Warangal",
        type: "Full Time",
        salary: "₹4 - 5 LPA"
    }
];

// Initialize saved jobs only once
if (localStorage.getItem("hirehubJobs") === null) {
    localStorage.setItem("hirehubJobs", JSON.stringify(defaultJobs));
}

const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const roleFilter = document.getElementById("roleFilter");
const clearBtn = document.getElementById("clearBtn");
const jobContainer = document.getElementById("jobContainer");
const jobCount = document.getElementById("jobCount");

function getJobs() {
    try {
        const saved = JSON.parse(localStorage.getItem("hirehubJobs"));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function populateFilters(jobs) {
    const locations = [...new Set(jobs.map(job => job.location))].sort();
    const roles = [...new Set(jobs.map(job => job.role))].sort();

    locationFilter.innerHTML = '<option value="">All Locations</option>';
    roleFilter.innerHTML = '<option value="">All Roles</option>';

    locations.forEach(location => {
        const option = document.createElement("option");
        option.value = location;
        option.textContent = location;
        locationFilter.appendChild(option);
    });

    roles.forEach(role => {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = role;
        roleFilter.appendChild(option);
    });
}

function displayJobs(list) {
    jobContainer.innerHTML = "";
    jobCount.textContent = list.length;

    if (list.length === 0) {
        jobContainer.innerHTML =
            '<div class="no-jobs"><h3>No jobs found</h3><p>Try another search or filter.</p></div>';
        return;
    }

    list.forEach(job => {
        const card = document.createElement("article");
        card.className = "job-card";

        const icon = document.createElement("div");
        icon.className = "company-icon";
        icon.textContent = (job.company || "J").charAt(0).toUpperCase();

        const details = document.createElement("div");
        details.className = "job-details";

        const title = document.createElement("h3");
        title.textContent = job.title;

        const company = document.createElement("p");
        company.textContent = job.company;

        const info = document.createElement("div");
        info.className = "job-info";
        info.textContent =
            `${job.location} • ${job.type} • ${job.salary}`;

        details.append(title, company, info);

        const apply = document.createElement("a");
        apply.className = "apply-btn";
        apply.textContent = "Apply Now";
        apply.href = `apply.html?jobId=${encodeURIComponent(job.id)}`;

        card.append(icon, details, apply);
        jobContainer.appendChild(card);
    });
}

function filterJobs() {
    const jobs = getJobs();

    const search = searchInput.value.toLowerCase().trim();
    const location = locationFilter.value;
    const role = roleFilter.value;

    const filtered = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(search) ||
            job.company.toLowerCase().includes(search);

        const matchesLocation = !location || job.location === location;
        const matchesRole = !role || job.role === role;

        return matchesSearch && matchesLocation && matchesRole;
    });

    displayJobs(filtered);
}

searchInput.addEventListener("input", filterJobs);
locationFilter.addEventListener("change", filterJobs);
roleFilter.addEventListener("change", filterJobs);

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    locationFilter.value = "";
    roleFilter.value = "";
    displayJobs(getJobs());
});

const jobs = getJobs();
populateFilters(jobs);
displayJobs(jobs);
