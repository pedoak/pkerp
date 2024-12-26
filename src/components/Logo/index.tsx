interface LogoProps {
  isCollapsed: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Logo = ({ isCollapsed, onMouseEnter, onMouseLeave }: LogoProps) => {
  return (
    <div 
      className={`
        flex items-center h-16 px-4
        transition-all duration-300 ease-in-out cursor-pointer
        ${isCollapsed ? 'w-16 justify-center' : 'w-56'}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img 
            src="/logo-pk.png" 
            alt="Logo" 
            className="h-8 w-8 object-contain"
          />
        </div>
        <div 
          className={`
            ml-3 overflow-hidden transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-0 opacity-0' : 'w-32 opacity-100'}
          `}
        >
          <span className="text-base font-semibold text-gray-900 whitespace-nowrap">
            PK ERP
          </span>
        </div>
      </div>
    </div>
  );
};