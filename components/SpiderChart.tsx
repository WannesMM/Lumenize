import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Svg, Polygon, Line, Circle, Text as SvgText } from 'react-native-svg';
import { Quality, QualityAssessment } from '@/types';
import { getQualityById } from '@/data/qualities';
import { Colors } from '@/constants/Colors';

interface SpiderChartProps {
  qualities: QualityAssessment[];
  size?: number;
  maxRating?: number;
  levels?: number;
}

export const SpiderChart: React.FC<SpiderChartProps> = ({
  qualities,
  size = Math.min(Dimensions.get('window').width - 32, 300),
  maxRating = 5,
  levels = 5,
}) => {
  if (!qualities || qualities.length === 0) return null;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size / 2) * 0.8; // Use 80% of the half-size
  const angleStep = (Math.PI * 2) / qualities.length;
  
  // Generate the points for each quality
  const generatePoints = (multiplier: number) => {
    return qualities.map((q, i) => {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const value = (q.rating / maxRating) * multiplier;
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      return { x, y, angle };
    });
  };
  
  // Points for the actual chart
  const chartPoints = generatePoints(1);
  const chartPointsString = chartPoints
    .map(point => `${point.x},${point.y}`)
    .join(' ');

  // Generate level rings
  const levelRings = Array.from({ length: levels }, (_, i) => {
    const level = (i + 1) / levels;
    const levelPoints = generatePoints(level);
    return levelPoints.map(point => `${point.x},${point.y}`).join(' ');
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        {/* Level rings */}
        {levelRings.map((points, i) => (
          <Polygon
            key={`level-${i}`}
            points={points}
            fill="none"
            stroke={Colors.gray[200]}
            strokeWidth={1}
          />
        ))}
        
        {/* Axis lines */}
        {chartPoints.map((point, i) => (
          <Line
            key={`axis-${i}`}
            x1={centerX}
            y1={centerY}
            x2={centerX + radius * Math.cos(point.angle)}
            y2={centerY + radius * Math.sin(point.angle)}
            stroke={Colors.gray[300]}
            strokeWidth={1}
          />
        ))}
        
        {/* Data polygon */}
        <Polygon
          points={chartPointsString}
          stroke={Colors.primary}
          fill={Colors.secondary}
          fillOpacity={0.6}
          // fill={Colors.primary + '40'} // Add 40 for 25% opacity
          // stroke={Colors.primary}
          strokeWidth={2}
        />
        
        {/* Data points */}
        {chartPoints.map((point, i) => {
          const quality = getQualityById(qualities[i].qualityId);
          return (
            <Circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r={4}
              fill={quality?.color || Colors.primary}
              stroke="#FFFFFF"
              strokeWidth={1}
            />
          );
        })}
        
        {/* Labels */}
        {chartPoints.map((point, i) => {
          const quality = getQualityById(qualities[i].qualityId);
          const labelAngle = point.angle;
          
          // Position labels further out than the chart edge
          const labelDistance = radius * 1.1;
          const labelX = centerX + labelDistance * Math.cos(labelAngle);
          const labelY = centerY + labelDistance * Math.sin(labelAngle);
          
          // Determine text anchor based on angle
          let textAnchor: 'middle' | 'start' | 'end' = 'middle';
          if (labelAngle > -Math.PI / 4 && labelAngle < Math.PI / 4) {
            textAnchor = 'start';
          } else if (labelAngle > Math.PI * 3 / 4 || labelAngle < -Math.PI * 3 / 4) {
            textAnchor = 'end';
          }
          
          return (
            <SvgText
              key={`label-${i}`}
              x={labelX}
              y={labelY}
              fontSize="11"
              fontWeight="bold"
              fill={quality?.color || Colors.textPrimary}
              textAnchor={textAnchor}
              alignmentBaseline="middle"
            >
              {quality?.name || 'Unknown'}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});