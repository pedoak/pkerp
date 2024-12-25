interface LogoProps {
  isCollapsed: boolean;
}

export const Logo = ({ isCollapsed }: LogoProps) => {
  return (
    <div 
      className={`
        flex items-center justify-center h-16
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-56'}
      `}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img 
            src="/pk-logo.png" 
            alt="Logo" 
            className="h-7 w-7 object-contain"
          />
        </div>
        <div 
          className={`
            ml-3 overflow-hidden transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
          `}
        >
          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
            Controle de Extrusão
          </span>
        </div>
      </div>
    </div>
  );
};