import React from 'react'
import QuestObjective from './QuestObjective';

  const QuestCard = ({ quest }) => (
    <div className={`bg-[#2a2a2a] rounded-xl p-5 border ${quest.isCompleted ? "border-green-400/40" : "border-white/5"}`}>
      <div className="flex justify-between items-center mb-4">
        <p className="text-white font-semibold text-lg">{quest.name}</p>
        {quest.isCompleted ? (
          <span className="text-green-400 font-bold">✓ Completed</span>
        ) : (
          <span className="text-white/40">In Progress</span>
        )}
      </div>
      {quest.description.map((obj, i) => (
        <QuestObjective key={i} objective={obj} isCompleted={quest.isCompleted} />
      ))}
    </div>
  );

export default QuestCard