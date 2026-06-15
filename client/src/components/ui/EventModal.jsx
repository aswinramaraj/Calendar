import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import api from '../../utils/api';

const EventModal = ({ isOpen, onClose, selectedDate, existingEvent, refreshEvents }) => {
  const [formData, setFormData] = useState({
    title: '',
    person: '',
    category: 'birthday',
    date: '',
    repeat: 'yearly',
    note: ''
  });

  useEffect(() => {
    if (existingEvent) {
      setFormData({
        ...existingEvent.resource,
        date: new Date(existingEvent.start).toISOString().split('T')[0]
      });
    } else if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate.toISOString().split('T')[0] }));
    } else {
      setFormData({ title: '', person: '', category: 'birthday', date: '', repeat: 'yearly', note: '' });
    }
  }, [existingEvent, selectedDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingEvent) {
        await api.put(`/events/${existingEvent.resource._id}`, formData);
      } else {
        await api.post('/events', formData);
      }
      refreshEvents();
      onClose();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDelete = async () => {
    if (!existingEvent) return;
    try {
      await api.delete(`/events/${existingEvent.resource._id}`);
      refreshEvents();
      onClose();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-lg text-gray-800">
            {existingEvent ? 'Edit Date' : 'Add New Date'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[var(--color-brandOrange)] outline-none" placeholder="e.g., Brother's Birthday" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Person</label>
              <input type="text" value={formData.person} onChange={e => setFormData({...formData, person: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[var(--color-brandOrange)] outline-none" placeholder="Optional" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 bg-white outline-none">
                <option value="birthday">Birthday 🎂</option>
                <option value="anniversary">Anniversary 💑</option>
                <option value="exam">Exam 📝</option>
                <option value="festival">Festival 🎉</option>
                <option value="reminder">Reminder 🔔</option>
                <option value="other">Other 📌</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Repeat</label>
              <select value={formData.repeat} onChange={e => setFormData({...formData, repeat: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 bg-white outline-none">
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="once">Once</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
            <textarea value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2 outline-none" rows="2" placeholder="Gift ideas, exact timings..."></textarea>
          </div>

          <div className="flex justify-between mt-4">
            {existingEvent ? (
              <button type="button" onClick={handleDelete} className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors">
                <Trash2 size={18} /> Delete
              </button>
            ) : <div></div>}
            
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">Cancel</button>
              <button type="submit" className="bg-[var(--color-brandOrange)] text-white px-5 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors">Save Date</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;