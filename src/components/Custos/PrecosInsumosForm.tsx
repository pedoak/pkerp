import { useForm } from 'react-hook-form';
import { DollarSign } from 'lucide-react';
import { PrecoInsumo, Fornecedor } from '../../types/fornecedor';
import { useEffect, useState } from 'react';
import { insumoService } from '../../services/insumoService';
import { Insumo } from '../../types/insumo';
import { useAuth } from '../../contexts/AuthContext';

interface PrecosInsumosFormProps {
  onSubmit: (data: PrecoInsumo) => Promise<void>;
  fornecedores: Fornecedor[];
  precosInsumos: PrecoInsumo[];
}

export const PrecosInsumosForm = ({ 
  onSubmit, 
  fornecedores, 
  precosInsumos 
}: PrecosInsumosFormProps) => {
  const { register, handleSubmit, reset } = useForm<PrecoInsumo>();
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const carregarInsumos = async () => {
      if (!user?.id) return;
      try {
        const data = await insumoService.listarInsumos(user.id);
        setInsumos(data);
      } catch (error) {
        console.error('Erro ao carregar insumos:', error);
      }
    };

    carregarInsumos();
  }, [user?.id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Resto do código permanece igual */}
    </div>
  );
};