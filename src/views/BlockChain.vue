<template>
  <article>
    <div class="menu">
      <div style="display: none" class="button" v-on:click="getBlock">
        Get Block
      </div>
      <div class="button" v-on:click="test_add">Block Add</div>
    </div>
    <div v-for="block in iblock" :key="block.index">
      <new-block
        v-show="blockData !== ''"
        :block="block"
        :downHeight="downHeight"
        :bounceHeight="bounceHeight"
      />
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import Vue from "vue";
import IconBlocksvg from "@/components/icons/IconBlocksvg.vue";
import NewBlock from "@/components/NewBlock.vue";
import { IBlock } from "@/blockchain/IBlockChain";

Vue.component("icon-blocksvg", IconBlocksvg);
Vue.component("NewBlock", NewBlock);

@Component
export default class BlockChainView extends Vue {
  blockData = "";
  downHeight = "300px";
  bounceHeight = "290px";
  iblock: IBlock[] = [];

  getBlock(): void {
    if (this.$blockchain.getBlockLength() <= 0) {
      this.$blockchain.addBlock("first");
    }
    this.getBlockData();
    this.iblock = this.$blockchain.blocks;
  }

  test_add(): void {
    if (this.$blockchain.getBlockLength() > 0) {
      const data: string = Math.random().toString() + " BTC";
      if (this.$blockchain.addBlock(data)) {
        this.blockData = this.$blockchain.getBlockData();
        this.iblock = this.$blockchain.blocks;
      }
    } else {
      this.getBlock();
    }
  }

  getBlockData(): void {
    if (this.$blockchain.getBlockLength() > 0)
      this.blockData = this.$blockchain.getBlockData();
    else this.blockData = "";
  }

  @Watch("blockData")
  watchBlock(): void {
    const h = 300 - this.$blockchain.getBlockLength() * 10;
    this.downHeight = h.toString() + "px";
    this.bounceHeight = (h - 10).toString() + "px";
  }
}
</script>

<style scoped lang="scss">
.temp {
  position: relative;
  text-align: center;
}
.menu {
  width: 100%;
  position: fixed;
  top: 0px;
  text-align: center;
}
.button {
  display: inline-block;
  background: red;
  color: white;
  width: 160px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  border-radius: 10px;
  font-weight: bold;
  margin: 2px;
}
</style>
