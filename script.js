document.addEventListener("DOMContentLoaded", function () {
  const events = [
    { id: 1, title: "Strictly Soul", date: "20-03-2025", category: "Music", location: "Atelier du Vin", description: "Get ready for an unforgettable evening of soulful RnB vibes! This intimate event features a talented DJ spinning the best RnB tracks from classic hits to modern favorites. Enjoy smooth melodies, powerful vocals, bottomless drinks, and an atmosphere that will have you swaying all night long. You can't afford to miss this!!" },
    { id: 2, title: "Tech Meetup", date: "15-04-2025", category: "Tech", location: "Norrsken Kigali", description: "Join fellow tech enthusiasts for an evening of innovation and networking! This meetup will feature talks from local startups, hands-on workshops on emerging technologies, and plenty of time to connect with like-minded professionals. Whether you're a developer, entrepreneur, or just tech-curious, you'll find inspiration and new opportunities here." },
    { id: 3, title: "Football Match", date: "10-05-2025", category: "Sports", location: "Amahoro Stadium", description: "Experience the thrill of live football at Rwanda's premier stadium! Watch as APR and Rayon Sport, two of Rwanda's most influential football clubs, battle it out in what promises to be an action-packed match. With passionate fans, energetic atmosphere, and world-class facilities. Come early for the pre-match excitement!" },
    { id: 4, title: "Gakondo Art Exhibition", date: "05-06-2025", category: "Art & Culture", location: "Inema Arts Center", description: "Immerse yourself in the rich cultural heritage of Rwanda through contemporary art! This exhibition showcases the works of talented local artists who blend traditional Rwandan heritage with modern artistic techniques. Each piece tells a story of our nation's past, present, and future" },
    { id: 5, title: "Food Festival", date: "12-07-2025", category: "Food & Drink", location: "Car Free Zone", description: "Embark on a culinary journey across Africa without leaving Kigali! This vibrant food festival brings together the continent's finest flavors, from spicy West African dishes to best East African specialties. Sample street food, attend cooking demonstrations, and learn about traditional cooking methods. With live music and cultural performances, this is a feast for everyone!" },
    { id: 6, title: "Business Networking Brunch", date: "20-08-2025", category: "Business & Networking", location: "The HUT Restaurant", description: "Engage with meaningful connections over delicious food! This exclusive brunch event brings together entrepreneurs, business leaders, and professionals from various industries. Enjoy a good meal while participating in networking sessions, listening to inspiring success stories, and discovering potential collaborations. " },
    { id: 7, title: "Community Clean-Up/ Umuganda", date: "05-09-2025", category: "Community Outreach", location: "Kimihurura Park", description: "Join your neighbors in this traditional Rwandan community service event! Umuganda is more than just cleaning - it's about building stronger communities and taking pride in our shared spaces. We'll be cleaning the park, planting trees, and working together to make our district more beautiful. After the work, enjoy refreshments and celebrate our collective achievement. Everyone is welcome!" }
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