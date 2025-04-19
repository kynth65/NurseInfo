import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Homepage() {
    return (
        <>
            <div>
                <Navbar />
                <Hero />
                <Footer />
            </div>
        </>
    );
}
