import { apiRequest } from '../client.js';

export const listTagsTool = {
  name: 'linklee_list_tags',
  description: 'List tags in a Linklee workspace.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      workspaceId: { type: 'string', description: 'Workspace UUID' },
    },
    required: ['workspaceId'],
  },
  async handler(args: Record<string, unknown>) {
    const wsId = args.workspaceId as string;
    const result = await apiRequest(`/workspaces/${wsId}/tags`);
    return JSON.stringify(result, null, 2);
  },
};
