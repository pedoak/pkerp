import { MainLayout } from '../components/Layout/MainLayout';
import { ReceitaCustos } from '../components/Custos/ReceitaCustos';

export const Custos = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Análise de Custos</h1>
        <ReceitaCustos />
      </div>
    </MainLayout>
  );
};