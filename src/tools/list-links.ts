import { apiRequest } from '../client.js';

export const listLinksTool = {
  name: 'linklee_list_links',
  description: 'List short links in a Linklee workspace with optional search and pagination.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      workspaceId: { type: 'string', description: 'Workspace UUID' },
      page: { type: 'number', description: 'Page number (default 1)' },
      pageSize: { type: 'number', description: 'Items per page (default 20, max 100)' },
      search: { type: 'string', description: 'Search by key or target URL' },
    },
    required: ['workspaceId'],
  },
  async handler(args: Record<string, unknown>) {
    const wsId = args.workspaceId as string;
    const params: Record<string, string> = {};
    if (args.page) params.page = String(args.page);
    if (args.pageSize) params.pageSize = String(args.pageSize);
    if (args.search) params.search = String(args.search);

    const result = await apiRequest(`/workspaces/${wsId}/links`, { params });
    return JSON.stringify(result, null, 2);
  },
};
