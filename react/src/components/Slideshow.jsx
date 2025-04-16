import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slideshow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to go to next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to go to previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Set up automatic sliding
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000); // 4 seconds

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-60">
            <div className="overflow-hidden rounded-lg h-60 shadow-sm border border-gray-100">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-60 object-cover transition-all duration-500"
                />
            </div>

            {/* Navigation arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-1 sm:p-2 rounded-full hover:bg-white/90 transition-colors"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-purple-700" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-1 sm:p-2 rounded-full hover:bg-white/90 transition-colors"
                aria-label="Next slide"
            >
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-purple-700" />
            </button>

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                            index === currentIndex
                                ? "bg-purple-700"
                                : "bg-white/70"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
