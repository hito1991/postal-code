<template>
<div class="contents">
  <section class="section section-site-top pt-5">
    <div class="container">
      <h1 class="site-title text-center font-weight-bold">近くのレストラン</h1>
    </div>
  </section>
  <section class="section section-map pt-5 pb-5">
    <div class="container">
      <b-card-group deck class="card-list">
        <b-card
          :title="item.name"
          :img-src="imgCheck(item.image_url.shop_image1)"
          img-alt="Image"
          img-top
          tag="article"
          class="card-item mb-4"
          v-for="item in items" :key="item.message"
        >
          <b-button class="btn-block" :href="item.url" variant="primary" target="_blank">詳細</b-button>
        </b-card>
      </b-card-group>
      <div class="btn-holder mt-5">
        <a href="/" class="btn btn-lg btn-block btn-primary">戻る</a>
      </div>
    </div>
  </section>

  <Modal ref="modal">
    <p class="text-danger mb-0">{{modalText}}</p>
  </Modal>
</div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      query: "",
      items: [],
      modalText:"",
    }
  },
  async created(){
    this.query = this.$router.history.current.query;
    var url = "https://api.gnavi.co.jp/RestSearchAPI/v3/"
    url += "?keyid="+process.env.GNAVI_KEY;
    url += "&latitude="+this.query.lat;
    url += "&longitude="+this.query.lng;
    url += "&hit_per_page=10";
    var response = await this.$axios.$get(url).catch((error)=>{
      console.log(error)
      this.modalText="近くのレストランがありませんでした。"
      this.$bvModal.show("modal")
    });
    if(response){
      this.items = response.rest;
    }
  },
  watch:{
  },
  methods:{
    imgCheck(img){
      if(img) return img;
      else return "/noimage.jpg"
    }
  }
}
</script>
<style lang="scss">
.card-list{
  flex-wrap: wrap;
  .card-item{
    flex:none;
    width: calc(33.3333% - 30px);
    .card-img-top{
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
  
  @media (max-width: 769px) {
    margin-left: 0;
    margin-right: 0;
    .card-item{
      width: 100%;
      margin: 0;
    }
  }
}
</style>
