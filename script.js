document.addEventListener("DOMContentLoaded", function () {
  const events = [
      { id: 1, title: "Strictly Soul", date: "20-03-2025", category: "Music", location: "Atelier du Vin", description: "An electrifying RnB concert in the city!" },
      { id: 2, title: "Tech Meetup", date: "15-04-2025", category: "Tech", location: "Norrsken Kigali", description: "A networking event for tech enthusiasts." },
      { id: 3, title: "Football Match", date: "10-05-2025", category: "Sports", location: "Amahoro Stadium", description: "An exciting football match between top teams!" },
      { id: 4, title: "Gakondo Art Exhibition", date: "05-06-2025", category: "Art & Culture", location: "Inema Arts Center", description: "An inspiring exhibition featuring local artists." },
      { id: 5, title: "Food Festival", date: "12-07-2025", category: "Food & Drink", location: "Car Free Zone", description: "Taste delicious food from around the continent!" },
      { id: 6, title: "Business Networking Brunch", date: "20-08-2025", category: "Business & Networking", location: "The HUT Restaurant", description: "Connect with business leaders and entrepreneurs." },
      { id: 7, title: "Community Clean-Up/ Umuganda", date: "05-09-2025", category: "Community Outreach", location: "Gasabo District", description: "Join us for a community clean-up and Umuganda." }
  ];

  function getEventById(id) {
    return events.find(e => e.id == id);
  }

  function getSearchParams() {
      const params = new URLSearchParams(window.location.search);
      return {
          query: params.get("query") || "",
          date: params.get("date") || "",
          category: params.get("category") || ""
      };
  }

  function displayEvents(filteredEvents) {
      const eventList = document.getElementById("eventList");
      if (!eventList) return;
      eventList.innerHTML = "";

      if (filteredEvents.length === 0) {
          eventList.innerHTML = `<p class="text-center text-muted">No events found.</p>`;
          return;
      }

      let row = document.createElement('div');
      row.className = 'row';

      filteredEvents.forEach(event => {
          let col = document.createElement('div');
          col.className = 'col-md-4 mb-4 d-flex';
          col.innerHTML = `
              <div class="event-card flex-fill">
                  <h4 style="color: #ffdd57; font-weight: 600;">${event.title}</h4>
                  <p>${event.date} | ${event.category}</p>
                  <p><strong>Location:</strong> ${event.location}</p>
                  <a href="event-details.html?id=${event.id}" class="btn btn-outline-light">View Details</a>
              </div>
          `;
          row.appendChild(col);
      });
      eventList.appendChild(row);
  }

  function loadEvents() {
      if (window.location.pathname.includes("events.html")) {
          const searchParams = getSearchParams();
          let filtered = events.filter(event =>
              (event.title.toLowerCase().includes(searchParams.query.toLowerCase()) || searchParams.query === "") &&
              (event.date === searchParams.date || searchParams.date === "") &&
              (event.category === searchParams.category || searchParams.category === "")
          );
          displayEvents(filtered);
      }

      if (window.location.pathname.includes("event-details.html")) {
          const params = new URLSearchParams(window.location.search);
          const eventId = params.get("id");
          const event = events.find(e => e.id == eventId);

          if (event) {
              document.getElementById("eventTitle").textContent = event.title;
              document.getElementById("eventDate").textContent = "Date: " + event.date;
              document.getElementById("eventCategory").textContent = "Category: " + event.category;
              document.getElementById("eventDescription").textContent = event.description;
              let locationElem = document.getElementById("eventLocation");
              if (locationElem) {
                  locationElem.textContent = "Location: " + event.location;
              }
          }
      }
  }

  function categoryChanged() {
    const category = document.getElementById("searchCategory").value;
    if (category) {
        window.location.href = `events.html?category=${category}`;
    }
}

  loadEvents();
});