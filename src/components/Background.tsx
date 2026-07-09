import React from 'react';

const Background: React.FC = () => {
  return (
    <>
      {/* Grid background */}
      <div
        className="fixed inset-0 grid-bg"
        style={{ zIndex: 0, backgroundColor: '#080a0e' }}
      />

      {/* === Real Radar Sweep === */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div className="real-radar-sweep" />
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 70%, rgba(8,10,14,0.25) 100%)',
        }}
      />
    </>
  );
};

export default React.memo(Background);
