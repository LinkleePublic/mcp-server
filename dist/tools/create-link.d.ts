export declare const createLinkTool: {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            workspaceId: {
                type: string;
                description: string;
            };
            targetUrl: {
                type: string;
                description: string;
            };
            key: {
                type: string;
                description: string;
            };
            tags: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            utmSource: {
                type: string;
                description: string;
            };
            utmMedium: {
                type: string;
                description: string;
            };
            utmCampaign: {
                type: string;
                description: string;
            };
            comments: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    handler(args: Record<string, unknown>): Promise<string>;
};
