import { apiRequest } from '../client.js';
export const getAnalyticsTool = {
    name: 'linklee_get_analytics',
    description: 'Get click analytics for a link or workspace. Returns clicks, geography, devices, browsers, referrers.',
    inputSchema: {
        type: 'object',
        properties: {
            workspaceId: { type: 'string', description: 'Workspace UUID' },
            entityType: { type: 'string', enum: ['link', 'workspace'], description: 'Entity type (default: workspace)' },
            entityId: { type: 'string', description: 'Link ID (required if entityType=link)' },
            period: { type: 'string', enum: ['24h', '7d', '30d', '90d', '365d'], description: 'Time period (default: 7d)' },
        },
        required: ['workspaceId'],
    },
    async handler(args) {
        const wsId = args.workspaceId;
        const params = {};
        if (args.entityType)
            params.entityType = String(args.entityType);
        if (args.entityId)
            params.entityId = String(args.entityId);
        if (args.period)
            params.period = String(args.period);
        const result = await apiRequest(`/workspaces/${wsId}/analytics`, { params });
        return JSON.stringify(result, null, 2);
    },
};
