/**
 * Минимальная абстракция: несколько узлов данных → связи сходятся в один
 * поток → кривая роста к светящейся точке. Без фото, без шума.
 */
export default function HeroViz() {
  const nodes = [
    { x: 24, y: 60 },
    { x: 30, y: 132 },
    { x: 20, y: 206 },
    { x: 72, y: 96 },
    { x: 78, y: 176 },
  ];
  const hub = { x: 150, y: 138 };

  return (
    <svg
      className="hero__viz"
      viewBox="0 0 420 300"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="flow" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4d7cff" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#4d7cff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7ba0ff" stopOpacity="1" />
        </linearGradient>
        <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* связи узлов в хаб */}
      {nodes.map((n, i) => (
        <path
          key={i}
          d={`M ${n.x} ${n.y} C ${(n.x + hub.x) / 2} ${n.y}, ${
            (n.x + hub.x) / 2
          } ${hub.y}, ${hub.x} ${hub.y}`}
          stroke="rgba(150,170,220,0.22)"
          strokeWidth="1"
        />
      ))}

      {/* основной поток: хаб → рост */}
      <path
        d={`M ${hub.x} ${hub.y} C 236 138, 262 120, 292 84 S 360 26, 402 20`}
        stroke="url(#flow)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        className="hero__flow-dash"
        d={`M ${hub.x} ${hub.y} C 236 138, 262 120, 292 84 S 360 26, 402 20`}
        stroke="#9cc0ff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="4 150"
      />

      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="3"
          fill="#8fb0ff"
          opacity={0.8}
          style={{
            animation: `heroPulse 4s ${i * 0.7}s ease-in-out infinite`,
          }}
        />
      ))}
      <circle cx={hub.x} cy={hub.y} r="5" fill="#4d7cff" />
      <circle cx="402" cy="20" r="10" fill="#7ba0ff" filter="url(#soft)" opacity="0.55" />
      <circle cx="402" cy="20" r="4.5" fill="#cfe0ff" />
    </svg>
  );
}
