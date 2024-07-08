import EventForm from "../components/EventForm";
import {useLoaderData, useRouteLoaderData} from "react-router-dom";

export default function EditEventPage() {
    const data = useRouteLoaderData('event-detail');
    return (
        <EventForm method="patch" event={data.event} />
    );
}