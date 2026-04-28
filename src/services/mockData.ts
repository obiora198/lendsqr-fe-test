import { faker } from '@faker-js/faker';
import { User } from '../types/user';

const statusOptions: User['status'][] = ['active', 'inactive', 'pending', 'blacklisted'];

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    createdAt: faker.date.past().toISOString(),
    orgName: faker.company.name(),
    userName: faker.internet.username(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    lastActiveDate: faker.date.recent().toISOString(),
    profile: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
      avatar: faker.image.avatar(),
      gender: faker.person.sex(),
      bvn: faker.string.numeric(11),
      address: faker.location.streetAddress(),
      currency: 'NGN',
    },
    guarantor: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
      gender: faker.person.sex(),
      address: faker.location.streetAddress(),
    },
    accountNumber: faker.finance.accountNumber(),
    accountBalance: faker.finance.amount(),
    education: {
      level: faker.helpers.arrayElement(['B.Sc', 'M.Sc', 'PhD', 'Diploma']),
      employmentStatus: faker.helpers.arrayElement(['Employed', 'Unemployed', 'Self-Employed']),
      sector: faker.commerce.department(),
      duration: '2 years',
      officeEmail: faker.internet.email(),
      monthlyIncome: [faker.finance.amount(), faker.finance.amount()],
      loanRepayment: faker.finance.amount(),
    },
    socials: {
      facebook: `@${faker.internet.username()}`,
      instagram: `@${faker.internet.username()}`,
      twitter: `@${faker.internet.username()}`,
    },
    status: faker.helpers.arrayElement(statusOptions),
  }));
};

export const MOCK_USERS = generateUsers(500);
