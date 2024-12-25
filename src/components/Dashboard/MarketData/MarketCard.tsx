import { LucideIcon } from 'lucide-react';

interface MarketCardProps {
  title: string;
  value: string | undefined;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  timestamp?: string;
}

export const MarketCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  bgColor,
  timestamp 
}: MarketCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value || '-'}</p>
        </div>
        <div className={`p-3 rounded-full ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      {timestamp && (
        <p className="text-xs text-gray-500 mt-4">
          Última atualização: {new Date(timestamp).toLocaleString('pt-BR')}
        </p>
      )}
    </div>
  );
};