
// HIREHUB - APPLICATION FORM

const applicationForm = document.getElementById("applicationForm");
const selectedJob = document.getElementById("selectedJob");
const formMessage = document.getElementById("formMessage");

const params = new URLSearchParams(window.location.search);
const jobId = Number(params.get("jobId"));

let jobs = JSON.parse(localStorage.getItem("hirehubJobs")) || [];

const job = jobs.find(item => Number(item.id) === jobId);

if (job) {
    selectedJob.textContent = `Applying for ${job.title} at ${job.company}`;
} else {
    selectedJob.textContent = "General job application";
}

applicationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("applicantName").value.trim();
    const email = document.getElementById("applicantEmail").value.trim();
    const phone = document.getElementById("applicantPhone").value.trim();
    const skills = document.getElementById("applicantSkills").value.trim();
    const message = document.getElementById("applicantMessage").value.trim();

    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        formMessage.style.color = "red";
        formMessage.textContent = "Enter a valid 10-digit Indian mobile number.";
        return;
    }

    const applications = JSON.parse(
        localStorage.getItem("hirehubApplications") || "[]"
    );

    const newApplication = {
        id: Date.now(),
        jobId: job ? job.id : null,
        jobTitle: job ? job.title : "General Application",
        company: job ? job.company : "Not specified",
        name,
        email,
        phone,
        skills,
        message,
        appliedAt: new Date().toLocaleString()
    };

    applications.push(newApplication);

    localStorage.setItem(
        "hirehubApplications",
        JSON.stringify(applications)
    );

    formMessage.style.color = "green";
    formMessage.textContent = "Application submitted successfully!";

    applicationForm.reset();
});
