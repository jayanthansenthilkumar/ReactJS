import React from 'react';
import { 
  FaUsers, 
  FaUserGraduate,
  FaUserTie, 
  FaChartLine,
  FaEllipsisH
} from 'react-icons/fa';

import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import Card from '../components/dashboard/Card';

const Dashboard = () => {
  // Sample data for charts
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4000 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5000 },
  ];
  
  const trafficData = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 },
  ];

  // Recent students for the table
  const recentStudents = [
    { id: '#STU-001', name: 'John Smith', grade: '10th', attendance: '94%', performance: 'Excellent' },
    { id: '#STU-002', name: 'Jane Smith', grade: '9th', attendance: '88%', performance: 'Good' },
    { id: '#STU-003', name: 'Robert Brown', grade: '11th', attendance: '79%', performance: 'Average' },
    { id: '#STU-004', name: 'Emma Wilson', grade: '10th', attendance: '95%', performance: 'Excellent' },
    { id: '#STU-005', name: 'Michael Davis', grade: '12th', attendance: '72%', performance: 'Poor' },
  ];

  // Top staff members
  const topStaff = [
    { name: 'Sarah Johnson', position: 'Science Teacher', attendance: '98%', rating: '4.9/5' },
    { name: 'Michael Carter', position: 'Mathematics Teacher', attendance: '96%', rating: '4.7/5' },
    { name: 'Emily Davis', position: 'English Teacher', attendance: '95%', rating: '4.8/5' },
    { name: 'James Rodriguez', position: 'Physical Education', attendance: '97%', rating: '4.6/5' },
  ];

  return (
    <div className="dashboard-page">
      <h1>Dashboard Overview</h1>
      
      <div className="stats-grid">
        <StatCard 
          title="Total Students" 
          value="2,493" 
          icon={<FaUserGraduate />} 
          color="var(--primary-color)" 
          increase="+12% from last month"
        />
        <StatCard 
          title="Total Staff" 
          value="128" 
          icon={<FaUserTie />} 
          color="var(--secondary-color)" 
          increase="+5% from last month"
        />
        <StatCard 
          title="Average Attendance" 
          value="87%" 
          icon={<FaUsers />} 
          color="var(--warning-color)" 
          increase="+3% from last month"
        />
        <StatCard 
          title="Performance Rate" 
          value="+14%" 
          icon={<FaChartLine />} 
          color="var(--info-color)" 
          increase="+2% from last month"
        />
      </div>
      
      <div className="charts-grid">
        <ChartCard 
          title="Monthly Attendance" 
          data={revenueData} 
          dataKey="value" 
          stroke="var(--primary-color)" 
          fill="rgba(99, 102, 241, 0.2)" 
        />
        <ChartCard 
          title="Weekly Performance" 
          data={trafficData} 
          dataKey="value" 
          stroke="var(--secondary-color)" 
          fill="rgba(16, 185, 129, 0.2)" 
        />
      </div>
      
      <div className="tables-grid">
        <Card title={
          <div className="card-title-with-actions">
            <span>Recent Students</span>
            <button className="card-actions-btn" title="More options">
              <FaEllipsisH />
            </button>
          </div>
        }>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Attendance</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.grade}</td>
                    <td>{student.attendance}</td>
                    <td>
                      <span className={`performance-badge ${student.performance.toLowerCase()}`}>
                        {student.performance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        <Card title={
          <div className="card-title-with-actions">
            <span>Top Staff Members</span>
            <button className="card-actions-btn" title="More options">
              <FaEllipsisH />
            </button>
          </div>
        }>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Attendance</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {topStaff.map((staff, index) => (
                  <tr key={index}>
                    <td>{staff.name}</td>
                    <td>{staff.position}</td>
                    <td>{staff.attendance}</td>
                    <td>{staff.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;