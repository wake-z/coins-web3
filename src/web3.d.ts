export declare const parseAmount: (num?: string, decimal?: number) => string;
export declare const getWalletInfo: () => Promise<{
    address: any;
    chainId: number;
} | undefined>;
export declare const deposit: (amount?: string | number, tokenName?: string) => Promise<any>;
export declare const getBalance: (tokenName?: string) => Promise<string>;
export declare const sign: (address: string, str: string) => Promise<{
    sign: string;
    success: boolean;
}>;
//# sourceMappingURL=web3.d.ts.map