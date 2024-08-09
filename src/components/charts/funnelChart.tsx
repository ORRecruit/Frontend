import React from "react";

const funnelStages = [
  {
    name: "Job Posting",
    color: "#1abc9c",
    stage: 0,
  },
  { name: "Candidate Sourcing", color: "#2ecc71", stage: 1 },
  { name: "Screening and Shortlisting", color: "#f39c12", stage: 2 },
  {
    name: "Client Interview",
    color: "#e74c3c",
    stage: 3,
  },
  { name: "Closed", color: "#34495e", stage: 4 },
];

const CenteredHiringFunnel = () => {
  const svgWidth = 800;
  const svgHeight = 450;
  const funnelWidth = 500;
  const funnelHeight = 450;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
        {funnelStages.map((stage, index) => {
          const stageHeight = funnelHeight / funnelStages.length;
          const topWidth =
            funnelWidth - index * (funnelWidth / funnelStages.length);
          const bottomWidth =
            funnelWidth - (index + 1) * (funnelWidth / funnelStages.length);
          const y = centerY - funnelHeight / 2 + index * stageHeight;

          return (
            <g key={stage.name}>
              <polygon
                points={`
                  ${centerX - topWidth / 2},${y} 
                  ${centerX + topWidth / 2},${y} 
                  ${centerX + bottomWidth / 2},${y + stageHeight} 
                  ${centerX - bottomWidth / 2},${y + stageHeight}
                `}
                fill={stage.color}
              />
              <text
                x={centerX}
                y={y + stageHeight / 2}
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontSize="14"
              >
                {stage.name}
              </text>
              <text
                x={centerX + funnelWidth / 2 + 10}
                y={y + stageHeight / 2}
                dominantBaseline="middle"
                textAnchor="start"
                fill="black"
                fontSize="18"
              >
                Jobs Count: {stage.stage}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CenteredHiringFunnel;
