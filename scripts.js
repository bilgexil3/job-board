document.getElementById('jobForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const job = {
    title: document.getElementById('title').value,
    company: document.getElementById('company').value,
    description: document.getElementById('description').value,
  };

  // This part should interact with your backend
  await fetch('https://your-backend-service-url/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job),
  });

  loadJobs();
});

async function loadJobs() {
  const response = await fetch('https://your-backend-service-url/jobs');
  const jobs = await response.json();
  
  const jobsContainer = document.getElementById('jobsContainer');
  jobsContainer.innerHTML = '';
  
  jobs.forEach(job => {
    const jobElement = document.createElement('div');
    jobElement.className = 'job';
    jobElement.innerHTML = `
      <h2>${job.title}</h2>
      <p><strong>${job.company}</strong></p>
      <p>${job.description}</p>
      <button onclick="deleteJob('${job._id}')">Delete</button>
    `;
    jobsContainer.appendChild(jobElement);
  });
}

async function deleteJob(id) {
  await fetch(`https://your-backend-service-url/jobs/${id}`, { method: 'DELETE' });
  loadJobs();
}

document.addEventListener('DOMContentLoaded', loadJobs);
