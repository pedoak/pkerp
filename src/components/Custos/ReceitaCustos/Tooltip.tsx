import { Info } from 'lucide-react';

interface TooltipProps {
  content: string;
}

export const Tooltip = ({ content }: TooltipProps) => {
  return (
    <div className="group relative ml-2">
      <Info className="w-4 h-4 text-gray-400 cursor-help" />
      <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
        {content}
      </div>
    </div>
  );
};