import React from 'react'

  const TieredAchievement = ({ achievement }) => {
    const tiers = achievement.tiers || [1, 2, 3, 4, 5];
    const amounts = achievement.amounts || [];
    const playerProgress = Number(achievement.done) || 0;

    let currentTier = 0;
    for (let i = 0; i < amounts.length; i++) {
      if (playerProgress >= amounts[i]) {
        currentTier = tiers[i];
      } else {
        break;
      }
    }

    const isMaxTier = currentTier === 5;
    const nextTierIndex = currentTier < 5 ? tiers.indexOf(currentTier) + 1 : 4;
    const nextTierAmount = amounts[nextTierIndex] || amounts[amounts.length - 1] || 0;

    const progressPercent = nextTierAmount > 0 
      ? Math.min(100, Math.floor((playerProgress / nextTierAmount) * 100)) 
      : 100;

    return (
      <div className="bg-[#2a2a2a] rounded-xl p-5 border border-white/5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <p className="text-white font-semibold text-lg">{achievement.name}</p>
            <p className="text-white/60 text-sm mt-1">
              {achievement.description.replace("%%value%%", nextTierAmount.toLocaleString())}
            </p>
          </div>
          <div className="text-right">
            <div className={`font-bold text-2xl ${isMaxTier ? "text-green-400" : "text-yellow-400"}`}>
              Tier {currentTier || 1}
            </div>
            {isMaxTier && <div className="text-green-400 text-sm mt-1">✓ Max Tier</div>}
          </div>
        </div>

        <div className="relative">
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-3 rounded-full transition-all duration-700 ${isMaxTier ? "bg-green-400" : "bg-gradient-to-r from-yellow-400 to-amber-500"}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/50 mt-1.5">
            <span>{playerProgress.toLocaleString()}</span>
            <span>{nextTierAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };

export default TieredAchievement