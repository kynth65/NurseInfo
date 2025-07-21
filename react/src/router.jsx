import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/User/Profile";

import MedicineList from "./components/inventory/MedicineList";
import AllTransactionHistory from "./components/inventory/AllTransactionHistory";

import PatientsList from "./components/patients/PatientsList";
import NewPatientModal from "./components/patients/NewPatientModal";
import EditPatient from "./components/patients/EditPatient";
import PatientView from "./components/patients/PatientView";
import Events from "./components/events/Events";
import SicknessTally from "./components/sickness/SicknessTallyDashboard";
import Homepage from "./pages/Homepage";
import Services from "./components/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VaccinationDashboard from "./components/vaccination/VaccinationDashboard";
import Queue from "./components/queue/Queue";

// Import family components
import FamilyList from "./components/families/FamilyList";
import { FamilyView } from "./components/families/FamilyView";
import FamilyForm from "./components/families/FamilyForm";

import RiskAssessment from "./components/risk_assessment/RiskAssesment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: "/services",
                element: <Services />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
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
                path: "/profile",
                element: <Profile />,
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
                path: "/patients/:id",
                element: <PatientView />,
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
            // Family routes
            {
                path: "/families",
                element: <FamilyList />,
            },
            {
                path: "/families/new",
                element: <FamilyForm key="familyCreate" />,
            },
            {
                path: "/families/:id",
                element: <FamilyView />,
            },
            {
                path: "/families/:id/edit",
                element: <FamilyForm key="familyUpdate" />,
            },
            {
                path: "/events",
                element: <Events />,
            },
            {
                path: "/queue",
                element: <Queue />,
            },
            {
                path: "/sickness",
                element: <SicknessTally />,
            },
            {
                path: "/vaccination",
                element: <VaccinationDashboard />,
            },
            // Risk Assessment routes - both with and without patient ID
            {
                path: "/risk-assessment",
                element: <RiskAssessment />,
            },
            {
                path: "/risk-assessment/:patientId",
                element: <RiskAssessment />,
            },
        ],
    },
]);

export default router;
