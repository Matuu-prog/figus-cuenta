import { useState } from 'react';
import { TabBar } from './components/TabBar';
import { Dashboard } from './screens/Dashboard';
import { Album } from './screens/Album';
import { Repetidas } from './screens/Repetidas';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-bg-primary">
      {activeTab === 0 && <Dashboard />}
      {activeTab === 1 && <Album />}
      {activeTab === 2 && <Repetidas />}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
