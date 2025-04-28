import { useState, useEffect } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('https://bot-battle-f37w.onrender.com/bots');
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Bots data not found (404). Please check the API URL.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBots(data);
      } catch (err) {
        console.error('Error fetching bots:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, []);

  const enlistBot = (bot) => {
    if (!army.some(b => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  const releaseBot = (botId) => {
    setArmy(army.filter(bot => bot.id !== botId));
  };

  const dischargeBot = async (botId) => {
    try {
      // Optimistic update
      setBots(bots.filter(bot => bot.id !== botId));
      setArmy(army.filter(bot => bot.id !== botId));
      
      const response = await fetch(`https://bot-battle-f37w.onrender.com/bots/${botId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete bot');
      }
    } catch (err) {
      console.error('Error discharging bot:', err);
      // Revert if error occurs
      setBots(bots);
      setArmy(army);
    }
  };

  if (loading) return <div className="loading">Loading bots...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="app">
      <h1>Bot Army</h1>
      <YourBotArmy 
        army={army} 
        releaseBot={releaseBot} 
        dischargeBot={dischargeBot} 
      />
      <BotCollection 
        bots={bots} 
        enlistBot={enlistBot} 
        dischargeBot={dischargeBot} 
      />
    </div>
  );
}

export default App;