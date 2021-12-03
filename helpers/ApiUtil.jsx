export async function getAllEvents() {
  const response = await fetch(
    "https://nextjs-course-5b745-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );
  const data = await response.json();

  // firebase returns data as an object by default
  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}
