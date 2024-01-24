import { LogoLabel } from '@xyflow/xy-ui';
import NavMenu from './NavMenu';

function Navigation() {
  return (
    <div className="bg-white relative border-b px-4 top-0">
      <div className="flex items-center justify-between py-3 max-w-7xl mx-auto">
        <LogoLabel
          label={
            <span className="flex items-center">
              <span>React Flow</span>
              <span className="bg-pink-100 text-xs rounded-full text-primary px-1 py-0.5 ml-1">Pro</span>
            </span>
          }
        />
        <NavMenu />
      </div>
    </div>
  );
}

export default Navigation;
