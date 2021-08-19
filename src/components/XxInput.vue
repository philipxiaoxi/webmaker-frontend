<template>
  <div class="xx-input-group" :class="{active:(value!=undefined && value.length!=0) || active}">
    <span>{{placeholder}}</span>
    <input
      v-bind:value="value"
      v-bind:name="name"
      v-bind:type="type"
      v-bind:autocomplete="autocomplete"
      @input="$emit('input', $event.target.value)"
      @focus="focus"
      @blur="blur"
    />
  </div>
</template>

<script>
export default {
    name: 'xx-input',
    props: [
        'placeholder', 'value', 'name', 'type', 'autocomplete'
    ],
    data() {
        return {
            active: false
        }
    },
    methods: {
        focus() {
            this.active = true
            this.$emit('focus')
        },
        blur() {
            if (this.value === undefined || this.value.length === 0) {
                this.active = false
            }
            this.$emit('blur')
        }
    }
}
</script>

<style lang="less" scoped>
.xx-input-group {
  position: relative;
  display: flex;
  padding-top: 20px;
  height: 28px;
  margin-bottom: 4px;
  & > * {
    flex-grow: 1;
  }
  & > span {
    pointer-events: none;
    position: absolute;
    font-size: 16px;
    color: rgb(128, 128, 128);
    transform: translateX(10px);
    transition: all 0.3s;
  }
  & > input {
    color: rgb(66, 66, 66);
    outline: 0;
    text-indent: 1em;
    background-color: var(--bc);
    border: none;
    /* height: 28px; */
    width: 100%;
    border-bottom: 1px solid #b4b4b4;
    padding-bottom: 2px;
    font-size: 16px;
    height: 100%;
  }
  &::before {
    content: "";
    display: inline-block;
    width: 100%;
    pointer-events: none;
    height: 2px;
    position: absolute;
    background-color:#409EFF;
    bottom: -4px;
    transform: rotatey(90deg);
    transition: all 0.5s;
  }
  &.active {
    &::before {
      transform: rotateY(0deg);
    }
    & > span {
      transform: translateY(-20px) translateX(0px);
      font-size: 13px;
      color: rgb(63, 74, 83);
    }
  }
}
</style>
