import React, { useState } from 'react';
import { FaUserPlus, FaSearch, FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import Card from '../components/dashboard/Card';

const Students = () => {
  const [students] = useState([
    { id: 1, name: 'John Smith', grade: '10th', section: 'A', rollNo: '1001', attendance: '92%', performance: 'Excellent' },
    { id: 2, name: 'Emma Johnson', grade: '9th', section: 'B', rollNo: '902', attendance: '88%', performance: 'Good' },
    { id: 3, name: 'Michael Brown', grade: '11th', section: 'A', rollNo: '1105', attendance: '95%', performance: 'Excellent' },
    { id: 4, name: 'Sophia Williams', grade: '10th', section: 'C', rollNo: '1042', attendance: '78%', performance: 'Average' },
    { id: 5, name: 'Daniel Jones', grade: '12th', section: 'B', rollNo: '1210', attendance: '85%', performance: 'Good' },
    { id: 6, name: 'Olivia Davis', grade: '9th', section: 'A', rollNo: '907', attendance: '91%', performance: 'Excellent' },
    { id: 7, name: 'James Miller', grade: '11th', section: 'C', rollNo: '1136', attendance: '76%', performance: 'Average' },
    { id: 8, name: 'Ava Wilson', grade: '10th', section: 'B', rollNo: '1025', attendance: '89%', performance: 'Good' },
  ]);

  return (
    <div className="students-page">
      <div className="page-header">
        <h1>Students Management</h1>
        <button className="add-button">
          <FaUserPlus /> Add New Student
        </button>
      </div>

      <Card>
        <div className="filters-bar">
          <div className="search-wrapper">
            <FaSearch />
            <input type="text" placeholder="Search students..." />
          </div>
          <div className="filters-wrapper">
            <select defaultValue="">
              <option value="" disabled>Grade</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
            </select>
            <select defaultValue="">
              <option value="" disabled>Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
            <button className="filter-button">
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Attendance</th>
                <th>Performance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>{student.grade}</td>
                  <td>{student.section}</td>
                  <td>{student.attendance}</td>
                  <td>
                    <span className={`performance-badge ${student.performance.toLowerCase()}`}>
                      {student.performance}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-button" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <span>Showing 1-8 of 8 entries</span>
          <div className="pagination-controls">
            <button disabled>&lt; Previous</button>
            <button className="active">1</button>
            <button>Next &gt;</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Students;