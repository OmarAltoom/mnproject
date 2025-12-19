"use client";
import { useState, useMemo } from "react";
import AdminLayout from "../AdminLayout";
import { useToast } from "@/app/components/ui/Toast";
import useLocale from "@/app/hooks/useLocale";
import { useMessages } from "next-intl";
import { 
  FaUsers, FaUserShield, FaUserMd, FaUserInjured, FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaDownload, FaTimes, FaSave, FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock 
} from "react-icons/fa";

export default function UsersPage() {
  const { showToast, ToastContainer } = useToast();
  const { locale } = useLocale();
  const messages = useMessages();
  // دالة ترجمة تبحث في messages الجذر مباشرة
  function t(key, fallback = '') {
    // إذا كان المفتاح يحتوي على نقطة، ابحث بشكل هرمي، وإلا ابحث مباشرة
    let value;
    if (key.includes('.')) {
      value = key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : undefined), messages);
    } else {
      value = messages[key];
    }
    if (value === undefined || value === null || value === '') {
      return fallback ? fallback : `ترجمة ناقصة: ${key}`;
    }
    return value;
  }
  
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const usersTemplate = useMemo(() => locale === "en" ? [
    {
      id: 1,
      name: "Ahmed Mohammed Ali",
      email: "ahmed.ali@example.com",
      phone: "0501234567",
      role: "admin",
      roleDisplay: "Admin",
      status: "active",
      statusDisplay: "Active",
      joinDate: "2023-01-15",
      lastLogin: "2025-12-04 10:30",
      permissions: ["View", "Edit", "Delete"],
      avatar: "👨‍💼"
    },
    {
      id: 2,
      name: "Dr. Sarah Ahmed",
      email: "sara.ahmed@example.com",
      phone: "0509876543",
      role: "doctor",
      roleDisplay: "Doctor",
      status: "active",
      statusDisplay: "Active",
      joinDate: "2023-03-20",
      lastLogin: "2025-12-04 09:15",
      specialty: "Radiologist",
      license: "MED-12345",
      avatar: "👩‍⚕️"
    },
    {
      id: 3,
      name: "Mohammed Khaled",
      email: "mohamed.k@example.com",
      phone: "0551234567",
      role: "patient",
      roleDisplay: "Patient",
      status: "active",
      statusDisplay: "Active",
      joinDate: "2024-05-10",
      lastLogin: "2025-12-03 18:45",
      patientId: "PAT-001",
      avatar: "👤"
    },
    {
      id: 4,
      name: "Fatima Hassan",
      email: "fatima.h@example.com",
      phone: "0567890123",
      role: "admin",
      roleDisplay: "Admin",
      status: "suspended",
      statusDisplay: "Suspended",
      joinDate: "2023-07-12",
      lastLogin: "2025-11-30 14:20",
      permissions: ["View", "Edit"],
      avatar: "👩‍💼"
    },
    {
      id: 5,
      name: "Dr. Mohammed Ali",
      email: "mohamed.ali@example.com",
      phone: "0523456789",
      role: "doctor",
      roleDisplay: "Doctor",
      status: "active",
      statusDisplay: "Active",
      joinDate: "2023-09-05",
      lastLogin: "2025-12-04 08:00",
      specialty: "Orthopedic Surgeon",
      license: "MED-67890",
      avatar: "👨‍⚕️"
    },
    {
      id: 6,
      name: "Layla Youssef",
      email: "layla.y@example.com",
      phone: "0534567890",
      role: "patient",
      roleDisplay: "Patient",
      status: "active",
      statusDisplay: "Active",
      joinDate: "2024-02-18",
      lastLogin: "2025-12-04 11:00",
      patientId: "PAT-002",
      avatar: "👤"
    },
    {
      id: 7,
      name: "Omar El-Sayed",
      email: "omar.s@example.com",
      phone: "0545678901",
      role: "admin",
      roleDisplay: "Admin",
      status: "active",
      statusDisplay: "Active",
      joinDate: "2023-11-22",
      lastLogin: "2025-12-04 07:30",
      permissions: ["View"],
      avatar: "👨‍💼"
    },
    {
      id: 8,
      name: "Dr. Fatima Ali",
      email: "fatima.ali@example.com",
      phone: "0556789012",
      role: "doctor",
      roleDisplay: "Doctor",
      status: "suspended",
      statusDisplay: "Suspended",
      joinDate: "2024-01-08",
      lastLogin: "2025-11-28 16:45",
      specialty: "General Practitioner",
      license: "MED-54321",
      avatar: "👩‍⚕️"
    }
  ] : [
    {
      id: 1,
      name: "أحمد محمد علي",
      email: "ahmed.ali@example.com",
      phone: "0501234567",
      role: "admin",
      roleDisplay: "مدير",
      status: "active",
      statusDisplay: "نشط",
      joinDate: "2023-01-15",
      lastLogin: "2025-12-04 10:30",
      permissions: ["عرض", "تعديل", "حذف"],
      avatar: "👨‍💼"
    },
    {
      id: 2,
      name: "د. سارة أحمد",
      email: "sara.ahmed@example.com",
      phone: "0509876543",
      role: "doctor",
      roleDisplay: "طبيب",
      status: "active",
      statusDisplay: "نشط",
      joinDate: "2023-03-20",
      lastLogin: "2025-12-04 09:15",
      specialty: "أخصائي أشعة",
      license: "MED-12345",
      avatar: "👩‍⚕️"
    },
    {
      id: 3,
      name: "محمد خالد",
      email: "mohamed.k@example.com",
      phone: "0551234567",
      role: "patient",
      roleDisplay: "مريض",
      status: "active",
      statusDisplay: "نشط",
      joinDate: "2024-05-10",
      lastLogin: "2025-12-03 18:45",
      patientId: "PAT-001",
      avatar: "👤"
    },
    {
      id: 4,
      name: "فاطمة حسن",
      email: "fatima.h@example.com",
      phone: "0567890123",
      role: "admin",
      roleDisplay: "مدير",
      status: "suspended",
      statusDisplay: "معلق",
      joinDate: "2023-07-12",
      lastLogin: "2025-11-30 14:20",
      permissions: ["عرض", "تعديل"],
      avatar: "👩‍💼"
    },
    {
      id: 5,
      name: "د. محمد علي",
      email: "mohamed.ali@example.com",
      phone: "0523456789",
      role: "doctor",
      roleDisplay: "طبيب",
      status: "active",
      statusDisplay: "نشط",
      joinDate: "2023-09-05",
      lastLogin: "2025-12-04 08:00",
      specialty: "جراح عظام",
      license: "MED-67890",
      avatar: "👨‍⚕️"
    },
    {
      id: 6,
      name: "ليلى يوسف",
      email: "layla.y@example.com",
      phone: "0534567890",
      role: "patient",
      roleDisplay: "مريض",
      status: "active",
      statusDisplay: "نشط",
      joinDate: "2024-02-18",
      lastLogin: "2025-12-04 11:00",
      patientId: "PAT-002",
      avatar: "👤"
    },
    {
      id: 7,
      name: "عمر السيد",
      email: "omar.s@example.com",
      phone: "0545678901",
      role: "admin",
      roleDisplay: "مدير",
      status: "active",
      statusDisplay: "نشط",
      joinDate: "2023-11-22",
      lastLogin: "2025-12-04 07:30",
      permissions: ["عرض"],
      avatar: "👨‍💼"
    },
    {
      id: 8,
      name: "د. فاطمة علي",
      email: "fatima.ali@example.com",
      phone: "0556789012",
      role: "doctor",
      roleDisplay: "طبيب",
      status: "suspended",
      statusDisplay: "معلق",
      joinDate: "2024-01-08",
      lastLogin: "2025-11-28 16:45",
      specialty: "طب عام",
      license: "MED-54321",
      avatar: "👩‍⚕️"
    }
  ], [locale]);

  const [users, setUsers] = useState(usersTemplate);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: locale === "en" ? "patient" : "مريض",
    status: locale === "en" ? "active" : "نشط"
  });

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = search === "" || 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search);
      
      const matchesRole = filterRole === "all" || user.role === filterRole;
      const matchesStatus = filterStatus === "all" || user.status === filterStatus;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, filterRole, filterStatus]);

  const stats = [
    {
      title: t('stats.totalUsers'),
      value: users.length,
      icon: FaUsers,
      color: "bg-blue-500",
      bgLight: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: t('stats.admins'),
      value: users.filter(u => u.role === "admin").length,
      icon: FaUserShield,
      color: "bg-purple-500",
      bgLight: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: t('stats.doctors'),
      value: users.filter(u => u.role === "doctor").length,
      icon: FaUserMd,
      color: "bg-green-500",
      bgLight: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: t('stats.patients'),
      value: users.filter(u => u.role === "patient").length,
      icon: FaUserInjured,
      color: "bg-orange-500",
      bgLight: "bg-orange-50 dark:bg-orange-900/20"
    }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "doctor":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800";
      case "patient":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800";
      case "suspended":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      case "banned":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800";
    }
  };

  // Handler functions
  const handleExport = () => {
    showToast("Export functionality would be implemented here", "info");
  };

  const handleAddUser = () => {
    // In a real app, this would add the user to a database
    const newUser = {
      id: users.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      roleDisplay: formData.role === "admin" ? (locale === "en" ? "Admin" : "مدير") : 
                  formData.role === "doctor" ? (locale === "en" ? "Doctor" : "طبيب") : 
                  (locale === "en" ? "Patient" : "مريض"),
      status: formData.status,
      statusDisplay: formData.status === "active" ? (locale === "en" ? "Active" : "نشط") : 
                    formData.status === "suspended" ? (locale === "en" ? "Suspended" : "معلق") : 
                    (locale === "en" ? "Banned" : "محظور"),
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16),
      avatar: formData.role === "admin" ? "👨‍💼" : formData.role === "doctor" ? "👨‍⚕️" : "👤"
    };
    
    setUsers([...users, newUser]);
    setShowAddModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: locale === "en" ? "patient" : "مريض",
      status: locale === "en" ? "active" : "نشط"
    });
    showToast("User added successfully", "success");
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status
    });
    setShowEditModal(true);
  };

  const handleEditUser = () => {
    // In a real app, this would update the user in a database
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id 
        ? {
            ...user,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            role: formData.role,
            roleDisplay: formData.role === "admin" ? (locale === "en" ? "Admin" : "مدير") : 
                        formData.role === "doctor" ? (locale === "en" ? "Doctor" : "طبيب") : 
                        (locale === "en" ? "Patient" : "مريض"),
            status: formData.status,
            statusDisplay: formData.status === "active" ? (locale === "en" ? "Active" : "نشط") : 
                          formData.status === "suspended" ? (locale === "en" ? "Suspended" : "معلق") : 
                          (locale === "en" ? "Banned" : "محظور"),
            avatar: formData.role === "admin" ? "👨‍💼" : formData.role === "doctor" ? "👨‍⚕️" : "👤"
          }
        : user
    );
    
    setUsers(updatedUsers);
    setShowEditModal(false);
    setSelectedUser(null);
    showToast("User updated successfully", "success");
  };

  const openDetailsModal = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = () => {
    // In a real app, this would delete the user from a database
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setShowDeleteModal(false);
    setSelectedUser(null);
    showToast("User deleted successfully", "success");
  };

  return (
    <>
      <AdminLayout breadcrumbs={locale === "en" ? [t('breadcrumbs.home', 'Home'), t('breadcrumbs.users', 'Users')] : [t('breadcrumbs.home', 'الرئيسية'), t('breadcrumbs.users', 'المستخدمين')] }>
        <ToastContainer />
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{t('subtitle')}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FaDownload />
                <span>{t('exportButton')}</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <FaPlus />
                <span>{t('addButton')}</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgLight}`}>
                    <stat.icon className={`text-2xl ${stat.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder', 'Search by name, email, or phone...')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('filters.allRoles')}</option>
                <option value="admin">{t('roles.admin')}</option>
                <option value="doctor">{t('roles.doctor')}</option>
                <option value="patient">{t('roles.patient')}</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('filters.allStatuses')}</option>
                <option value="active">{t('statuses.active')}</option>
                <option value="suspended">{t('statuses.suspended')}</option>
                <option value="banned">{t('statuses.banned')}</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{t('table.user')}</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{t('table.role')}</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{t('table.status')}</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{t('table.joinDate')}</th>
                    <th className="px-6 py-4 text-right text-sm font-bold text-gray-900 dark:text-white">{t('table.lastLogin')}</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 dark:text-white">{t('table.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{user.avatar}</div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs border ${getRoleColor(user.role)}`}>
                          {user.roleDisplay}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(user.status)}`}>
                          {user.statusDisplay}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.joinDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{user.lastLogin}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openDetailsModal(user)}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title={t('actions.viewDetails', 'View Details')}
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                            title={t('actions.edit', 'Edit')}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title={t('actions.delete', 'Delete')}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add User Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('modal.addTitle', 'Add New User')}</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                  >
                    <FaTimes className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.fullName', 'Full Name')}</label>
                    <input
                      type="text"
                      id="add-user-name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.email', 'Email')}</label>
                    <input
                      type="email"
                      id="add-user-email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.phone', 'Phone Number')}</label>
                    <input
                      type="tel"
                      id="add-user-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.role', 'Role')}</label>
                    <select
                      id="add-user-role"
                      name="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    >
                      <option value="patient">{t('roles.patient')}</option>
                      <option value="doctor">{t('roles.doctor')}</option>
                      <option value="admin">{t('roles.admin')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.status', 'Status')}</label>
                    <select
                      id="add-user-status"
                      name="status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    >
                      <option value="active">{t('statuses.active')}</option>
                      <option value="suspended">{t('statuses.suspended')}</option>
                      <option value="banned">{t('statuses.banned')}</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleAddUser}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <FaSave />
                    <span>{t('modal.save', 'Save')}</span>
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    {t('modal.cancel', 'Cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('modal.editTitle', 'Edit User')}</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                  >
                    <FaTimes className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.fullName', 'Full Name')}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.email', 'Email')}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.phone', 'Phone Number')}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.role', 'Role')}</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    >
                      <option value="patient">{t('roles.patient')}</option>
                      <option value="doctor">{t('roles.doctor')}</option>
                      <option value="admin">{t('roles.admin')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('form.status', 'Status')}</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                    >
                      <option value="active">{t('statuses.active')}</option>
                      <option value="suspended">{t('statuses.suspended')}</option>
                      <option value="banned">{t('statuses.banned')}</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleEditUser}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <FaSave />
                    <span>{t('modal.saveChanges', 'Save Changes')}</span>
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    {t('modal.cancel', 'Cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Details Modal */}
          {showDetailsModal && selectedUser && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('modal.detailsTitle', 'User Details')}</h3>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                  >
                    <FaTimes className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                  <div className="text-5xl">{selectedUser.avatar}</div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedUser.name}</h4>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.roleDisplay}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.statusDisplay}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <FaEnvelope />
                      <span className="text-sm">{t('details.email', 'Email')}</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedUser.email}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <FaPhone />
                      <span className="text-sm">{t('details.phone', 'Phone Number')}</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedUser.phone}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <FaCalendarAlt />
                      <span className="text-sm">{t('details.joinDate', 'Join Date')}</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedUser.joinDate}</p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <FaClock />
                      <span className="text-sm">{t('details.lastLogin', 'Last Login')}</span>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedUser.lastLogin}</p>
                  </div>
                </div>

                {selectedUser.role === "doctor" && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-bold text-blue-900 dark:text-blue-300 mb-2">{t('details.doctorInfo', 'Doctor Information')}</h5>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{t('details.specialty', 'Specialty')}: {selectedUser.specialty}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{t('details.license', 'License Number')}: {selectedUser.license}</p>
                  </div>
                )}

                {selectedUser.role === "patient" && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h5 className="font-bold text-green-900 dark:text-green-300 mb-2">{t('details.patientInfo', 'Patient Information')}</h5>
                    <p className="text-sm text-green-700 dark:text-green-300">{t('details.patientId', 'Patient ID')}: {selectedUser.patientId}</p>
                  </div>
                )}

                {selectedUser.permissions && (
                  <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <h5 className="font-bold text-purple-900 dark:text-purple-300 mb-2">{t('details.permissions', 'Permissions')}</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.permissions.map((perm, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteModal && selectedUser && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-6">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('modal.deleteTitle', 'Confirm Deletion')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('modal.deleteMessage', 'Are you sure you want to delete user')} <span className="font-bold">{selectedUser.name}</span>?
                    {" "}{t('modal.deleteWarning', 'This action cannot be undone.')}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteUser}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                  >
                    {t('modal.confirmDelete', 'Yes, Delete')}
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    {t('modal.cancel', 'Cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}