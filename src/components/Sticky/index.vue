<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className"
         :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sticky',
  props: {
    stickyTop: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    className: {
      type: String,
      default: 'sub-navbar'
    }
  },
  data() {
    return {
      active: false,
      position: '',
      width: undefined,
      height: undefined,
      isSticky: false
    }
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleReize)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleReize)
  },
  methods: {
    sticky() {
      if (this.active) {
        return
      }
      this.position = 'fixed'
      this.active = true
      this.width = this.width + 'px'
      this.isSticky = true
    },
    reset() {
      if (!this.active) {
        return
      }
      this.position = ''
      this.width = 'auto'
      this.active = false
      this.isSticky = false
    },
    handleScroll() {
      this.width = this.$el.getBoundingClientRect().width
      const offsetTop = this.$el.getBoundingClientRect().top
      if (offsetTop < this.stickyTop) {
        this.sticky()
        return
      }
      this.reset()
    },
    handleReize() {
      if (this.isSticky) {
        this.width = this.$el.getBoundingClientRect().width + 'px'
      }
    }
  }
}
</script>

<style>
.sub-navbar {
  background: linear-gradient(
    90deg,
    #20b6f9,
    #20b6f9 0,
    #2178f1 100%,
    #2178f1 0
  );
  height: 50px;
  line-height: 50px;
  padding-right: 20px;
  position: relative;
  text-align: right;
  transition: position 0.6s ease;
  width: 100%;
}

.sub-navbar .subtitle {
  color: #fff;
  font-size: 20px;
}

.sub-navbar.deleted,
.sub-navbar.draft {
  background: #d0d0d0;
}
</style>
