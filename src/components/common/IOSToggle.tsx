import { Switch } from 'lucide-react';

interface IOSToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const IOSToggle = ({ checked, onChange, label }: IOSToggleProps) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      {label && (
        <span className="mr-3 text-sm font-medium text-gray-700">{label}</span>
      )}
      <div 
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        onClick={() => onChange(!checked)}
      >
        <div
          className={`absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </label>
  );
};