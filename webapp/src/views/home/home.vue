<template>
  <div class="banner flex_center">
    <div class="content section flex_center">
      <h2>{{$t('home_banner_title')}}</h2>
      <p class="sub_title">{{$t('home_banner_subTitle')}}</p>
      <div class="btns">
        <a class="down" href="#">{{$t('down')}}</a>
        <a class="enter" href="#">{{$t('quick_start')}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='scss'>
.banner {
  height: 450px;
  background: $color-primary;
  .content {
    flex-direction: column;
    .btns {
      a {
        display: inline-block;
        font-size: 14px;
        &.down {
          @include btn(#fff, transparent);
          margin-right: 30px;
        }
        &.enter {
          @include btn(transparent, #fff);
          color: #fff;
        }
      }
    }
  }
}
</style>