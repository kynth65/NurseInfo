import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import MedicineList from "./components/inventory/MedicineList";
import AllTransactionHistory from "./components/inventory/AllTransactionHistory";

import PatientsList from "./components/patients/PatientsList";
import NewPatientModal from "./components/patients/NewPatientModal";
import EditPatient from "./components/patients/EditPatient";
import PatientView from "./components/patients/PatientView";
import Events from "./components/events/Events";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
        ],
    },
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/inventory",
                element: <MedicineList />,
            },
            {
                path: "/inventory/history",
                element: <AllTransactionHistory />,
            },
            {
                path: "/patients",
                element: <PatientsList />,
            },
            {
                path: "/patients/:id/edit",
                element: <EditPatient />,
            },

            {
                path: "/patients/:id/visits/new",
                element: <NewPatientModal />,
            },
            {
                path: "/patients/:id/view",
                element: <PatientView />,
            },
            {
                path: "/events",
                element: <Events />,
            },
        ],
    },
]);

export default router;
