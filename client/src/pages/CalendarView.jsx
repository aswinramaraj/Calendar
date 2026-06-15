import { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import api from '../utils/api';
import EventModal from '../components/ui/EventModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup localizer for react-big-calendar
const localizer = momentLocalizer(moment);

const categoryColors = {
  birthday: '#7C3AED',   // Purple
  anniversary: '#C4520F',// Orange
  exam: '#A36A00',       // Amber
  reminder: '#1A5FA6',   // Blue
  festival: '#1A7A4A',   // Green
  other: '#6B6B68'       // Gray
};

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await api.get('/events');
      // Transform MongoDB data into the format react-big-calendar expects
      const formattedEvents = response.data.map(ev => ({
        title: ev.title,
        start: new Date(ev.date),
        end: new Date(ev.date),
        allDay: true,
        resource: ev // Keep the original data attached for editing
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Handle clicking a blank day
  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  // Handle clicking an existing event
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    setIsModalOpen(true);
  };

  // Custom styling for events based on category
  const eventStyleGetter = (event) => {
    const category = event.resource.category;
    const backgroundColor = categoryColors[category] || categoryColors.other;
    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block',
        padding: '2px 6px',
        fontWeight: '500',
        fontSize: '0.85rem'
      }
    };
  };

  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Your Calendar</h2>
          <p className="text-gray-500 mt-1">Never miss an important date again.</p>
        </div>
        <button 
          onClick={() => { setSelectedEvent(null); setSelectedDate(new Date()); setIsModalOpen(true); }}
          className="bg-[var(--color-brandOrange)] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-md"
        >
          + Add New Date
        </button>
      </div>

      <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          views={['month', 'agenda']}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          popup
        />
      </div>

      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedDate={selectedDate}
        existingEvent={selectedEvent}
        refreshEvents={fetchEvents}
      />
    </div>
  );
};

export default CalendarView;