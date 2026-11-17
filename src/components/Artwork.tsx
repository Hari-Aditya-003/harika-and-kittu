import { useId } from "react";

export function Ganesh({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 150"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M55 40 61 23h18l7 17M59 30h22M66 22l4-9 4 9M50 47c-6-14-30-12-31 5-1 20 14 32 28 29M90 47c6-14 30-12 31 5 1 20-14 32-28 29" />
        <path d="M48 62c-9-14-20-11-20-2 0 10 8 16 15 16M92 62c9-14 20-11 20-2 0 10-8 16-15 16M52 44c8-9 28-9 36 0 10 12 4 29-3 34-7 7-9 11-8 19 1 10 17 12 20 2 2-7-3-11-7-8" />
        <path d="M51 45c-8 13-4 28 2 34 10 9 9 18 6 25M63 72c2 4 10 4 13 0M58 57l5 2m14 0 5-2M70 45v9M66 48h8M51 83c-13-2-20 6-19 19M89 82c15-1 21 10 17 22M40 86l-5-8m64 9 7-10M40 98c-14 7-19 20-8 24 9 4 20-1 26-8M99 98c13 8 18 19 8 24-9 4-20-1-27-8" />
        <path d="M52 88c-8 22 0 35 18 35s28-12 19-34M58 97c4 5 18 5 23 0M47 126l23 10 24-10M37 134h66M58 118l-5 9m29-9 5 9M28 100l-4-8-4 7 5 5m85-4 7-8 3 8-6 4" />
        <path
          d="M43 138q27 14 54 0M16 116l-6 5 7 4m108-8 6 4-6 5"
          strokeWidth="1"
        />
      </g>
      <g fill="currentColor">
        <circle cx="58" cy="63" r="1.6" />
        <circle cx="82" cy="63" r="1.6" />
        <circle cx="70" cy="38" r="2" />
      </g>
    </svg>
  );
}

export function Flourish({ light = false }: { light?: boolean }) {
  return (
    <svg
      className={`flourish ${light ? "light" : ""}`}
      width="170"
      height="24"
      viewBox="0 0 170 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 12h57m56 0h57M65 12c-12-14-21 0-9 0s17-8 20-7m29 7c12-14 21 0 9 0s-17-8-20-7"
        stroke="currentColor"
        strokeWidth=".8"
      />
      <path d="m85 5 7 7-7 7-7-7z" stroke="currentColor" />
      <path d="m85 9 3 3-3 3-3-3z" fill="currentColor" />
    </svg>
  );
}

export function Botanical({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`botanical ${className}`}
      viewBox="0 0 230 560"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <g id={`${id}-leaf`}>
          <path
            d="M0 0C-30-26-51-15-39 0-26 13-9 10 0 0Z"
            fill="currentColor"
            fillOpacity=".12"
          />
          <path
            d="M0 0C-30-26-51-15-39 0-26 13-9 10 0 0ZM-2-1l-36-5"
            stroke="currentColor"
            strokeWidth=".7"
          />
        </g>
        <g id={`${id}-flower`}>
          <g stroke="currentColor" strokeWidth=".8">
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-13"
                rx="6"
                ry="13"
                transform={`rotate(${i * 45})`}
                fill="currentColor"
                fillOpacity=".06"
              />
            ))}
          </g>
          <circle r="7" fill="currentColor" fillOpacity=".18" />
          <circle r="4" stroke="currentColor" />
        </g>
      </defs>
      <g stroke="currentColor" strokeWidth="1">
        <path d="M46 556C164 450 21 363 96 271S168 99 114 7M88 463C54 426 47 395 17 373M84 364c69-40 67-97 124-120M111 242C44 217 42 173 15 156M131 153c40-36 36-61 66-90M95 523c55-14 80-55 108-57" />
      </g>
      {[
        [81, 499, -20],
        [103, 473, 130],
        [97, 434, 30],
        [86, 397, -30],
        [87, 366, 140],
        [103, 333, 30],
        [123, 299, 160],
        [120, 259, 35],
        [120, 220, 160],
        [131, 180, 20],
        [140, 141, 155],
        [137, 100, 20],
        [126, 56, 160],
        [44, 406, -10],
        [29, 386, 120],
        [66, 196, -20],
        [39, 181, 5],
        [171, 285, 150],
        [190, 262, 20],
        [171, 107, 150],
        [188, 80, 10],
        [147, 503, 140],
        [181, 482, 20],
      ].map(([x, y, r], i) => (
        <use
          key={i}
          href={`#${id}-leaf`}
          transform={`translate(${x} ${y}) rotate(${r})`}
        />
      ))}
      {[
        [20, 364, 0.9],
        [206, 237, 0.8],
        [15, 148, 0.75],
        [111, 12, 0.7],
        [199, 55, 0.7],
        [205, 460, 0.8],
      ].map(([x, y, s], i) => (
        <use
          key={i}
          href={`#${id}-flower`}
          transform={`translate(${x} ${y}) scale(${s})`}
        />
      ))}
    </svg>
  );
}

export function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`lotus ${className}`}
      viewBox="0 0 200 120"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.3">
        <path
          d="M100 94C61 64 79 29 100 9c21 20 39 55 0 85Z"
          fill="currentColor"
          fillOpacity=".05"
        />
        <path d="M100 94C56 93 37 62 39 36c27 0 55 20 61 58ZM100 94c44-1 63-32 61-58-27 0-55 20-61 58Z" />
        <path d="M100 94C51 111 23 85 14 64c29-7 61 8 86 30ZM100 94c49 17 77-9 86-30-29-7-61 8-86 30Z" />
        <path d="M35 108h130M54 115h92M100 24v66" strokeWidth=".6" />
      </g>
    </svg>
  );
}

export function Lamp({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`lamp ${className}`}
      viewBox="0 0 100 210"
      fill="none"
      aria-hidden="true"
    >
      <g
        fill="currentColor"
        fillOpacity=".12"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M47 81h6v99h-6zM27 185h46l6 9H21zM39 176h22l6 9H33zM18 70h64c-4 17-15 23-32 23S22 87 18 70Z" />
        <path d="M10 69h80M29 62h42M35 59c1-13 29-13 30 0M50 15c-18 20-15 28 0 31 14-5 17-14 0-31Z" />
        <path d="M50 28v27M42 111h16m-16 7h16m-16 39h16M26 199h48" />
      </g>
    </svg>
  );
}

export function Fire() {
  return (
    <svg
      className="sacred-fire"
      viewBox="0 0 100 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="flame flame-outer"
        d="M49 67C13 59 38 32 39 23c7 7 8 13 9 17 8-16 3-27 14-38-2 25 25 48 6 62Z"
        fill="#db8731"
      />
      <path
        className="flame flame-inner"
        d="M49 67c-15-5-11-21-3-29 0 11 6 11 9 17 0-10 5-14 7-20 10 17 8 28-4 32Z"
        fill="#f7d58b"
      />
    </svg>
  );
}

function Elephant({ flipped = false }: { flipped?: boolean }) {
  return (
    <g transform={flipped ? "translate(116 0) scale(-1 1)" : ""}>
      <g className="elephant-body">
        <path
          d="M20 72C7 54 9 25 36 24h39c24 0 34 13 31 31l-2 27c0 19-19 21-23 6l2-22-7-7-8 23H24Z"
          fill="#d4c5a4"
          stroke="#977b54"
        />
        <path
          d="M28 35h43v34H28z"
          fill="#711f30"
          stroke="#b68a46"
          strokeWidth="2"
        />
        <path d="m33 39 15 23 17-23M32 64h34" stroke="#e8d5ac" />
        <circle cx="48" cy="48" r="4" fill="#b68a46" />
        <path
          d="M80 28c-19 3-22 29-5 35 14-5 17-22 5-35Z"
          fill="#b8a68a"
          stroke="#977b54"
        />
        <circle cx="93" cy="40" r="2" fill="#472c25" />
        <path d="M103 60c-4 11-12 11-14 4" stroke="#fff6db" strokeWidth="3" />
        <path d="m82 27 8-12 12 11z" fill="#711f30" stroke="#b68a46" />
        <path d="M13 36C3 36 4 56 7 60" stroke="#977b54" />
      </g>
      <path
        className="walking-leg"
        d="M29 70v30h14V72"
        fill="#d4c5a4"
        stroke="#977b54"
      />
      <path
        className="walking-leg alternate"
        d="M61 72v28h14V70"
        fill="#d4c5a4"
        stroke="#977b54"
      />
    </g>
  );
}

function Person({
  x,
  musician = false,
  delay = 0,
}: {
  x: number;
  musician?: boolean;
  delay?: number;
}) {
  return (
    <g transform={`translate(${x} 51)`} style={{ animationDelay: `${delay}s` }}>
      <g className="person-body">
        <circle cx="14" cy="14" r="8" fill="#bd8d67" />
        <path d="M6 9 9 0h14l4 9Z" fill="#9a3e3b" stroke="#c59a52" />
        <path
          d="M7 25h15l9 40H0Z"
          fill={musician ? "#788874" : "#9a3e3b"}
          stroke="#c59a52"
        />
        <path d="M13 25v37M2 60h26" stroke="#ebd8a6" />
        {musician ? (
          <>
            <path
              className="musician-arm"
              d="m6 31-10 13 23 2"
              stroke="#bd8d67"
              strokeWidth="5"
            />
            <ellipse
              cx="27"
              cy="43"
              rx="16"
              ry="10"
              fill="#bd854c"
              stroke="#744a33"
            />
            <path d="M14 39 39 48m-25 0 25-11" stroke="#eed7aa" />
          </>
        ) : (
          <path d="M8 31 0 14h30" stroke="#bd8d67" strokeWidth="5" />
        )}
      </g>
      <path
        className="walking-leg"
        d="m7 64-4 28"
        stroke="#bfae87"
        strokeWidth="7"
      />
      <path
        className="walking-leg alternate"
        d="m21 64 5 28"
        stroke="#bfae87"
        strokeWidth="7"
      />
      <path d="M-1 94h10m13 0h10" stroke="#6f4a35" strokeWidth="4" />
    </g>
  );
}

export function Procession({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`procession-art ${className}`}
      viewBox="0 0 740 180"
      fill="none"
      aria-hidden="true"
    >
      <path d="M15 151h710" stroke="#b68a46" strokeOpacity=".35" />
      <g transform="translate(15 45) scale(.9)">
        <Elephant />
      </g>
      <Person x={145} musician />
      <Person x={215} musician delay={0.2} />
      <Person x={290} delay={0.3} />
      <g className="palanquin">
        <path d="M288 63h237" stroke="#8c603b" strokeWidth="5" />
        <path
          d="M334 53h134v65H334Z"
          fill="#e8d5ac"
          stroke="#a67a40"
          strokeWidth="2"
        />
        <path
          d="M331 52c9-27 129-27 140 0Z"
          fill="#772538"
          stroke="#c59a52"
          strokeWidth="2"
        />
        <path d="M346 60h110v46H346Z" fill="#bd6c65" />
        <path
          d="M346 60c7 31 22 27 22 0m88 0c-7 31-22 27-22 0"
          fill="#791f31"
          stroke="#c59a52"
        />
        <path d="m401 23 6 13h-12Z" fill="#b68a46" />
        <circle cx="401" cy="83" r="10" fill="#b88b63" />
        <path d="M386 104c0-33 30-33 30 0" fill="#8f2936" stroke="#e8bd69" />
        <path d="M330 120h142" stroke="#b68a46" strokeWidth="4" />
        {[340, 360, 380, 400, 420, 440, 460].map((x) => (
          <path key={x} d={`M${x} 119v8`} stroke="#b68a46" strokeWidth="2" />
        ))}
      </g>
      <Person x={485} delay={0.3} />
      <Person x={550} musician delay={0.1} />
      <g transform="translate(620 45) scale(.9)">
        <Elephant flipped />
      </g>
    </svg>
  );
}

export function TempleArt() {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className="temple-art"
      viewBox="0 0 600 650"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-gold`}
          x1="90"
          y1="0"
          x2="510"
          y2="650"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e5cc8f" />
          <stop offset=".4" stopColor="#cda65c" />
          <stop offset=".65" stopColor="#a87835" />
          <stop offset="1" stopColor="#e4ce9f" />
        </linearGradient>
        <pattern
          id={`${id}-lattice`}
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <path d="m0 9 9-9 9 9-9 9Z" stroke="#805c31" strokeWidth=".7" />
        </pattern>
        <g id={`${id}-niche`}>
          <path d="M-13 17v-26q13-22 26 0v26z" fill="#9e743e" />
          <path d="M-10 17V-8q10-18 20 0v25" stroke="#f2dca5" />
          <circle cy="-4" r="3" fill="#ecd59f" />
          <path d="M-5 13-3 1h6l5 12Z" fill="#e5c98b" />
          <path d="M-16 20h32M-15 23h30" stroke="#805c31" />
        </g>
        <g id={`${id}-column`}>
          <path
            d="M-12 0h24v170h-24z"
            fill={`url(#${id}-gold)`}
            stroke="#8e6835"
          />
          <path d="M-7 4v159M0 4v159M7 4v159" stroke="#f0dab1" />
          <path
            d="M-17 0h34v9h-34zm0 160h34v12h-34z"
            fill="#bd944f"
            stroke="#805c31"
          />
          <path d="M-10 65q10-15 20 0v28q-10 15-20 0z" stroke="#805c31" />
          <path d="m0 69 5 10-5 11-5-11z" fill="#805c31" />
        </g>
      </defs>
      <g fill={`url(#${id}-gold)`} stroke="#896336" strokeWidth="1.3">
        <path d="M227 111h146l-20-35H247Z" />
        <path d="M203 174h194l-15-45H218Z" />
        <path d="M176 250h248l-18-56H194Z" />
        <path d="M143 332h314l-19-61H162Z" />
        <path d="M108 422h384l-22-68H130Z" />
        <path d="M214 111h172v19H214zM189 174h222v20H189zM159 250h282v21H159zM123 332h354v23H123zM87 422h426v24H87z" />
        <path d="M109 446h382v142H109zM94 588h412v15H94zM78 603h444v12H78zM60 615h480v13H60zM44 628h512v12H44z" />
        <path d="M204 588V421q0-33 96-33t96 33v167Z" fill="#5d3928" />
        <path
          d="M210 585V424q0-29 90-29t90 29v161"
          stroke="#eed6a3"
          strokeWidth="5"
        />
        <path
          d="M229 585V435q0-25 71-25t71 25v150"
          stroke="#bd924e"
          strokeWidth="4"
        />
        <path d="M244 75q0-40 56-45 56 5 56 45Z" />
        <path
          d="M250 74h100M251 63h98M267 44v31M283 35v40M300 31v44M317 35v40M333 45v30"
          stroke="#f2d9a2"
        />
        <path
          d="M294 29c-8-7-5-14 6-16 11 2 14 9 6 16ZM296 13l4-10 4 10M292 29h16"
          fill="#e8cd8c"
          strokeWidth="1.5"
        />
        {[254, 277, 300, 323, 346].map((x) => (
          <path key={x} d={`M${x} 73v-9m-4 0 4-9 4 9Z`} fill="#e8cd8c" />
        ))}
      </g>
      <g>
        {[
          [246, 159],
          [282, 159],
          [318, 159],
          [354, 159],
          [220, 232],
          [260, 232],
          [300, 232],
          [340, 232],
          [380, 232],
          [188, 314],
          [232, 314],
          [277, 314],
          [323, 314],
          [368, 314],
          [412, 314],
          [152, 401],
          [200, 401],
          [250, 381],
          [300, 373],
          [350, 381],
          [400, 401],
          [448, 401],
        ].map(([x, y], i) => (
          <use
            key={i}
            href={`#${id}-niche`}
            transform={`translate(${x} ${y})`}
          />
        ))}
      </g>
      <g stroke="#e6cd94" strokeWidth="2">
        {[117, 182, 264, 344, 434].map((y, i) => (
          <path key={y} d={`M${218 - i * 31} ${y}h${164 + i * 62}`} />
        ))}
      </g>
      <path
        d="M230 131h140v32H230z"
        fill={`url(#${id}-lattice)`}
        opacity=".5"
      />
      <use href={`#${id}-column`} transform="translate(140 438) scale(1 .87)" />
      <use href={`#${id}-column`} transform="translate(184 438) scale(1 .87)" />
      <use href={`#${id}-column`} transform="translate(416 438) scale(1 .87)" />
      <use href={`#${id}-column`} transform="translate(460 438) scale(1 .87)" />
      <path
        d="M237 590h126l15 12H222zM222 604h156l15 12H207zM207 618h186l15 11H192zM192 632h216"
        fill="#d8b678"
        stroke="#896336"
      />
      <g stroke="#bd8748" strokeWidth="1.5" fill="none">
        <path d="M121 419C87 375 101 345 129 354M479 419c34-44 20-74-8-65M156 331c-30-34-17-56 7-56m281 56c30-34 17-56-7-56M190 249c-25-28-15-49 7-48m213 48c25-28 15-49-7-48" />
      </g>
    </svg>
  );
}

export function Icon({
  name,
}: {
  name:
    "arrow" | "sound" | "muted" | "location" | "calendar" | "close" | "replay";
}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "arrow" && <path d="M5 12h14m-5-5 5 5-5 5" />}
      {(name === "sound" || name === "muted") && (
        <>
          <path d="m11 5-5 4H3v6h3l5 4Z" />
          {name === "sound" ? (
            <path d="M15 8c3 2 3 6 0 8m3-11c5 4 5 10 0 14" />
          ) : (
            <path d="m16 9 6 6m0-6-6 6" />
          )}
        </>
      )}
      {name === "location" && (
        <>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </>
      )}
      {name === "calendar" && (
        <>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4m10-4v4M3 11h18m-14 4h3m4 0h3" />
        </>
      )}
      {name === "close" && <path d="m6 6 12 12M18 6 6 18" />}
      {name === "replay" && (
        <>
          <path d="M4 10a8 8 0 1 1 0 6M4 4v6h6" />
        </>
      )}
    </svg>
  );
}
