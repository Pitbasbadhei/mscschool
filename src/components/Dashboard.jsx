import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced dashboard data with more realistic metrics
const dashboardData = {
  metrics: [
    { title: 'Total Students', value: 1250, icon: '👨‍🎓', change: '+5.2%', trend: 'up' },
    { title: 'Staff Attendance', value: '92%', icon: '👩‍🏫', change: '-1.3%', trend: 'down' },
    { title: 'Fee Collection', value: 45230, icon: '💰', change: '+8.7%', isCurrency: true, trend: 'up' },
    { title: 'Library Books', value: 3420, icon: '📚', change: '+2.1%', trend: 'up' },
  ],
  recentActivities: [
    { id: 1, type: 'Student Entry', description: 'Added John Doe to Class 10A', date: '2025-08-30', priority: 'normal' },
    { id: 2, type: 'Examination', description: 'Scheduled Midterm Exams', date: '2025-08-29', priority: 'high' },
    { id: 3, type: 'Fee Collection', description: 'Received ₹500 from Jane Smith', date: '2025-08-28', priority: 'normal' },
    { id: 4, type: 'Library', description: 'Issued "Physics 101" to Alex Brown', date: '2025-08-27', priority: 'low' },
  ],
  upcomingEvents: [
    { id: 1, title: 'Parent-Teacher Meeting', date: '2025-09-05', time: '10:00 AM', type: 'meeting' },
    { id: 2, title: 'Science Fair', date: '2025-09-10', time: '9:00 AM', type: 'academic' },
    { id: 3, title: 'Sports Day', date: '2025-09-15', time: '8:00 AM', type: 'sports' },
  ],
  studentDistribution: {
    labels: ['Class 1-5', 'Class 6-8', 'Class 9-12'],
    data: [450, 400, 400],
    colors: ['#22d3ee', '#2563eb', '#1e40af'],
  },
  staffAttendance: {
    labels: ['Present', 'Absent', 'On Leave'],
    data: [92, 5, 3],
    colors: ['#22c55e', '#ef4444', '#f59e0b'],
  },
};

// Indian Rupee formatter
const formatRupees = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(value);

// Enhanced Pie Chart Component
const PieChart = ({ data, title, colors }) => {
  const total = data.reduce((sum, val) => sum + val, 0);
  let currentAngle = 0;

  const createPath = (value, index) => {
    const angle = (value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (currentAngle * Math.PI) / 180;
    
    const x1 = 50 + 40 * Math.cos(startAngleRad);
    const y1 = 50 + 40 * Math.sin(startAngleRad);
    const x2 = 50 + 40 * Math.cos(endAngleRad);
    const y2 = 50 + 40 * Math.sin(endAngleRad);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">{title}</h3>
      <div className="flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90">
          {data.map((value, index) => (
            <motion.path
              key={index}
              d={createPath(value, index)}
              fill={colors[index]}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
            />
          ))}
        </svg>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2">
        {dashboardData.studentDistribution.labels.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm text-gray-600">{label}: {data[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMetric, setSelectedMetric] = useState(null);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'normal': return 'text-blue-600 bg-blue-50';
      case 'low': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return '🤝';
      case 'academic': return '🔬';
      case 'sports': return '⚽';
      default: return '📅';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Loading Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          
          {/* Loading Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          
          {/* Loading Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-6"></div>
                <div className="h-48 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg p-6 mb-8 border-l-4 border-blue-500"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                School Dashboard
              </h1>
              <p className="text-gray-600">{formatTime(currentTime)}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900">Admin</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Metrics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
        >
          {dashboardData.metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
              }}
              onClick={() => setSelectedMetric(selectedMetric === index ? null : index)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{metric.icon}</span>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {metric.change}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900">
                {metric.isCurrency ? formatRupees(metric.value) : metric.value.toLocaleString()}
              </p>
              
              <AnimatePresence>
                {selectedMetric === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-200"
                  >
                    <p className="text-sm text-gray-600">
                      Detailed analytics and trends for {metric.title.toLowerCase()}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div variants={cardVariants}>
            <PieChart 
              data={dashboardData.studentDistribution.data}
              title="Student Distribution by Class"
              colors={dashboardData.studentDistribution.colors}
            />
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <PieChart 
              data={dashboardData.staffAttendance.data}
              title="Staff Attendance Status"
              colors={dashboardData.staffAttendance.colors}
            />
          </motion.div>
        </div>

        {/* Enhanced Recent Activities */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {dashboardData.recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(activity.priority)}`}>
                    {activity.type}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.description}</p>
                    <p className="text-sm text-gray-600">{activity.date}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  View
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Upcoming Events */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardData.upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{getEventTypeIcon(event.type)}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                    {event.type}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📅 {event.date}</p>
                  <p>🕐 {event.time}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3 w-full px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  View Details
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;