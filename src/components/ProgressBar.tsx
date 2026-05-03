interface ProgressBarProps {
  value: number;
  max: number;
  showPercentage?: boolean;
  showText?: string;
}

export const ProgressBar = ({ value, max, showPercentage = true, showText }: ProgressBarProps) => {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="w-full">
      <div className="h-3 bg-surface-elevated rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        {showText && <span>{showText}</span>}
        {showPercentage && <span>{percentage}%</span>}
      </div>
    </div>
  );
};