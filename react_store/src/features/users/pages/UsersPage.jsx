import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { 
  FaSearch, FaUserShield, FaUserEdit, FaTrashAlt, 
  FaUsers, FaFilter, FaEnvelope 
} from "react-icons/fa";

function UsersPage() {
  const [filters, setFilters] = useState({
    search: "",
    role: "",
  });

  const { users, loading, handleDelete, handleRoleChange } = useUsers(filters);

  return (
    <div className="p-4 md:p-8 bg-[#f9fafb] min-h-screen space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <FaUsers size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Users Management</h1>
            <p className="text-gray-500 text-sm font-medium">Manage permissions and user accounts</p>
          </div>
        </div>
      </div>

      {/* --- FILTERS BAR --- */}
      <div className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-medium"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="relative w-full md:w-64">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-3" />
          <select
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none cursor-pointer text-sm font-bold text-gray-600 appearance-none focus:ring-4 focus:ring-indigo-500/5"
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin Only</option>
            <option value="user">Regular Users</option>
          </select>
        </div>
      </div>

      {/* --- USERS TABLE --- */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-400 font-bold text-xs uppercase tracking-widest">Syncing Users...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">User Details</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Email</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest text-center">Role Status</th>
                  <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                    {/* User Profile */}
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-black text-xs border-2 border-white shadow-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 leading-none">{user.name}</p>
                          <p className="text-[10px] text-gray-400 mt-1 font-bold">UID: #{user.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-5">
                      <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
                        <FaEnvelope className="text-gray-300" size={12} />
                        {user.email}
                      </div>
                    </td>

                    {/* Role Change */}
                    <td className="p-5 text-center">
                      <div className="flex justify-center items-center">
                        <div className={`relative flex items-center gap-2 px-3 py-1 rounded-xl border ${user.role === 'admin' ? 'bg-purple-50 border-purple-100 text-purple-700' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
                          <FaUserShield size={12} className="opacity-60" />
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="bg-transparent text-[11px] font-black uppercase tracking-widest outline-none cursor-pointer appearance-none pr-1"
                          >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                          </select>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-sm shadow-red-100"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-20 text-center">
                       <p className="text-gray-400 font-bold italic">No users found matching your criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsersPage;