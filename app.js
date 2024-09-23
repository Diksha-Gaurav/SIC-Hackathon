document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById('feedback');
    const feedbackList = document.getElementById('feedback-list');

    // Fetch and display existing feedback from the backend
    const loadFeedback = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/feedback');
            const data = await response.json();
            renderFeedback(data);
        } catch (err) {
            console.error("Error fetching feedback: ", err);
        }
    };

    // Render feedback data
    const renderFeedback = (data) => {
        feedbackList.innerHTML = ''; // Clear existing items
        data.forEach(item => {
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item');
            feedbackItem.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Issue:</strong> ${item.feedback}</p>
                <p><strong>Urgency:</strong> ${item.urgency}</p>
                <hr>
            `;
            feedbackList.appendChild(feedbackItem);
        });
    };

    // Submit feedback form
    feedbackForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const location = document.getElementById('location').value;
        const feedbackText = document.getElementById('feedback-text').value;
        const urgency = document.getElementById('urgency').value;

        // Simple form validation
        if (!name || !email || !location || !feedbackText) {
            alert("All fields except the photo are required!");
            return;
        }

        // Create new feedback object
        const feedbackData = {
            name,
            email,
            location,
            feedback: feedbackText,
            urgency
        };

        // Submit feedback to the backend
        try {
            const response = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedbackData)
            });

            const newFeedback = await response.json();
            alert('Thank you for your feedback!');
            loadFeedback();  // Reload feedback list after submission
        } catch (err) {
            console.error("Error submitting feedback: ", err);
        }

        // Reset form
        feedbackForm.reset();
    });

    // Load feedback when the page is loaded
    loadFeedback();
});
