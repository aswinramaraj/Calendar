import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/ui/Sidebar';
import CalendarView from './pages/CalendarView';
import SettingsView from './pages/SettingsView';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen font-sans bg-[var(--color-offwhite)] text-[var(--color-dark)]">
        {/* Fixed Left Navigation */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<CalendarView />} />
            <Route path="/settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;