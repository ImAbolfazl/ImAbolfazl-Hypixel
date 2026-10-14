import React from 'react'

  const QuestObjective = ({ objective, isCompleted }) => {
    const completed = isCompleted ? objective.amount : Math.min(objective.completed ?? 0, objective.amount);
    const percent = objective.amount > 0 ? (completed / objective.amount) * 100 : 0;

    return (
      <div className="mt-3">
        <div className="flex justify-between text-sm text-white/60 mb-1">
          <span>{objective.description}</span>
          <span>{completed}/{objective.amount}</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full ${percent >= 100 ? "bg-green-400" : "bg-purple-400"}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    );
  };

export default QuestObjective