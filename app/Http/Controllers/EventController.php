<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index()
    {
        $upcomingEvents = Event::upcoming()->orderBy('date')->get();
        $pastEvents = Event::past()->orderBy('date', 'desc')->get();

        // Add the full URL to the image path for both upcoming and past events
        $upcomingEvents = $upcomingEvents->map(function ($event) {
            if ($event->image) {
                $event->image = url($event->image);
            }
            return $event;
        });

        $pastEvents = $pastEvents->map(function ($event) {
            if ($event->image) {
                $event->image = url($event->image);
            }
            return $event;
        });

        return response()->json([
            'upcoming' => $upcomingEvents,
            'past' => $pastEvents
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'location' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048' // 2MB Max
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = Storage::url($path);
        }

        $event = Event::create($validated);

        return response()->json($event, 201);
    }

    public function show(Event $event)
    {
        return response()->json($event);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'date' => 'sometimes|required|date',
            'location' => 'sometimes|required|string|max:255',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($event->image) {
                Storage::delete(str_replace('/storage/', 'public/', $event->image));
            }
            
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = Storage::url($path);
        }

        $event->update($validated);

        return response()->json($event);
    }

    public function destroy(Event $event)
    {
        if ($event->image) {
            Storage::delete(str_replace('/storage/', 'public/', $event->image));
        }

        $event->delete();

        return response()->json(null, 204);
    }
}