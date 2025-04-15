import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Temporary credentials check
      if (credentials.username === 'admin' && credentials.password === 'password') {
        // Use the login function from AuthContext
        login();
        // Redirect to dashboard
        navigate('/');
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-card-header">
            <FaChartLine className="login-icon" />
            <h2>Admin Dashboard</h2>
          </div>
          
          <div className="login-card-body">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <span>Remember me</span>
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              
              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
          
          <div className="login-card-footer">
            <p>Demo credentials:</p>
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;