import { useState, useEffect } from 'react';
import { Save, Bell, Smartphone, Mail, Clock } from 'lucide-react';
import api from '../utils/api';

const SettingsView = () => {
  const [settings, setSettings] = useState({
    adminName: '',
    adminPhone: '',
    adminEmail: '',
    notifyTime: '06:00',
    whatsappEnabled: true,
    emailEnabled: true,
    daysAhead: [0, 1, 7]
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch settings on load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // Handle Days Ahead checkbox toggle
  const toggleDay = (day) => {
    setSettings(prev => {
      const newDays = prev.daysAhead.includes(day)
        ? prev.daysAhead.filter(d => d !== day)
        : [...prev.daysAhead, day];
      return { ...prev, daysAhead: newDays.sort((a,b) => a-b) };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await api.put('/settings', settings);
      setMessage('✅ Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error saving settings.');
    }
    setIsSaving(false);
  };

  return (
    <div className="h-full flex flex-col p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Notification Engine</h2>
          <p className="text-gray-500 mt-1">Configure how and when F.R.I.D.A.Y. contacts you.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[var(--color-brandOrange)] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-md disabled:opacity-50"
        >
          <Save size={20} /> {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {message && <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg font-medium border border-green-200">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-3 mb-2">Admin Profile</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input type="text" value={settings.adminName} onChange={e => setSettings({...settings, adminName: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[var(--color-brandOrange)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Smartphone size={16}/> WhatsApp Number</label>
            <input type="text" value={settings.adminPhone} onChange={e => setSettings({...settings, adminPhone: e.target.value})} placeholder="whatsapp:+91..." className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[var(--color-brandOrange)] font-mono text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Mail size={16}/> Email Address</label>
            <input type="email" value={settings.adminEmail} onChange={e => setSettings({...settings, adminEmail: e.target.value})} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[var(--color-brandOrange)]" />
          </div>
        </div>

        {/* Engine Config Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-6">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-3 flex items-center gap-2"><Bell size={20}/> Triggers</h3>
          
          <div className="flex flex-col gap-4">
            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <span className="font-medium text-gray-700 flex items-center gap-2"><Smartphone size={18} className="text-green-600"/> Enable WhatsApp</span>
              <input type="checkbox" checked={settings.whatsappEnabled} onChange={e => setSettings({...settings, whatsappEnabled: e.target.checked})} className="w-5 h-5 accent-[var(--color-brandOrange)]" />
            </label>

            <label className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <span className="font-medium text-gray-700 flex items-center gap-2"><Mail size={18} className="text-blue-600"/> Enable Email</span>
              <input type="checkbox" checked={settings.emailEnabled} onChange={e => setSettings({...settings, emailEnabled: e.target.checked})} className="w-5 h-5 accent-[var(--color-brandOrange)]" />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"><Clock size={16}/> Warning Window (Days Ahead)</label>
            <div className="flex flex-wrap gap-2">
              {[ {label: 'Today (0)', val: 0}, {label: 'Tomorrow (1)', val: 1}, {label: '3 Days', val: 3}, {label: '7 Days', val: 7}, {label: '14 Days', val: 14} ].map(day => (
                <button
                  key={day.val}
                  onClick={() => toggleDay(day.val)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${settings.daysAhead.includes(day.val) ? 'bg-[var(--color-dark)] text-[var(--color-brandOrange)] border-2 border-[var(--color-dark)]' : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'}`}
                >
                  {day.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">The system will only message you if an event falls exactly on these timelines.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;