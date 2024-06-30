
import EventsList from '../components/EventsList';
import {useLoaderData} from "react-router-dom";

function EventsPage() {
    const data = useLoaderData();
    // if (data.isError) {
    //     return <p>{data.message}</p>
    // }
    const events = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return {isError: true, message: 'could not fetch events'};
        throw new Response(JSON.stringify({message: 'could not fetch events'}),{status: 500});
    } else {
        // const resData = await response.json();
        // const res = new Response('data', {status: 201})
        return response;
    }
}
