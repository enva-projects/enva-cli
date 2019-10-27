declare function createBasicConfig(): void;
declare function writeConfig(configPath: any, config: any): void;
declare function getCommandNodes(root: any): string[];
declare const config: any;
declare const commandRoots: string[];
export { config, commandRoots, getCommandNodes, writeConfig, createBasicConfig };
