import EventsNavigation from "../components/EventsNavigation";
import {Outlet} from "react-router-dom";

export default function EventsRootPage() {
    return (
        <>
            <EventsNavigation />
            <Outlet />
        </>
    );
}