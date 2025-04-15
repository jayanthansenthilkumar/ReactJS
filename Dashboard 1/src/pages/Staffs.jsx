import React, { useState } from 'react';
import { FaUserPlus, FaSearch, FaFilter, FaEdit, FaTrash, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import Card from '../components/dashboard/Card';

const Staffs = () => {
  const [staffs] = useState([
    { id: 1, name: 'Dr. Robert Wilson', position: 'Principal', department: 'Administration', email: 'r.wilson@school.edu', phone: '(555) 123-4567', joinDate: '15 Jan, 2020' },
    { id: 2, name: 'Sarah Johnson', position: 'Science Teacher', department: 'Science', email: 's.johnson@school.edu', phone: '(555) 234-5678', joinDate: '03 Mar, 2021' },
    { id: 3, name: 'Michael Carter', position: 'Mathematics Teacher', department: 'Mathematics', email: 'm.carter@school.edu', phone: '(555) 345-6789', joinDate: '22 Aug, 2019' },
    { id: 4, name: 'Emily Davis', position: 'English Teacher', department: 'Languages', email: 'e.davis@school.edu', phone: '(555) 456-7890', joinDate: '10 Jul, 2022' },
    { id: 5, name: 'James Rodriguez', position: 'Physical Education', department: 'Sports', email: 'j.rodriguez@school.edu', phone: '(555) 567-8901', joinDate: '05 Feb, 2021' },
    { id: 6, name: 'Jennifer Miller', position: 'History Teacher', department: 'Humanities', email: 'j.miller@school.edu', phone: '(555) 678-9012', joinDate: '18 Sep, 2020' },
    { id: 7, name: 'David Thompson', position: 'IT Administrator', department: 'IT', email: 'd.thompson@school.edu', phone: '(555) 789-0123', joinDate: '24 Apr, 2023' }
  ]);

  return (
    <div className="staffs-page">
      <div className="page-header">
        <h1>Staff Management</h1>
        <button className="add-button">
          <FaUserPlus /> Add New Staff
        </button>
      </div>

      <Card>
        <div className="filters-bar">
          <div className="search-wrapper">
            <FaSearch />
            <input type="text" placeholder="Search staff members..." />
          </div>
          <div className="filters-wrapper">
            <select defaultValue="">
              <option value="" disabled>Department</option>
              <option value="admin">Administration</option>
              <option value="science">Science</option>
              <option value="math">Mathematics</option>
              <option value="languages">Languages</option>
              <option value="sports">Sports</option>
              <option value="humanities">Humanities</option>
              <option value="it">IT</option>
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
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Contact</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.name}</td>
                  <td>{staff.position}</td>
                  <td>{staff.department}</td>
                  <td>
                    <div className="contact-info">
                      <div><FaEnvelope /> {staff.email}</div>
                      <div><FaPhoneAlt /> {staff.phone}</div>
                    </div>
                  </td>
                  <td>{staff.joinDate}</td>
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
          <span>Showing 1-7 of 7 entries</span>
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

export default Staffs;