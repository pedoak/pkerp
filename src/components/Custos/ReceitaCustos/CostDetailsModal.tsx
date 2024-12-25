import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { DetalhamentoMaquina } from '../../../types/producaoCustos';

interface CostDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  detalhamento: {
    horasProducao: number;
    custoKwh: number;
    consumoPrincipal: number;
    consumoAuxiliares: number;
    consumoTotal: number;
    custoTotalEnergia: number;
    custoEnergiaKg: number;
    maquinaPrincipal: DetalhamentoMaquina;
    maquinasAuxiliares: DetalhamentoMaquina[];
  };
}

const MaquinaDetails = ({ maquina }: { maquina: DetalhamentoMaquina }) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <h5 className="font-medium text-gray-900 mb-2">{maquina.nome}</h5>
    <div className="space-y-1 text-sm">
      <p><span className="text-gray-600">Tipo:</span> {maquina.tipo}</p>
      <p><span className="text-gray-600">Potência Instalada:</span> {maquina.potenciaInstalada.toFixed(2)} kW</p>
      <p><span className="text-gray-600">Potência de Trabalho:</span> {maquina.potenciaTrabalho.toFixed(2)} kW</p>
      {maquina.tempoAquecimento && (
        <p><span className="text-gray-600">Tempo de Aquecimento:</span> {maquina.tempoAquecimento.toFixed(2)}h</p>
      )}
      {maquina.consumoAquecimento && (
        <p><span className="text-gray-600">Consumo no Aquecimento:</span> {maquina.consumoAquecimento.toFixed(2)} kWh</p>
      )}
      <p><span className="text-gray-600">Consumo Total:</span> {maquina.consumoTotal.toFixed(2)} kWh</p>
    </div>
  </div>
);

export const CostDetailsModal = ({ isOpen, onClose, detalhamento }: CostDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Detalhamento dos Custos de Energia
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Informações Gerais */}
            <div className="grid grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-700">Tempo de Produção</h4>
                <p className="text-gray-900">{detalhamento.horasProducao.toFixed(2)} horas</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Custo do kWh</h4>
                <p className="text-gray-900">R$ {detalhamento.custoKwh.toFixed(2)}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Custo por kg</h4>
                <p className="text-gray-900">R$ {detalhamento.custoEnergiaKg.toFixed(2)}/kg</p>
              </div>
            </div>

            {/* Consumo Total */}
            <div className="grid grid-cols-3 gap-4 bg-green-50 p-4 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-700">Consumo Principal</h4>
                <p className="text-gray-900">{detalhamento.consumoPrincipal.toFixed(2)} kWh</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Consumo Auxiliares</h4>
                <p className="text-gray-900">{detalhamento.consumoAuxiliares.toFixed(2)} kWh</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">Consumo Total</h4>
                <p className="text-gray-900">{detalhamento.consumoTotal.toFixed(2)} kWh</p>
              </div>
            </div>

            {/* Detalhamento por Máquina */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Máquina Principal</h4>
              <MaquinaDetails maquina={detalhamento.maquinaPrincipal} />
            </div>

            {detalhamento.maquinasAuxiliares.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Máquinas Auxiliares</h4>
                <div className="grid grid-cols-2 gap-4">
                  {detalhamento.maquinasAuxiliares.map((maquina, index) => (
                    <MaquinaDetails key={index} maquina={maquina} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Custo Total de Energia</h4>
              <p className="text-2xl font-bold text-green-600">
                R$ {detalhamento.custoTotalEnergia.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Este valor inclui o consumo de todas as máquinas ativas no processo, 
                considerando o tempo de aquecimento quando aplicável e o consumo 
                durante todo o período de produção.
              </p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};