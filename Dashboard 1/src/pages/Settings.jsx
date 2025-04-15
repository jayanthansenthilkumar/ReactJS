import React from 'react';
import { FaSave, FaUserCog, FaBell, FaLock, FaDatabase } from 'react-icons/fa';
import Card from '../components/dashboard/Card';

const Settings = () => {
  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      <div className="settings-grid">
        <div className="settings-sidebar">
          <ul className="settings-nav">
            <li className="active"><FaUserCog /> Profile Settings</li>
            <li><FaBell /> Notification Settings</li>
            <li><FaLock /> Security Settings</li>
            <li><FaDatabase /> Data Management</li>
          </ul>
        </div>
        
        <div className="settings-content">
          <Card title="Profile Settings">
            <form className="settings-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" defaultValue="Admin User" />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" defaultValue="admin@example.com" />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" defaultValue="(123) 456-7890" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <input type="text" id="role" defaultValue="Administrator" disabled />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Biography</label>
                <textarea id="bio" rows="4" defaultValue="School administrator with 10+ years of experience in education management."></textarea>
              </div>
              
              <div className="form-section">
                <h3>Profile Picture</h3>
                <div className="profile-picture-section">
                  <div className="current-picture">
                    <div className="avatar-placeholder">
                      <span>AU</span>
                    </div>
                  </div>
                  <div className="picture-actions">
                    <button type="button" className="upload-button">Upload New Picture</button>
                    <button type="button" className="remove-button">Remove Picture</button>
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-button">
                  <FaSave /> Save Changes
                </button>
                <button type="button" className="cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;