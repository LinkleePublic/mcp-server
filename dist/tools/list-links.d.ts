export declare const listLinksTool: {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            workspaceId: {
                type: string;
                description: string;
            };
            page: {
                type: string;
                description: string;
            };
            pageSize: {
                type: string;
                description: string;
            };
            search: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    handler(args: Record<string, unknown>): Promise<string>;
};
