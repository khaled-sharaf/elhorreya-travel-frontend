<style lang="scss" scoped>
  #page404 {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99999;
      background-color: #613b1a;

      > .title-page404 {
        color: #909090;
        font-weight: bold;
      }
      > .buttons {
        margin-top: 30px;
        .btn {
          margin: 0 10px;
        }
      }
  }
</style>



<template>
  <div class="page404">
    <div id="page404">
      <h1 class="title-page404">PAGE NOT FOUND</h1>

      <img class="image-page404" src="http://shorelineseafoodinc.com/assets/images/404.png" alt="404">

      <div class="buttons">
        <b-button class="btn" size="sm" variant="info" :to="{name: 'home'}">Go To Home <i class="fas fa-home"></i></b-button>
        <b-button class="btn" size="sm" variant="light" @click="backPage()">Back <i class="fas fa-undo"></i></b-button>
      </div>

    </div>
  </div>
</template>



<script>
export default {
  methods: {
    backPage() {
      this.$router.go(-1)
    }
  }
}
</script>

