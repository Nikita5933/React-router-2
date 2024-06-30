import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, {loader} from "./pages/Events";
import EventDetailPage from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import RootLayout from "./pages/Root";
import EventsRootPage from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {path: '/', errorElement: <ErrorPage />, element: <RootLayout />, children: [
      {index: true, element: <HomePage />},
      {path: 'events', element: <EventsRootPage />, children: [
              {index: true, element: <EventsPage />, loader: loader},
              {path: ':eventId', element: <EventDetailPage />},
              {path: 'new', element: <NewEventPage />},
              {path: ':eventId/edit', element: <EditEventPage />},
          ]},

    ]},

])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
