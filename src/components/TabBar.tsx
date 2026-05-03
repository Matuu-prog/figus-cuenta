interface TabBarProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

const tabs = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '📔', label: 'Album' },
  { icon: '🔄', label: 'Repetidas' },
];

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface-elevated border-t border-surface-hover">
      <div className="flex justify-around py-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(index)}
            className={`flex flex-col items-center px-4 py-1 rounded-lg transition-all ${
              activeTab === index ? 'text-accent' : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
