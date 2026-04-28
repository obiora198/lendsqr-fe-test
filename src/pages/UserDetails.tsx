import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle } from 'lucide-react';
import { userService } from '../services/api';
import type { User } from '../types/user';
import Button from '../components/common/Button';
import './UserDetails.scss';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('General Details');

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        const data = await userService.getUserById(id);
        if (data) setUser(data);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleStatusUpdate = async (status: User['status']) => {
    if (!user) return;
    
    setIsUpdating(status);
    // Simulate slight delay for UX response
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const updatedUser = await userService.updateUserStatus(user.id, status);
    if (updatedUser) {
      setUser(updatedUser);
      setShowSuccess(`User successfully ${status === 'active' ? 'activated' : 'blacklisted'}`);
      setTimeout(() => setShowSuccess(null), 3000);
    }
    setIsUpdating(null);
  };

  if (loading) return <div className="loading">Loading user details...</div>;
  if (!user) return <div className="error">User not found</div>;

  const tabs = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System'
  ];

  return (
    <div className="user-details-page">
      <Link to="/users" className="back-link">
        <ArrowLeft size={16} />
        <span>Back to Users</span>
      </Link>

      <div className="page-header">
        <h1>User Details</h1>
        <div className="header-actions">
          {showSuccess && (
            <div className="success-toast">
              <CheckCircle size={16} />
              {showSuccess}
            </div>
          )}
          <Button 
            variant="outline" 
            className={`blacklist-btn ${user.status === 'blacklisted' ? 'active-status' : ''}`}
            onClick={() => handleStatusUpdate('blacklisted')}
            disabled={user.status === 'blacklisted' || !!isUpdating}
          >
            {isUpdating === 'blacklisted' ? 'BLACKLISTING...' : 'BLACKLIST USER'}
          </Button>
          <Button 
            variant="outline" 
            className={`activate-btn ${user.status === 'active' ? 'active-status' : ''}`}
            onClick={() => handleStatusUpdate('active')}
            disabled={user.status === 'active' || !!isUpdating}
          >
            {isUpdating === 'active' ? 'ACTIVATING...' : 'ACTIVATE USER'}
          </Button>
        </div>
      </div>

      <div className="user-summary-card">
        <div className="summary-top">
          <div className="profile-info">
            <img src={user.profile.avatar} alt={user.userName} className="avatar" />
            <div className="name-id">
              <h2>{user.profile.firstName} {user.profile.lastName}</h2>
              <p>{user.accountNumber}</p>
            </div>
          </div>
          
          <div className="user-tier">
            <p>User's Tier</p>
            <div className="stars">
              <Star size={16} fill="#E9B200" stroke="#E9B200" />
              <Star size={16} stroke="#E9B200" />
              <Star size={16} stroke="#E9B200" />
            </div>
          </div>

          <div className="balance-info">
            <h2>₦{user.accountBalance}</h2>
            <p>{user.accountNumber}/Providus Bank</p>
          </div>
        </div>

        <div className="summary-tabs">
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="details-container">
        <section className="details-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item"><span>FULL NAME</span><p>{user.profile.firstName} {user.profile.lastName}</p></div>
            <div className="info-item"><span>PHONE NUMBER</span><p>{user.phoneNumber}</p></div>
            <div className="info-item"><span>EMAIL ADDRESS</span><p>{user.email}</p></div>
            <div className="info-item"><span>BVN</span><p>{user.profile.bvn}</p></div>
            <div className="info-item"><span>GENDER</span><p>{user.profile.gender}</p></div>
            <div className="info-item"><span>MARITAL STATUS</span><p>{user.profile.maritalStatus}</p></div>
            <div className="info-item"><span>CHILDREN</span><p>{user.profile.children}</p></div>
            <div className="info-item"><span>TYPE OF RESIDENCE</span><p>{user.profile.residenceType}</p></div>
          </div>
        </section>

        <section className="details-section">
          <h3>Education and Employment</h3>
          <div className="info-grid">
            <div className="info-item"><span>LEVEL OF EDUCATION</span><p>{user.education.level}</p></div>
            <div className="info-item"><span>EMPLOYMENT STATUS</span><p>{user.education.employmentStatus}</p></div>
            <div className="info-item"><span>SECTOR OF EMPLOYMENT</span><p>{user.education.sector}</p></div>
            <div className="info-item)<span>DURATION OF EMPLOYMENT</span><p>{user.education.duration}</p></div>
            <div className="info-item"><span>OFFICE EMAIL</span><p>{user.education.officeEmail}</p></div>
            <div className="info-item"><span>MONTHLY INCOME</span><p>₦{user.education.monthlyIncome[0]} - ₦{user.education.monthlyIncome[1]}</p></div>
            <div className="info-item"><span>LOAN REPAYMENT</span><p>₦{user.education.loanRepayment}</p></div>
          </div>
        </section>

        <section className="details-section">
          <h3>Socials</h3>
          <div className="info-grid">
            <div className="info-item"><span>TWITTER</span><p>{user.socials.twitter}</p></div>
            <div className="info-item"><span>FACEBOOK</span><p>{user.socials.facebook}</p></div>
            <div className="info-item"><span>INSTAGRAM</span><p>{user.socials.instagram}</p></div>
          </div>
        </section>

        <section className="details-section">
          <h3>Guarantor</h3>
          <div className="info-grid">
            <div className="info-item"><span>FULL NAME</span><p>{user.guarantor.firstName} {user.guarantor.lastName}</p></div>
            <div className="info-item"><span>PHONE NUMBER</span><p>{user.guarantor.phoneNumber}</p></div>
            <div className="info-item"><span>EMAIL ADDRESS</span><p>{user.guarantor.email}</p></div>
            <div className="info-item"><span>RELATIONSHIP</span><p>{user.guarantor.relationship}</p></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetails;
