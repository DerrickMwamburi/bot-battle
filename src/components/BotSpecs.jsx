const BotSpecs = ({ bot, back, enlist }) => {
    return (
      <div className="bot-specs">
        <div className="bot-details">
          <img src={bot.avatar_url} alt={bot.name} />
          <h2>{bot.name}</h2>
          <p><strong>Catchphrase:</strong> {bot.catchphrase}</p>
          <div className="bot-stats">
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
          </div>
          <p>Class: {bot.bot_class}</p>
        </div>
        <div className="bot-actions">
          <button onClick={back}>Back</button>
          <button onClick={enlist}>Enlist</button>
        </div>
      </div>
    );
};

export default BotSpecs;