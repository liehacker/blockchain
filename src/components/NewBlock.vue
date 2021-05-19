<template>
  <transition name="bounce">
    <div>
      <svg-icon
        viewBox="0 0 120.58 122.88"
        width="25"
        height="25"
        iconColor="rgba(0,0,0,0.80)"
        icon-name="blocksvg"
      >
        <icon-blocksvg />
      </svg-icon>
      <span>{{ block.data }}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { IBlock } from "@/blockchain/IBlockChain";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "NewBlock",
})
export default class NewBlock extends Vue {
  @Prop({ default: "" }) public block!: IBlock;
  @Prop({ default: "300px" }) public downHeight!: string;
  @Prop({ default: "290px" }) public bounceHeight!: string;

  created(): void {
    const style = document.documentElement.style;
    style.setProperty("--downHeight", this.downHeight);
    style.setProperty("--bounceHeight", this.bounceHeight);
  }

  mounted(): void {
    /* */
  }
}
</script>

<style scoped>
:root {
  --downHeight: 300px;
  --bounceHeight: 290px;
}
span {
  font-size: 0.5em;
}

.bounce-enter-active {
  position: relative;
  animation: movedown 1s ease-in Alternate;
  transition: all 2s;
}
.bounce-enter {
  opacity: 0;
}
@keyframes movedown {
  0% {
    top: 0px;
  }
  70% {
    top: var(--downHeight);
  }
  80% {
    top: var(--bounceHeight);
  }
  to {
    top: var(--downHeight);
  }
}
</style>
