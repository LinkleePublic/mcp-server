#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { apiRequest } from './client.js';

const server = new McpServer({
  name: 'linklee',
  version: '0.1.0',
});

server.tool(
  'linklee_create_link',
  'Create a short link on Linklee. Returns the short URL and link details.',
  {
    workspaceId: z.string().describe('Workspace UUID'),
    targetUrl: z.string().describe('The long URL to shorten'),
    key: z.string().optional().describe('Custom short key (auto-generated if empty)'),
    utmSource: z.string().optional().describe('UTM source'),
    utmMedium: z.string().optional().describe('UTM medium'),
    utmCampaign: z.string().optional().describe('UTM campaign'),
    comments: z.string().optional().describe('Internal notes'),
  },
  async (args) => {
    const body: Record<string, unknown> = { targetUrl: args.targetUrl };
    if (args.key) body.key = args.key;
    if (args.utmSource) body.utmSource = args.utmSource;
    if (args.utmMedium) body.utmMedium = args.utmMedium;
    if (args.utmCampaign) body.utmCampaign = args.utmCampaign;
    if (args.comments) body.comments = args.comments;
    const result = await apiRequest(`/workspaces/${args.workspaceId}/links`, { method: 'POST', body });
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  },
);

server.tool(
  'linklee_list_links',
  'List short links in a workspace with optional search and pagination.',
  {
    workspaceId: z.string().describe('Workspace UUID'),
    page: z.number().optional().describe('Page number (default 1)'),
    pageSize: z.number().optional().describe('Items per page (default 20)'),
    search: z.string().optional().describe('Search by key or URL'),
  },
  async (args) => {
    const params: Record<string, string> = {};
    if (args.page) params.page = String(args.page);
    if (args.pageSize) params.pageSize = String(args.pageSize);
    if (args.search) params.search = args.search;
    const result = await apiRequest(`/workspaces/${args.workspaceId}/links`, { params });
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  },
);

server.tool(
  'linklee_get_analytics',
  'Get click analytics: clicks, geography, devices, browsers, referrers.',
  {
    workspaceId: z.string().describe('Workspace UUID'),
    entityType: z.enum(['link', 'workspace']).optional().describe('Entity type'),
    entityId: z.string().optional().describe('Link ID (if entityType=link)'),
    period: z.enum(['24h', '7d', '30d', '90d', '365d']).optional().describe('Time period'),
  },
  async (args) => {
    const params: Record<string, string> = {};
    if (args.entityType) params.entityType = args.entityType;
    if (args.entityId) params.entityId = args.entityId;
    if (args.period) params.period = args.period;
    const result = await apiRequest(`/workspaces/${args.workspaceId}/analytics`, { params });
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  },
);

server.tool(
  'linklee_list_tags',
  'List tags in a workspace.',
  {
    workspaceId: z.string().describe('Workspace UUID'),
  },
  async (args) => {
    const result = await apiRequest(`/workspaces/${args.workspaceId}/tags`);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Linklee MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
