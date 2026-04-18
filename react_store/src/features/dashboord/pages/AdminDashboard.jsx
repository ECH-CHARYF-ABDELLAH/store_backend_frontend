import { useDashboard } from "../hooks/useDashboard";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  Users, Package, Layers, DollarSign, 
  TrendingUp, ArrowUpRight, Activity 
} from 'lucide-react';

function AdminDashboard() {
  const { data, loading, error } = useDashboard();

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );
  
  if (error) return <div className="p-8 text-red-500 font-bold bg-red-50 m-6 rounded-2xl border border-red-100 italic">{error}</div>;

  // Stats definition for easy mapping
  const stats = [
    { title: "Total Users", value: data.users, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Products", value: data.products, icon: Package, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Categories", value: data.categories, icon: Layers, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Total Sales", value: `$${data.total_sales}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="p-4 md:p-8 bg-[#f8f9fa] min-h-screen space-y-8">
      
      {/* --- WELCOME HEADER --- */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 font-medium">Welcome back, here's what's happening today.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <Activity size={16} className="text-indigo-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Live Updates</span>
        </div>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-colors group-hover:bg-indigo-600 group-hover:text-white`}>
                <stat.icon size={24} />
              </div>
              <span className="text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg text-[10px] font-black flex items-center gap-1">
                <ArrowUpRight size={12} /> +12%
              </span>
            </div>
            <h2 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{stat.title}</h2>
            <p className="text-2xl font-black text-gray-900 leading-none">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* --- SALES DIAGRAM (LINE CHART) --- */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <div>
              <h2 className="font-black text-xl text-gray-900 tracking-tight">Sales Analytics</h2>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Revenue performance by day</p>
            </div>
          </div>
          
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-xs font-black text-indigo-600 tracking-tight">Last 7 Days</button>
            <button className="px-4 py-1.5 text-xs font-black text-gray-400 tracking-tight hover:text-gray-600">Monthly</button>
          </div>
        </div>

        {/* L-Diagramme b-Recharts */}
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.sales_by_day}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                dy={15}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                cursor={{ stroke: '#4f46e5', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#4f46e5" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorSales)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- INFO CARD --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
        <div className="bg-indigo-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-2">Growth Report</h3>
            <p className="text-indigo-100 text-sm mb-6 opacity-80 leading-relaxed">Your sales increased by 25% compared to last week. Keep it up!</p>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-900/20 active:scale-95 transition-all">
              Download Full Report
            </button>
          </div>
          <Activity className="absolute -right-10 -bottom-10 text-white/10 size-64 group-hover:scale-110 transition-transform duration-700" />
        </div>
        
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-center">
          <h3 className="text-gray-900 font-black text-lg mb-2 tracking-tight">System Status</h3>
          <div className="flex items-center gap-3 text-emerald-500 font-black text-sm uppercase tracking-widest">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
            All Systems Operational
          </div>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;