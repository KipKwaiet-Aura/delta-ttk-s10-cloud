import React from 'react';
import { Crosshair } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer
      className="w-full border-t mt-8"
      style={{
        borderColor: '#22252c',
        backgroundColor: 'rgba(8, 10, 14, 0.9)',
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs" style={{ color: '#555' }}>
          <Crosshair size={11} />
          <span>2026 DeltaForce TTK Center. All data based on in-game telemetry.</span>
        </div>
        <div className="text-xs" style={{ color: '#444' }}>
          数据仅供战术参考，实战受网络延迟与武器后坐力影响
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
