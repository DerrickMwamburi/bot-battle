function YourBotArmy({ army, releaseBot, dischargeBot }) {
    return (
      <div className="your-bot-army">
        <h2>Your Bot Army</h2>
        {army.length === 0 ? (
          <p>No bots enlisted yet. Click on a bot to add it to your army!</p>
        ) : (
          <div className="army-list">
            {army.map(bot => (
              <div key={bot.id} className="army-bot">
                <img src={bot.avatar_url} alt={bot.name} />
                <h3>{bot.name}</h3>
                <div className="army-bot-actions">
                  <button onClick={() => releaseBot(bot.id)}>Release</button>
                  <button onClick={() => dischargeBot(bot.id)}>Discharge</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default YourBotArmy;