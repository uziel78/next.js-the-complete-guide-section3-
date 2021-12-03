import { useRouter } from "next/router";
import Button from "../../components/ui/button";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import ErrorAlert from "../../components/ui/ErrorAlert";

// ========== Filtered Events Page ========== //

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;
  console.log(filterData);

  // if filterData is undefined (as it is by default when useRouter() is first run)
  // add a loading indicator
  if (!filterData) {
    return (
      <>
        <p>Loading...</p>
        <div className="center"></div>
      </>
    );
  }

  // access url array data, which are strings by default in the url
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  // adding a "+" transforms the string to a number...
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // validity check
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2050 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <ErrorAlert>
        <p className="center">Invalid filter. Please adjust your values.</p>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </ErrorAlert>
    );
  }

  // call getFilteredEvents function and pass in object
  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // check if filteredEvent matches with any current data
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No event found for current search</p>
          <div className="center">
            <Button link="/events">Show All Events</Button>
          </div>
        </ErrorAlert>
      </>
    );
  }

  // create date variable to pass into ResultsTitle component below
  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;
