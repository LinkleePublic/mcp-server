export declare const getAnalyticsTool: {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            workspaceId: {
                type: string;
                description: string;
            };
            entityType: {
                type: string;
                enum: string[];
                description: string;
            };
            entityId: {
                type: string;
                description: string;
            };
            period: {
                type: string;
                enum: string[];
                description: string;
            };
        };
        required: string[];
    };
    handler(args: Record<string, unknown>): Promise<string>;
};
