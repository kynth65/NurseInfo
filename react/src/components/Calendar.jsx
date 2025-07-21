import React, { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
} from "lucide-react";

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Get the current date
    const today = new Date();

    // Go to previous month
    const prevMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
        );
    };

    // Go to next month
    const nextMonth = () => {
        setCurrentMonth(
            new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
        );
    };

    // Helper function to get day names
    const getDayNames = () => {
        return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    };

    // Helper function to get days in month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Helper function to get first day of month (0-6)
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    // Render the calendar grid
    const renderCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);

        let days = [];

        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(
                <div key={`empty-${i}`} className="h-5 sm:h-6 w-5 sm:w-6"></div>
            );
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday =
                today.getDate() === day &&
                today.getMonth() === month &&
                today.getFullYear() === year;

            days.push(
                <div
                    key={`day-${day}`}
                    className={`flex items-center justify-center h-5 sm:h-6 w-5 sm:w-6 text-xs rounded-full
            ${isToday ? "bg-purple-600 text-white" : ""}
            ${
                !isToday &&
                day < today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
                    ? "text-gray-400"
                    : "text-gray-700"
            }`}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    // Format the month and year
    const formatMonthYear = (date) => {
        return date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full p-2 sm:p-3">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div className="flex items-center">
                    <CalendarIcon className="h-4 sm:h-5 w-4 sm:w-5 text-purple-500 mr-1 sm:mr-2" />
                    <h3 className="text-xs sm:text-sm font-medium text-gray-700">
                        Calendar
                    </h3>
                </div>
                <div className="flex space-x-1">
                    <button
                        onClick={prevMonth}
                        className="p-0.5 sm:p-1 rounded-full hover:bg-gray-100"
                        aria-label="Previous month"
                    >
                        <ChevronLeft className="h-3 sm:h-4 w-3 sm:w-4 text-gray-600" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-0.5 sm:p-1 rounded-full hover:bg-gray-100"
                        aria-label="Next month"
                    >
                        <ChevronRight className="h-3 sm:h-4 w-3 sm:w-4 text-gray-600" />
                    </button>
                </div>
            </div>

            <h4 className="text-xs sm:text-sm font-medium text-center mb-1 sm:mb-2 text-gray-600">
                {formatMonthYear(currentMonth)}
            </h4>

            <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                {getDayNames().map((day) => (
                    <div
                        key={day}
                        className="text-tiny sm:text-xs text-center font-medium text-gray-500"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                {renderCalendarDays()}
            </div>
        </div>
    );
};

export default Calendar;
