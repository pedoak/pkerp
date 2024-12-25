import { useState } from 'react';
import { FileText, Printer, Calculator } from 'lucide-react';
import { Receita } from '../../types/receita';
import { Insumo } from '../../types/insumo';
import { CalculadoraPeso } from './CalculadoraPeso';
import { TabelaComposicao } from './TabelaComposicao';
import { CaracteristicasInsumo } from './CaracteristicasInsumo';

interface FichaProdutoProps {
  receita: Receita;
  insumos: Insumo[];
}

export const FichaProduto = ({ receita, insumos }: FichaProdutoProps) => {
  const [pesoTotal, setPesoTotal] = useState(0);

  const getInsumo = (id: string) => insumos.find(i => i.id === id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Cabeçalho do documento */}
      <div className="flex items-center justify-between mb-4 print:hidden">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-800">{receita.nome}</h1>
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          <Printer className="w-4 h-4 mr-1" />
          Imprimir
        </button>
      </div>

      {/* Cabeçalho da Impressão */}
      <div className="hidden print:block mb-6">
        <div className="text-center border-b pb-4">
          <h1 className="text-xl font-bold text-gray-900">{receita.nome}</h1>
          {receita.descricao && (
            <p className="text-sm text-gray-600 mt-1">{receita.descricao}</p>
          )}
        </div>
      </div>

      {/* Calculadora */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 print:hidden">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-medium text-gray-800">Calculadora de Peso</h2>
          </div>
          <CalculadoraPeso onCalculate={setPesoTotal} />
        </div>
      </div>

      {!pesoTotal && (
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm print:hidden">
          Utilize a calculadora acima para visualizar a composição da receita
        </div>
      )}

      {pesoTotal > 0 && (
        <div className="space-y-4">
          {/* Tabela de Composição */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 print:border-0 print:shadow-none">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-medium text-gray-800">Composição da Receita</h2>
              </div>
              <TabelaComposicao
                itens={receita.itens}
                insumos={insumos}
                pesoTotal={pesoTotal}
              />
            </div>
          </div>

          {/* Características dos Insumos */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 print:border-0 print:shadow-none">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-medium text-gray-800">Características dos Insumos</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {receita.itens.map((item, index) => {
                  const insumo = getInsumo(item.insumoId);
                  if (!insumo) return null;
                  return (
                    <CaracteristicasInsumo
                      key={index}
                      insumo={insumo}
                      percentual={item.percentual}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rodapé da Impressão */}
      <div className="hidden print:block mt-8 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Sistema de Extrusão</span>
          <span>Impresso em: {new Date().toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </div>
  );
};