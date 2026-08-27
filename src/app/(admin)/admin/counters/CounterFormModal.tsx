import React, { useState, useEffect, useRef } from 'react';
import { 
  X, ChevronDown, User, Users, UserCheck, Trophy, Activity, Star, 
  TrendingUp, BarChart, Target, Dumbbell, BicepsFlexed, Weight, 
  Scale, HeartPulse, Flame, Timer 
} from 'lucide-react';
import { api } from '@/services/api';

const ICON_OPTIONS = [
  { value: '', label: 'Select an icon...', icon: null, group: '' },
  { value: 'TrendingUp', label: 'Trending Up (Growth)', icon: TrendingUp, group: 'Stats & Data' },
  { value: 'BarChart', label: 'Bar Chart (Metrics)', icon: BarChart, group: 'Stats & Data' },
  { value: 'Activity', label: 'Activity (General Stats)', icon: Activity, group: 'Stats & Data' },
  { value: 'Target', label: 'Target (Goals)', icon: Target, group: 'Stats & Data' },
  { value: 'Trophy', label: 'Trophy (Success)', icon: Trophy, group: 'Stats & Data' },
  { value: 'Star', label: 'Star (Ratings)', icon: Star, group: 'Stats & Data' },
  
  { value: 'Dumbbell', label: 'Dumbbell (Workouts)', icon: Dumbbell, group: 'Gym & Fitness' },
  { value: 'BicepsFlexed', label: 'Biceps (Strength)', icon: BicepsFlexed, group: 'Gym & Fitness' },
  { value: 'Weight', label: 'Weight (Loss/Gain)', icon: Weight, group: 'Gym & Fitness' },
  { value: 'Scale', label: 'Scale (Body Metrics)', icon: Scale, group: 'Gym & Fitness' },
  { value: 'HeartPulse', label: 'Heart Pulse (Cardio)', icon: HeartPulse, group: 'Gym & Fitness' },
  { value: 'Flame', label: 'Flame (Calories)', icon: Flame, group: 'Gym & Fitness' },
  { value: 'Timer', label: 'Timer (Coaching)', icon: Timer, group: 'Gym & Fitness' },
  
  { value: 'Users', label: 'Users (Clients)', icon: Users, group: 'People' },
  { value: 'UserCheck', label: 'Verified User', icon: UserCheck, group: 'People' },
];

interface Counter {
  id: string;
  label: string;
  value: string;
  suffix: string | null;
  icon: string | null;
  status: string;
  displayOrder: number;
}

interface CounterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData: Counter | null;
}

export default function CounterFormModal({ isOpen, onClose, onSuccess, editData }: CounterFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    label: '',
    value: '',
    suffix: '',
    icon: '',
    status: 'ACTIVE',
    displayOrder: 1,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  useEffect(() => {
    if (editData) {
      setFormData({
        label: editData.label,
        value: editData.value,
        suffix: editData.suffix || '',
        icon: editData.icon || '',
        status: editData.status,
        displayOrder: editData.displayOrder,
      });
    } else {
      setFormData({
        label: '',
        value: '',
        suffix: '',
        icon: '',
        status: 'ACTIVE',
        displayOrder: 1,
      });
    }
    setIsDropdownOpen(false);
  }, [editData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'displayOrder' ? parseInt(value) || 0 : value
    }));
  };

  const handleIconSelect = (value: string) => {
    setFormData(prev => ({ ...prev, icon: value }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editData) {
        await api.put(`/counters/${editData.id}`, formData);
      } else {
        await api.post('/counters', formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving counter:', error);
      alert('Failed to save counter. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const selectedIconOption = ICON_OPTIONS.find(opt => opt.value === formData.icon) || ICON_OPTIONS[0];
  const SelectedIcon = selectedIconOption.icon;

  // Group options for rendering
  const groupedOptions = ICON_OPTIONS.reduce((acc, option) => {
    if (!option.group) return acc;
    if (!acc[option.group]) acc[option.group] = [];
    acc[option.group].push(option);
    return acc;
  }, {} as Record<string, typeof ICON_OPTIONS>);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-semibold text-slate-800">
            {editData ? 'Edit Counter' : 'Add New Counter'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Label</label>
            <input 
              type="text" 
              name="label"
              value={formData.label}
              onChange={handleChange}
              placeholder="e.g., Clients Transformed"
              required
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Value</label>
              <input 
                type="text" 
                name="value"
                value={formData.value}
                onChange={handleChange}
                placeholder="e.g., 500"
                required
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Suffix (Optional)</label>
              <input 
                type="text" 
                name="suffix"
                value={formData.suffix}
                onChange={handleChange}
                placeholder="e.g., +"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>
          </div>

          {/* Custom Icon Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Icon (Stats & Fitness)</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
            >
              <div className="flex items-center gap-2 text-slate-700">
                {SelectedIcon ? <SelectedIcon size={18} className="text-violet-600" /> : <div className="w-[18px]" />}
                <span>{selectedIconOption.label}</span>
              </div>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <button
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 text-sm"
                  onClick={() => handleIconSelect('')}
                >
                  Select an icon...
                </button>
                {Object.entries(groupedOptions).map(([group, options]) => (
                  <div key={group}>
                    <div className="px-3 py-1.5 bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider sticky top-0">
                      {group}
                    </div>
                    {options.map((opt) => {
                      const IconComp = opt.icon;
                      const isSelected = formData.icon === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${isSelected ? 'bg-violet-50 text-violet-700' : 'text-slate-700 hover:bg-slate-50'}`}
                          onClick={() => handleIconSelect(opt.value)}
                        >
                          {IconComp && <IconComp size={18} className={isSelected ? 'text-violet-600' : 'text-slate-400'} />}
                          <span className={isSelected ? 'font-medium' : ''}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Display Order</label>
              <input 
                type="number" 
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? 'Saving...' : (editData ? 'Update Counter' : 'Save Counter')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
