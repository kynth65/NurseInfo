import React, { useState, useEffect } from "react";
import { Calendar, MapPin, Plus, Trash2 } from "lucide-react";
import axiosClient from "../../axios-client";
import Loading from "../Loading";

const Events = () => {
    const [events, setEvents] = useState({ upcoming: [], past: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
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
            // Create preview URL
            const preview = URL.createObjectURL(file);
            setImagePreview(preview);
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
            // Clean up the preview URL
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
                setImagePreview(null);
            }
            setShowModal(false);
            fetchEvents();
        } catch (error) {
            console.error("Error creating event:", error);
            setError("Failed to create event. Please try again.");
        }
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm("Are you sure you want to delete this event?")) {
            return;
        }

        try {
            await axiosClient.delete(`/events/${eventId}`);
            // Refresh events list after successful deletion
            fetchEvents();
        } catch (error) {
            console.error("Error deleting event:", error);
            setError("Failed to delete event. Please try again.");
        }
    };

    const EventCard = ({ event, isPast }) => (
        <div className="border rounded-lg overflow-hidden shadow-sm bg-white relative">
            <button
                onClick={() => handleDelete(event.id)}
                className="absolute top-2 cursor-pointer right-2 p-2 bg-red-100 hover:bg-red-200 rounded-full text-red-600 transition-colors"
                title="Delete event"
            >
                <Trash2 size={16} />
            </button>

            {event.image && (
                <div className="h-48 overflow-hidden">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            console.error("Image failed to load:", event.image);
                            e.target.style.display = "none";
                        }}
                    />
                </div>
            )}
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                <p className="mb-4">{event.description}</p>
                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date(event.date).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        {event.location}
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <Loading />
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
                    onClick={() => setShowModal(true)}
                    className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    <Plus size={20} />
                    Add Event
                </button>
            </div>

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
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    isPast={false}
                                />
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
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    isPast={true}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-neutral-100 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg min-h-screen shadow-lg max-w-2xl w-full mx-4">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-6 text-center">
                                Add New Event
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter event title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows="4"
                                        placeholder="Enter event description"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter event location"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Image (Optional)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {imagePreview && (
                                        <div className="mt-2 relative w-48 h-32 rounded-lg overflow-hidden">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-500 text-white cursor-pointer rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Save Event
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            setNewEvent({
                                                title: "",
                                                description: "",
                                                date: "",
                                                location: "",
                                                image: null,
                                            });
                                            if (imagePreview) {
                                                URL.revokeObjectURL(
                                                    imagePreview
                                                );
                                                setImagePreview(null);
                                            }
                                        }}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 cursor-pointer rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
