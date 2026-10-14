import React from 'react'

  const OneTimeAchievement = ({ achievement }) => (
    <div className={`bg-[#2a2a2a] rounded-xl p-5 border ${
      achievement.isDone ? "border-green-400/50 bg-green-900/10" : "border-white/5"
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white font-semibold text-lg">{achievement.name}</p>
          <p className="text-white/60 text-sm mt-1.5">{achievement.description}</p>
        </div>
        <div className={`text-4xl ${achievement.isDone ? "text-green-400" : "text-white/30"}`}>
          {achievement.isDone ? "✓" : "○"}
        </div>
      </div>
      <div className="mt-3 text-xs text-white/40">{achievement.points} points</div>
    </div>
  );

export default OneTimeAchievement