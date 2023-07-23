import { Role, Staff } from ".prisma/client";

export const staffStub = (): Staff => {
  return {
    id: 1,
    email: 'admin@gmail.com',
    password: 'e70ffe4d0497d184',
    name: 'admin',
    role: Role.ADMIN,
    created_at: new Date('2023-07-23T08:18:35.781Z'),
    updated_at: new Date('2023-07-23T08:18:35.781Z'),
  };
};
