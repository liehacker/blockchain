export interface IBlock {
  index: number;
  hash: string;
  preHash: string;
  data: string;
  timeStamp: number;
}

export interface IBlockChain {
  getBlockLength(): number;
  addBlock(data: string): boolean;
}
