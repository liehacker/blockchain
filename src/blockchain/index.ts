import CryptoJS from "crypto-js";
import { IBlock, IBlockChain } from "./IBlockChain";

export default class BlockChain implements IBlockChain {
  private static instance: BlockChain;
  public blocks: IBlock[] = [];

  private constructor() {
    console.log("constructor");
  }

  public static getInstance(): BlockChain {
    if (!this.instance) {
      this.instance = new BlockChain();
    }
    return this.instance;
  }

  private calculateBlockHash(
    index: number,
    preHash: string,
    data: string,
    timeStamp: number
  ): string {
    return CryptoJS.SHA256(index + preHash + data + timeStamp).toString();
  }

  private getIndex(): number {
    return this.getLastBlock() ? this.getLastBlock().index + 1 : 1;
  }

  private getLastBlock(): IBlock {
    return this.blocks[this.blocks.length - 1];
  }

  private getPreHash(): string {
    return this.getLastBlock() ? this.getLastBlock().hash : "";
  }

  private getNewTimeStamp(): number {
    return Math.round(new Date().getTime() / 1000);
  }

  public getBlockLength(): number {
    return this.blocks ? this.blocks.length : 0;
  }

  public getBlockData(): string {
    return this.getLastBlock().data;
  }

  public addBlock(data: string): boolean {
    if (typeof data === "string") {
      const newBlock: IBlock = {
        index: this.getIndex(),
        hash: this.calculateBlockHash(
          this.getIndex(),
          this.getPreHash(),
          data,
          this.getNewTimeStamp()
        ),
        preHash: this.getPreHash(),
        data: data,
        timeStamp: this.getNewTimeStamp(),
      };
      this.blocks.push(newBlock);
      return true;
    } else {
      console.log("data is not string");
      return false;
    }
  }

  public getBlock(index: number): IBlock {
    return this.blocks[index];
  }
}
