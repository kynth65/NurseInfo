import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Plus } from "lucide-react";
import axiosClient from "../../axios-client";

const Events = () => {
    const [events, setEvents] = useState({ upcoming: [], past: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        image: null,
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/events");

            // Ensure the response data has the correct structure
            const now = new Date();
            const processedEvents = {
                upcoming: [],
                past: [],
            };

            // If response.data is an array, process it
            if (Array.isArray(response.data)) {
                response.data.forEach((event) => {
                    const eventDate = new Date(event.date);
                    if (eventDate >= now) {
                        processedEvents.upcoming.push(event);
                    } else {
                        processedEvents.past.push(event);
                    }
                });
            }
            // If response.data already has upcoming/past structure, use it directly
            else if (response.data.upcoming && response.data.past) {
                processedEvents.upcoming = response.data.upcoming;
                processedEvents.past = response.data.past;
            }

            setEvents(processedEvents);
            setError(null);
        } catch (error) {
            console.error("Error fetching events:", error);
            setError("Failed to load events. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewEvent((prev) => ({ ...prev, image: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(newEvent).forEach((key) => {
                if (newEvent[key] !== null) {
                    formData.append(key, newEvent[key]);
                }
            });

            await axiosClient.post("/events", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setNewEvent({
                title: "",
                description: "",
                date: "",
                location: "",
                image: null,
            });
            setShowAddForm(false);
            fetchEvents();
        } catch (error) {
            console.error("Error creating event:", error);
            setError("Failed to create event. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="text-center">Loading events...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="text-red-500 text-center">{error}</div>
                <button
                    onClick={fetchEvents}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mx-auto block"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Events Dashboard</h1>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    <Plus size={20} />
                    Add Event
                </button>
            </div>

            {showAddForm && (
                <div className="mb-8 p-6 border rounded-lg shadow-sm bg-white">
                    <h2 className="text-xl font-semibold mb-4">
                        Add New Event
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                required
                                value={newEvent.title}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                required
                                value={newEvent.description}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                className="w-full p-2 border rounded"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Date
                            </label>
                            <input
                                type="datetime-local"
                                required
                                value={newEvent.date}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        date: e.target.value,
                                    }))
                                }
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                required
                                value={newEvent.location}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        location: e.target.value,
                                    }))
                                }
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Image (Optional)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Save Event
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-4 py-2 border rounded hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold mb-4">
                        Upcoming Events
                    </h2>
                    {events.upcoming.length === 0 ? (
                        <p className="text-gray-500">No upcoming events</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {events.upcoming.map((event) => (
                                <div
                                    key={event.id}
                                    className="border rounded-lg overflow-hidden shadow-sm bg-white"
                                >
                                    {event.image && (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">
                                            {event.title}
                                        </h3>
                                        <p className="mb-4">
                                            {event.description}
                                        </p>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                {new Date(
                                                    event.date
                                                ).toLocaleString()}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Past Events</h2>
                    {events.past.length === 0 ? (
                        <p className="text-gray-500">No past events</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {events.past.map((event) => (
                                <div
                                    key={event.id}
                                    className="border rounded-lg overflow-hidden shadow-sm bg-white opacity-75"
                                >
                                    {event.image && (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    console.error(
                                                        "Image failed to load:",
                                                        event.image
                                                    );
                                                    e.target.style.display =
                                                        "none";
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">
                                            {event.title}
                                        </h3>
                                        <p className="mb-4">
                                            {event.description}
                                        </p>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} />
                                                {new Date(
                                                    event.date
                                                ).toLocaleString()}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                {event.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Events;
