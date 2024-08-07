declare module "@uphold/uphold-sdk-javascript" {
  export default class SDK {
    constructor(options: {
      baseUrl: string;
      clientId: string;
      clientSecret: string;
    });

    getTicker(currency?: string): Promise<
      Array<{
        ask: string;
        bid: string;
        currency: string;
        pair: string;
      }>
    >;

    getCurrencies(): Promise<
      Array<{
        code: string;
        formatting: {
          decimal: string;
          format: string;
          grouping: string;
          precision: number;
        };
        name: string;
        status: string;
        symbol: string;
        type: string;
      }>
    >;
  }
}
