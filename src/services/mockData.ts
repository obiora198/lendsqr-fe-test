import { faker } from '@faker-js/faker';
import type { User } from '../types/user';

const statusOptions: User['status'][] = [
  'active',
  'inactive',
  'pending',
  'blacklisted',
];

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      id: faker.string.uuid(),
      createdAt: faker.date.past().toISOString(),
      orgName: faker.company.name(),
      userName: faker.internet.username({ firstName, lastName }),
      email: faker.internet.email({ firstName, lastName }),
      phoneNumber: faker.phone.number(),
      lastActiveDate: faker.date.recent().toISOString(),
      profile: {
        firstName,
        lastName,
        phoneNumber: faker.phone.number(),
      avatar: faker.image.avatar(),
      gender: faker.person.sex(),
      bvn: faker.string.numeric(11),
        address: faker.location.streetAddress(),
        currency: 'NGN',
        maritalStatus: faker.helpers.arrayElement(['Single', 'Married', 'Divorced']),
        children: faker.helpers.arrayElement(['None', '1', '2', '3+']),
        residenceType: faker.helpers.arrayElement(['Parent\'s Apartment', 'Rented', 'Owned']),
      },
      guarantor: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.phone.number(),
        gender: faker.person.sex(),
        address: faker.location.streetAddress(),
        email: faker.internet.email(),
        relationship: faker.helpers.arrayElement(['Brother', 'Sister', 'Parent', 'Friend']),
      },
    accountNumber: faker.finance.accountNumber(),
    accountBalance: faker.finance.amount({ min: 1000, max: 1000000 }),
    education: {
      level: faker.helpers.arrayElement(['B.Sc', 'M.Sc', 'PhD', 'Diploma']),
      employmentStatus: faker.helpers.arrayElement([
        'Employed',
        'Unemployed',
        'Self-Employed',
      ]),
      sector: faker.commerce.department(),
      duration: '2 years',
      officeEmail: faker.internet.email(),
      monthlyIncome: [
        faker.finance.amount({ min: 50000, max: 200000 }),
        faker.finance.amount({ min: 200000, max: 500000 })
      ],
      loanRepayment: faker.finance.amount({ min: 1000, max: 50000 }),
    },
    socials: {
      facebook: `@${faker.internet.username()}`,
      instagram: `@${faker.internet.username()}`,
      twitter: `@${faker.internet.username()}`,
    },
    status: faker.helpers.arrayElement(statusOptions),
    };
  });
};

export const MOCK_USERS = generateUsers(500);
