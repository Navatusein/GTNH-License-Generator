import {useId} from "react";

const NAVY = "#14274a";
// Inline style rather than a CSS class, so the font survives the PNG export
const SEAL_TEXT_STYLE = {fontFamily: "'Press Start 2P', monospace"};

type PixelArtProps = {
  rows: string[];
  palette: Record<string, string>;
  className?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

function PixelArt({rows, palette, ...svgProps}: PixelArtProps) {
  const width = Math.max(...rows.map((row) => row.length));
  return (
    <svg viewBox={`0 0 ${width} ${rows.length}`} shapeRendering="crispEdges" aria-hidden="true" {...svgProps}>
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          palette[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={palette[ch]} /> : null,
        ),
      )}
    </svg>
  );
}

const MOTOR_PALETTE = {
  o: "#1b2540",
  w: "#f3f5f9",
  l: "#cfd5df",
  m: "#98a2b4",
  d: "#5e697f",
};

const MOTOR_ROWS = [
  "..............oooooooo........",
  ".............owwwwwwwlo.......",
  ".............olllllllmo.......",
  ".............ommmmmmmdo.......",
  "......oooooooooooooooooooo....",
  ".....owwwlwlwlwlwlwlwlwlllo...",
  "....owllmlmlmlmlmlmlmlmlmmdo..",
  "....owlmdmdmdmdmdmdmdmdmlmdo..",
  "....owlmdmdmdmdmdmdmdmdmlmdo..",
  "....owlmdmdmdmdmdmdmdmdmlmdo..",
  "ooooowlmdmdmdmdmdmdmdmdmlmdo..",
  "owwwlwlmdmdmdmdmdmdmdmdmlmdo..",
  "ollmmwlmdmdmdmdmdmdmdmdmlmdo..",
  "ommddwlmdmdmdmdmdmdmdmdmlmdo..",
  "ooooowlmdmdmdmdmdmdmdmdmlmdo..",
  "....owlmdmdmdmdmdmdmdmdmlmdo..",
  "....owlmdmdmdmdmdmdmdmdmlmdo..",
  "....olmmdmdmdmdmdmdmdmdmmddo..",
  ".....omddddddddddddddddddddo..",
  "......oooooooooooooooooooo....",
  ".......ommdo........ommdo.....",
  "....oooommdoooooooooommdoooo..",
  "....owwwwwwwwwwwwwwwwwwwwllo..",
  "....ommmmmmmmmmmmmmmmmmmmddo..",
  "....oooooooooooooooooooooooo..",
];

export function Motor({className}: {className?: string}) {
  return <PixelArt className={className} rows={MOTOR_ROWS} palette={MOTOR_PALETTE} />;
}

const POOP_PALETTE = {
  o: "#3a2110",
  h: "#c08a4c",
  b: "#8c5a2a",
  d: "#663f1c",
};

const POOP_ROWS = [
  ".......ooo......",
  "......obbbo.....",
  ".....obhbbo.....",
  ".....obbbbdo....",
  "....oobbbbddo...",
  "...obhhbbbbbdo..",
  "...obbbbbbbbdo..",
  "..oobbbbbbbbddo.",
  ".obhhhbbbbbbbbdo",
  ".obbbbbbbbbbbbdo",
  ".obbbbbbbbbbbddo",
  "..oddddddddddddo",
  "...oooooooooooo.",
];

function gearPath(cx: number, cy: number, outer: number, inner: number, hole: number, teeth = 8) {
  const step = (Math.PI * 2) / teeth;
  const point = (r: number, a: number) => `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  const outline = Array.from({length: teeth}, (_, i) => {
    const a = i * step;
    return [
      point(inner, a - step * 0.3),
      point(outer, a - step * 0.18),
      point(outer, a + step * 0.18),
      point(inner, a + step * 0.3),
    ].join(" L");
  }).join(" L");
  const bore = `M${cx + hole},${cy} a${hole},${hole} 0 1,0 ${-2 * hole},0 a${hole},${hole} 0 1,0 ${2 * hole},0Z`;
  return `M${outline}Z ${bore}`;
}

export function Gear({className, color = NAVY}: {className?: string; color?: string}) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <path d={gearPath(50, 50, 48, 36, 15)} fill={color} fillRule="evenodd" />
    </svg>
  );
}

function arc(cx: number, cy: number, r: number, top: boolean) {
  return `M${cx - r},${cy} A${r},${r} 0 0 ${top ? 1 : 0} ${cx + r},${cy}`;
}

function starPoints(cx: number, cy: number, outer: number, inner: number, spikes: number) {
  return Array.from({length: spikes * 2}, (_, i) => {
    const r = i % 2 ? inner : outer;
    const a = (Math.PI * i) / spikes;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}

export function GoldSeal({className}: {className?: string}) {
  const id = useId();
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-gold`} cx="38%" cy="32%" r="80%">
          <stop offset="0" stopColor="#f8e08a" />
          <stop offset="0.55" stopColor="#d4a53a" />
          <stop offset="1" stopColor="#8f6614" />
        </radialGradient>
        <path id={`${id}-top`} d={arc(120, 120, 70, true)} />
        <path id={`${id}-bottom`} d={arc(120, 120, 86, false)} />
      </defs>
      <polygon points={starPoints(120, 120, 118, 106, 28)} fill={`url(#${id}-gold)`} />
      <circle cx="120" cy="120" r="98" fill="none" stroke="#7a5510" strokeWidth="2" />
      <circle cx="120" cy="120" r="56" fill="#e9c765" stroke="#7a5510" strokeWidth="2" />
      <text style={SEAL_TEXT_STYLE} fill="#5b3d08" fontSize="22" textAnchor="middle">
        <textPath href={`#${id}-top`} startOffset="50%">
          GTNH
        </textPath>
      </text>
      <text style={SEAL_TEXT_STYLE} fill="#5b3d08" fontSize="16" textAnchor="middle">
        <textPath href={`#${id}-bottom`} startOffset="50%">
          POOP LICENSE
        </textPath>
      </text>
      <PixelArt rows={POOP_ROWS} palette={POOP_PALETTE} x={76} y={84} width={88} height={72} />
    </svg>
  );
}

export function Stamp({className}: {className?: string}) {
  const id = useId();
  const ink = "#2456b8";
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id={`${id}-top`} d={arc(100, 100, 62, true)} />
        <path id={`${id}-bottom`} d={arc(100, 100, 80, false)} />
      </defs>
      <circle cx="100" cy="100" r="95" fill="none" stroke={ink} strokeWidth="5" />
      <circle cx="100" cy="100" r="86" fill="none" stroke={ink} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="52" fill="none" stroke={ink} strokeWidth="1.5" />
      <text style={SEAL_TEXT_STYLE} fill={ink} fontSize="20" textAnchor="middle">
        <textPath href={`#${id}-top`} startOffset="50%">
          GTNH
        </textPath>
      </text>
      <text style={SEAL_TEXT_STYLE} fill={ink} fontSize="15" textAnchor="middle">
        <textPath href={`#${id}-bottom`} startOffset="50%">
          APPROVED
        </textPath>
      </text>
      <path d={gearPath(100, 100, 40, 30, 12)} fill={ink} fillRule="evenodd" />
      <circle cx="26" cy="100" r="4" fill={ink} />
      <circle cx="174" cy="100" r="4" fill={ink} />
    </svg>
  );
}

export function Signature({className}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 220 90" aria-hidden="true">
      <path
        d="M18,70 C40,52 62,20 66,8 C70,-2 56,10 54,34 C52,58 50,80 58,78 C68,74 70,48 82,46 C92,44 84,62 94,60 C104,58 102,44 112,46 C120,48 114,60 126,56 C150,48 176,40 206,36"
        fill="none"
        stroke="#1c3f9a"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CORNER_ROWS = [
  "ooooooooo",
  "o.......o",
  "o.ooooo.o",
  "o.o...o.o",
  "o.o.o.o.o",
  "o.o...o.o",
  "o.ooooo.o",
  "o.......o",
  "ooooooooo",
];

export function Corner({className}: {className?: string}) {
  return <PixelArt className={className} rows={CORNER_ROWS} palette={{o: "#2b4677"}} />;
}

export function Check({className}: {className?: string}) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3,13 l6,6 l12,-14" fill="none" stroke={NAVY} strokeWidth="4.5" />
    </svg>
  );
}
