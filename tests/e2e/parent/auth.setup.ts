import path from 'node:path';
import { test as setup } from '@playwright/test';
import { PARENT } from '../_shared/creds';
import { authenticatePortal } from '../_shared/auth-setup';

const authFile = path.resolve(__dirname, '../.auth/parent.json');

setup('authenticate parent', async ({ page, request }) => {
  await authenticatePortal(page, request, {
    creds: PARENT,
    authFile,
    expectedUserType: 'parent',
    // Recover if the seeded password was left rotated by an interrupted test.
    fallbackPassword: 'Temp5678!',
  });
});
