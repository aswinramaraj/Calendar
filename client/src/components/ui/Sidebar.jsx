import { Calendar, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-[var(--color-dark)] text-[var(--color-offwhite)] min-h-screen p-6 flex flex-col shadow-xl z-10">
      <h1 className="text-2xl font-bold text-[var(--color-brandOrange)] mb-10 tracking-wide font-mono">
        My Dates
      </h1>
      
      <nav className="flex flex-col gap-4">
        <NavLink 
          to="/" 
          className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-[var(--color-brandOrange)] text-white font-medium' : 'hover:bg-gray-800 text-gray-400'}`}
        >
          <Calendar size={20} />
          <span>Calendar</span>
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-[var(--color-brandOrange)] text-white font-medium' : 'hover:bg-gray-800 text-gray-400'}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
      
      <div className="mt-auto text-xs text-gray-500 font-mono">
        v1.0.0
      </div>
    </div>
  );
};

export default Sidebar;