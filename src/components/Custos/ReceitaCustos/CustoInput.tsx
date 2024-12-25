import { LucideIcon } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface CustoInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: LucideIcon;
  iconColor: string;
  min?: number;
  step?: number;
  tooltip?: string;
}

export const CustoInput = ({
  label,
  value,
  onChange,
  icon: Icon,
  iconColor,
  min = 0,
  step = 0.01,
  tooltip
}: CustoInputProps) => {
  return (
    <div>
      <div className="flex items-center mb-2">
        <Icon className={`w-4 h-4 ${iconColor} mr-2`} />
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {tooltip && (
          <Tooltip content={tooltip} />
        )}
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        step={step}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
  );
};