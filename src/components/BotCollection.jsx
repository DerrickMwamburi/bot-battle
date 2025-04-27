import { useState } from 'react';
import BotSpecs from './BotSpecs';

const BotCollection = ({ bots, enlistBot, dischargeBot }) => {
  const [selectedBot, setSelectedBot] = useState(null);

  const handleBack = () => {
    setSelectedBot(null);
  };

  if (selectedBot) {
    return (
      <BotSpecs 
        bot={selectedBot} 
        back={handleBack} 
        enlist={() => {
          enlistBot(selectedBot);
          handleBack();
        }} 
      />
    );
  }

  return (
    <div className="bot-collection">
      <h2>Available Bots</h2>
      <div className="bot-list">
        {bots.map(bot => (
          <div 
            key={bot.id} 
            className="bot-card" 
            onClick={() => setSelectedBot(bot)}
          >
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>{bot.name}</h3>
            <p>Class: {bot.bot_class}</p>
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                dischargeBot(bot.id);
              }}
              className="delete-btn"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BotCollection;