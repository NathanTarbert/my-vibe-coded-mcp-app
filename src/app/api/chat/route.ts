import { CopilotBackend } from '@copilotkit/backend';
import { copilotKit } from '@copilotkit/nextjs';

const backend = new CopilotBackend({
  apiKey: process.env.OPENAI_API_KEY,
});

export const { POST } = copilotKit({
  backend,
});
