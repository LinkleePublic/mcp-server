export declare const listTagsTool: {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            workspaceId: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    handler(args: Record<string, unknown>): Promise<string>;
};
