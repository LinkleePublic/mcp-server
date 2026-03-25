# @linklee/mcp-server

Model Context Protocol (MCP) server for [Linklee](https://linklee.ru) — short links, analytics, and QR codes.

## Quick Start

### With Claude Desktop

Add to `~/.claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "linklee": {
      "command": "npx",
      "args": ["@linklee/mcp-server"],
      "env": {
        "LINKLEE_API_KEY": "lk_live_your_api_key_here"
      }
    }
  }
}
```

### With Claude Code

```bash
claude mcp add linklee -- npx @linklee/mcp-server
```

Set your API key:
```bash
export LINKLEE_API_KEY=lk_live_your_api_key_here
```

## Available Tools

| Tool | Description |
|------|-------------|
| `linklee_create_link` | Create a short link |
| `linklee_list_links` | List links in workspace |
| `linklee_get_analytics` | Get click analytics |
| `linklee_list_tags` | List workspace tags |

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `LINKLEE_API_KEY` | — | API key (required). Create at Dashboard → API Keys |
| `LINKLEE_API_URL` | `https://api.linklee.ru` | API base URL |

## Examples

> "Сократи ссылку https://example.com/very-long-url"

> "Покажи аналитику по workspace за последнюю неделю"

> "Создай ссылку с UTM-метками для Instagram кампании"

## Development

```bash
cd mcp-server
npm install
npm run dev
```

## License

MIT
