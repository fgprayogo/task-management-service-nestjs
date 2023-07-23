import { Task } from '.prisma/client';

export const taskStub = (): Task => {
  return {
    id: 1,
    staff_id: 1,
    title: 'Create login form',
    description: 'create login form with field email and password',
    is_assigned: true,
    is_completed: true,
    created_at: new Date('2023-07-23T08:18:35.781Z'),
    updated_at: new Date('2023-07-23T08:18:35.781Z'),
  };
};
