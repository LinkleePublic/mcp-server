import { apiRequest } from '../client.js';

export const createLinkTool = {
  name: 'linklee_create_link',
  description: 'Create a short link on Linklee. Returns the short URL and link details.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      workspaceId: { type: 'string', description: 'Workspace UUID' },
      targetUrl: { type: 'string', description: 'The long URL to shorten' },
      key: { type: 'string', description: 'Custom short key (optional, auto-generated if empty)' },
      tags: { type: 'array', items: { type: 'string' }, description: 'Tag IDs to attach' },
      utmSource: { type: 'string', description: 'UTM source parameter' },
      utmMedium: { type: 'string', description: 'UTM medium parameter' },
      utmCampaign: { type: 'string', description: 'UTM campaign parameter' },
      comments: { type: 'string', description: 'Internal comments/notes' },
    },
    required: ['workspaceId', 'targetUrl'],
  },
  async handler(args: Record<string, unknown>) {
    const wsId = args.workspaceId as string;
    const body: Record<string, unknown> = {
      targetUrl: args.targetUrl,
    };
    if (args.key) body.key = args.key;
    if (args.tags) body.tagIds = args.tags;
    if (args.utmSource) body.utmSource = args.utmSource;
    if (args.utmMedium) body.utmMedium = args.utmMedium;
    if (args.utmCampaign) body.utmCampaign = args.utmCampaign;
    if (args.comments) body.comments = args.comments;

    const result = await apiRequest(`/workspaces/${wsId}/links`, {
      method: 'POST',
      body,
    });
    return JSON.stringify(result, null, 2);
  },
};
