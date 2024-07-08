import {Await, defer, json, redirect, useLoaderData, useParams, useRouteLoaderData} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import {Suspense} from "react";

export default function EventDetailPage() {
    const {event, events} = useRouteLoaderData('event-detail');
    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={event}>
                {event => <EventItem event={event} />}
            </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
            <Await resolve={events}>
                {events => <EventsList events={events} />}
            </Await>
            </Suspense>

        </>

    );
}

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id)
    if (!response.ok) {
        throw json({message: 'could not fetch details fo selected event'}, {status: 500})
    } else {
        const resData = await response.json();
        return resData.event;
    }
}
async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return {isError: true, message: 'could not fetch events'};
        // throw new Response(JSON.stringify({message: 'could not fetch events'}),{status: 500});
        return json({message: 'could not fetch events'}, {status: 500});
    } else {
        // const resData = await response.json();
        // const res = new Response('data', {status: 201})
        const resData = await response.json();
        return resData.events;
    }
}

export async function loader({request, params}) {
    const id = params.eventId;
    return defer({
        event: await loadEvent(id),
        events: loadEvents(),
    })
}

export async function action({params, request}) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
    });

    if (!response.ok) {
        throw json({message: 'could not delete event'}, {status: 500})
    }

    return redirect('/events')
}