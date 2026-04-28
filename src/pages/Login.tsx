import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import pablo from '../assets/hero.png'; // Assuming hero.png is the login illustration
import { userService } from '../services/api';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import './Login.scss';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await userService.login(email);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo-container">
          <img src={logo} alt="Lendsqr" className="logo" />
        </div>
        <div className="illustration-container">
          <img src={pablo} alt="Welcome" className="illustration" />
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <form onSubmit={handleLogin}>
            <Input 
              type="email" 
              placeholder="Email" 
              required 
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="password-input-wrapper">
              <Input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                required 
                className="login-input"
              />
              <button 
                type="button" 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            <a href="#" className="forgot-password">FORGOT PASSWORD?</a>
            <Button type="submit" fullWidth size="lg" disabled={isLoading}>
              {isLoading ? 'LOGGING IN...' : 'LOG IN'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
