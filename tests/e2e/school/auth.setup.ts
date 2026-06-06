import path from 'node:path';
import { test as setup } from '@playwright/test';
import { SCHOOL } from '../_shared/creds';
import { authenticatePortal } from '../_shared/auth-setup';

const authFile = path.resolve(__dirname, '../.auth/school.json');

setup('authenticate school', async ({ page, request }) => {
  await authenticatePortal(page, request, {
    creds: SCHOOL,
    authFile,
    expectedUserType: 'school',
  });
});
