import { getEventById, getFeaturedEvents } from "../../helpers/ApiUtil";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

// ========== Dynamic Event Detail Page Function ========== //

function eventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    <div className="center">
      <p>Loading...</p>
    </div>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

// ===== nested getStaticProps & getStaticPath functions ===== //

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    // generate new page every 30 seconds
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  // construct paths array
  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default eventDetailPage;
