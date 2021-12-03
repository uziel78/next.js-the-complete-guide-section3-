import { getFeaturedEvents } from "../helpers/ApiUtil";
import EventList from "../components/events/EventList";

function HomePage(props) {
  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    // generate new page every 15 minutes
    revalidate: 900,
  };
}

export default HomePage;
