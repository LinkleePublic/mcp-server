#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createLinkTool } from './tools/create-link.js';
import { listLinksTool } from './tools/list-links.js';
import { getAnalyticsTool } from './tools/get-analytics.js';
import { listTagsTool } from './tools/list-tags.js';

const server = new McpServer({
  name: 'linklee',
  version: '0.1.0',
});

const ALL_TOOLS = [createLinkTool, listLinksTool, getAnalyticsTool, listTagsTool];

for (const tool of ALL_TOOLS) {
  server.tool(
    tool.name,
    tool.description,
    tool.inputSchema,
    async (args) => {
      try {
        const result = await tool.handler(args as Record<string, unknown>);
        return { content: [{ type: 'text' as const, text: result }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: 'text' as const, text: `Error: ${message}` }], isError: true };
      }
    },
  );
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Linklee MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
