<script setup lang="ts">
import {ref} from "vue";

const userName = ref("")
const password = ref("")
const errMsg = ref("")


function login() {

}

</script>

<template>
  <div class="container">
    <div class="screen">
      <div class="title"><h2>体操管理系统·登录</h2></div>
      <div class="login">
        <div class="field">
          <i class="icon fas fa-user"></i>
          <input type="text" class="input" placeholder="用户名" v-model="userName">
        </div>
        <div class="field">
          <i class="icon fas fa-lock"></i>
          <input type="password" class="input" placeholder="密码" v-model="password">
        </div>
        <div class="error" v-if="errMsg">
          {{ errMsg }}
        </div>
        <button class="button submit" @click="login">
          <span class="text">现在登录</span>
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped lang="stylus">

.container
  display flex
  align-items center
  justify-content center
  height 100%;
  background-image url('../assets/login_bg.jpg')
  background-repeat no-repeat
  background-size cover
  background-position center


.screen
  background linear-gradient(45deg, rgba(236, 230, 201, .4), rgba(227, 179, 141, .8))
  position relative
  height 400px
  width 360px
  box-shadow 0 0 24px #5C5696

.title
  padding 40px 16px 12px
  text-align center

.login
  padding 30px
  display flex
  flex-direction column

  @media screen and (max-width: 768px)
    padding 30px 0

  .div input button
  .field
    padding 20px 0
    position relative

  .error
    color #EC1B1B
    font-size 14px
    padding 4px 0
    padding-left 24px
    font-weight bold


  .icon
    position absolute
    top 30px
    color #7875B5

  .input
    border none
    border-bottom 2px solid #D1D1D4
    background none
    padding 10px
    padding-left 24px
    font-weight 700
    width 75%
    transition .2s
    @media screen and (max-width: 768px)
      width 90%

    &:active, &:focus, &:hover
      outline none
      border-bottom-color #6A679E

  .submit
    background-color rgba(255, 255, 255, .4)
    font-size 14px
    padding 12px 24px
    margin 12px 16px
    border none
    font-weight 700
    display flex
    align-items center
    width 80%
    color #4C489D
    box-shadow 0 0 24px rgba(140, 126, 105, 0.6)
    cursor pointer
    transition .2
    align-self end

    &:active
      background-color rgba(248, 149, 81, .6)

    &:active,
    &:focus,
    &:hover
      border-color #6A679E
      outline none

.button
  .icon
    font-size 24px
    margin-left auto;
    color #7875B5

</style>
