import { TipoMaquina } from '../../../types/maquina';

interface MaquinaTypeSelectProps {
  value: TipoMaquina;
  onChange: (value: TipoMaquina) => void;
}

export const MaquinaTypeSelect = ({ value, onChange }: MaquinaTypeSelectProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tipo de Equipamento
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TipoMaquina)}
        className="w-full p-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
        required
      >
        <option value="">Selecione o tipo de equipamento</option>
        <option value="EXTRUSORA">Extrusora</option>
        <option value="CHILLER">Chiller</option>
        <option value="TORRE_RESFRIAMENTO">Torre de Resfriamento</option>
        <option value="GRAVIMETRICO">Gravimétrico</option>
        <option value="RECUPERADOR_REFILE">Recuperador de Refile</option>
        <option value="OUTRO">Outro</option>
      </select>
    </div>
  );
};