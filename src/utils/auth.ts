import { getXataClient } from '@/xata';

export const isAdminUser = async (userId: string): Promise<boolean> => {
  if (!userId) return false;
  const xataClient = getXataClient();
  const adminUser = await xataClient.db.adminUser.read(userId);
  return !!adminUser;
};
