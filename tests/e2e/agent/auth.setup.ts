import path from 'node:path';
import { test as setup } from '@playwright/test';
import { AGENT } from '../_shared/creds';
import { authenticatePortal } from '../_shared/auth-setup';

const authFile = path.resolve(__dirname, '../.auth/agent.json');

setup('authenticate agent', async ({ page, request }) => {
  await authenticatePortal(page, request, {
    creds: AGENT,
    authFile,
    expectedUserType: 'agent',
  });
});
