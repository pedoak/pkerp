import React from 'react';
import { Edit } from 'lucide-react';
import { Insumo } from '../../types/insumo';

interface TabelaInsumosProps {
  insumos: Insumo[];
  onEdit: (insumo: Insumo) => void;
}

export const TabelaInsumos: React.FC<TabelaInsumosProps> = ({ insumos, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Densidade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {insumos.map((insumo) => (
            <tr key={insumo.id}>
              <td className="px-6 py-4 whitespace-nowrap">{insumo.nome}</td>
              <td className="px-6 py-4 whitespace-nowrap">{insumo.tipo}</td>
              <td className="px-6 py-4 whitespace-nowrap">{insumo.grade}</td>
              <td className="px-6 py-4 whitespace-nowrap">{insumo.densidade}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onEdit(insumo)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};