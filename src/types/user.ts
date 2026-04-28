export interface User {
  id: string;
  createdAt: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  lastActiveDate: string;
  profile: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
    maritalStatus: string;
    children: string;
    residenceType: string;
  };
  guarantor: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    address: string;
    email: string;
    relationship: string;
  };
  accountNumber: string;
  accountBalance: string;
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
}
