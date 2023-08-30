import React from 'react';
import './styles/LoadingStyles.css'; // Asegúrate de ajustar el nombre del archivo CSS

function Loading() {
  return (
    <div className="yv-loader__wrap">
      <svg className="svg" viewBox="0 0 601 401">
        <defs>
          <filter id="gooey" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>
        <g className="ellipses" fill="#20335e" filter="url(#gooey)">
          <ellipse className="ellipse" cx="220" cy="200" rx="16" ry="16" />
          <ellipse className="ellipse" cx="280" cy="200" rx="16" ry="16" />
          <ellipse className="ellipse" cx="340" cy="200" rx="16" ry="16" />
          <ellipse className="ellipse" cx="400" cy="200" rx="16" ry="16" />
        </g>
      </svg>
    </div>
  );
}

export default Loading;
