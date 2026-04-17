import React from 'react';
import './SkeletonLoader.scss';

export const SkeletonBlock = ({ width = '100%', height = '1rem', radius = '8px', style = {} }) => (
  <div 
    className="sk-block" 
    style={{ 
      '--sk-width': width, 
      '--sk-height': height, 
      '--sk-radius': radius, 
      ...style 
    }} 
  />
);

export const SkeletonStatCards = ({ count = 3 }) => (
  <div className="sk-stat-grid">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="sk-card">
        <SkeletonBlock width="40px" height="40px" radius="50%" />
        <div className="sk-card__info">
          <SkeletonBlock width="60%" height="0.75rem" />
          <SkeletonBlock width="40%" height="1.4rem" className="sk-block--mt-2" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="sk-table">
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="sk-table__row">
        {Array.from({ length: cols }).map((_, c) => (
          <SkeletonBlock key={c} width={c === 0 ? '30%' : '20%'} height="0.85rem" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonCardGrid = ({ count = 6 }) => (
  <div className="sk-card-grid">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="sk-card sk-card--big">
        <SkeletonBlock width="30%" height="0.75rem" radius="20px" />
        <SkeletonBlock width="80%" height="1.1rem" className="sk-block--mt-3" />
        <SkeletonBlock width="90%" height="0.8rem" className="sk-block--mt-2" />
        <SkeletonBlock width="70%" height="0.8rem" className="sk-block--mt-1" />
        <div className="sk-tags">
          <SkeletonBlock width="60px" height="22px" radius="20px" />
          <SkeletonBlock width="70px" height="22px" radius="20px" />
          <SkeletonBlock width="50px" height="22px" radius="20px" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonDashboardHeader = () => (
  <div className="sk-dash-head">
    <div className="sk-card sk-greeting">
      <SkeletonBlock width="60%" height="1.5rem" />
      <SkeletonBlock width="80%" height="0.85rem" className="sk-block--mt-3" />
      <SkeletonBlock width="40%" height="0.85rem" className="sk-block--mt-2" />
    </div>
    <SkeletonStatCards count={3} />
  </div>
);

export default SkeletonBlock;
