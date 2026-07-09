import React, { useState, useEffect } from 'react';
import { Crosshair, Database, Shield, Zap, Edit3 } from 'lucide-react';

interface StatusBarProps {
  weaponCount: number;
  customCount: number;
}

const LOG_MESSAGES = [
  'SYS: 连接至烽火地带数据库...',
  'ARMOR: 4级装甲分析模块就绪',
  'BALLISTICS: 3级穿甲弹弹道模拟完成',
  'CALC: 击杀时间模型初始化成功',
  'READY: 战术数据中心运行中',
  'EDIT: 武器自定义模块已加载',
];

const StatusBar: React.FC<StatusBarProps> = ({ weaponCount, customCount }) => {
  const [currentLog, setCurrentLog] = useState('');
  const [logIndex, setLogIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const message = LOG_MESSAGES[logIndex];
    const speed = isDeleting ? 30 : 50;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < message.length) {
          setCurrentLog(message.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setCurrentLog(message.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setLogIndex((logIndex + 1) % LOG_MESSAGES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, logIndex]);

  return (
    <header
      className="relative w-full border-b"
      style={{
        borderColor: '#22252c',
        backgroundColor: 'rgba(8, 10, 14, 0.85)',
        zIndex: 50,
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo and system info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Crosshair size={20} className="text-[#c9372c]" strokeWidth={2} />
            <span
              className="text-white font-semibold text-[15px] tracking-wider"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              三角洲咕咕靶场
            </span>
            <span
              className="text-[11px] px-1.5 py-0.5 rounded border font-mono-data"
              style={{
                color: '#e0a33e',
                borderColor: 'rgba(224, 163, 62, 0.3)',
                backgroundColor: 'rgba(224, 163, 62, 0.08)',
              }}
            >
              V.1.0
            </span>
          </div>

          <div
            className="hidden md:flex items-center gap-1 text-[13px] font-mono-data"
            style={{ color: '#555' }}
          >
            <span style={{ color: '#e0a33e' }} className="cursor-blink">
              ▌
            </span>
            <span style={{ color: '#e0a33e' }}>{currentLog}</span>
          </div>
        </div>

        {/* Right: Combat environment status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[13px]">
            <Shield size={12} style={{ color: '#34d6e0' }} />
            <span style={{ color: '#888' }}>对抗环境</span>
            <span className="font-mono-data font-semibold" style={{ color: '#e0a33e' }}>
              3级穿甲弹
            </span>
            <span style={{ color: '#555' }}>vs</span>
            <span className="font-mono-data font-semibold" style={{ color: '#c9372c' }}>
              4级防弹衣
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 text-[13px] px-2 py-1 rounded border"
            style={{
              borderColor: '#22252c',
              backgroundColor: 'rgba(14, 17, 24, 0.8)',
            }}
          >
            <Database size={11} style={{ color: '#555' }} />
            <span style={{ color: '#555' }}>LOADED:</span>
            <Zap size={11} style={{ color: '#34d6e0' }} />
            <span className="font-mono-data font-semibold" style={{ color: '#34d6e0' }}>
              {weaponCount}
            </span>
            <span style={{ color: '#555' }}>WEAPONS</span>
            {customCount > 0 && (
              <>
                <span style={{ color: '#22252c' }}>|</span>
                <Edit3 size={10} style={{ color: '#e0a33e' }} />
                <span className="font-mono-data font-semibold" style={{ color: '#e0a33e' }}>
                  {customCount}
                </span>
                <span style={{ color: '#555' }}>EDITED</span>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(StatusBar);
