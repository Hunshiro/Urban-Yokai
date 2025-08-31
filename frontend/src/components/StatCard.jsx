import React from "react";

const StatCard = ({ title, value, accent }) => (
  <div className={`bg-background rounded-2xl shadow-glass p-6 text-center border-2 ${accent} mb-4`}>
    <h4 className="font-heading text-lg text-heading mb-2">{title}</h4>
    <div className="font-bold text-2xl text-primary">{value}</div>
  </div>
);

export default StatCard;
