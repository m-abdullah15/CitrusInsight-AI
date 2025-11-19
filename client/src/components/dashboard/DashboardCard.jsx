const DashboardCard = ({ icon, title, value, gradient = 'from-emerald-500 to-teal-600' }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className={`bg-gradient-to-br ${gradient} p-6`}>
        <div className="flex items-center justify-between">
          <div className="text-white">
            <p className="text-sm font-medium opacity-90">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <div className="text-white text-4xl opacity-80">
            {icon}
          </div>
        </div>
      </div>
      <div className="h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
    </div>
  );
};

export default DashboardCard;
