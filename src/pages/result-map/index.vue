<template>
<div class="contents">
  <section class="section section-site-top pt-5">
    <div class="container">
      <h1 class="site-title text-center font-weight-bold">Google Map</h1>
    </div>
  </section>

  <section class="section section-map pt-5 pb-5">
    <div class="container">
      <div class="map-holder">
        <div class="map" ref="map"></div>
      </div>
      <div class="btn-holder mt-5">
        <a href="/" class="btn btn-lg btn-block btn-primary">戻る</a>

        <button type="submit" class="btn mt-5 btn-lg btn-block btn-primary" @click="gnavi()">近くのレストランを見る</button>
      </div>
    </div>
  </section>
  <Modal ref="modal">
    <p class="text-danger mb-0">{{modalText}}</p>
  </Modal>
</div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';
export default {
  components: {
  },


  data () {
    return {
      query:"",
      googleMap: null,
      googleMapKey: process.env.G_M_KEY,
      address:"",
      latlng:"",
      mapConfig: {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 17
      },
      modalText:"",
    }
  },
  watch:{
  },
  async created(){
    this.query = this.$router.history.current.query
    this.google = await GoogleMapsApiLoader({
      apiKey: this.googleMapKey
    });
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:this.query.address},this.geoResultCallback)

  },
  methods:{
    geoResultCallback(result, status){
      if (status != google.maps.GeocoderStatus.OK) {
        this.modalText="マップを表示できませんでした。"
        this.$bvModal.show("modal")
        return;
      }
      this.latlng = result[0].geometry.location;
      var latlngArr = result[0].geometry.location.toUrlValue().split(",");
      this.mapConfig.center.lat = Number(latlngArr[0]);
      this.mapConfig.center.lng = Number(latlngArr[1]);
      this.initializeMap();
    },
    initializeMap() {
      console.log(this.mapConfig)
      this.googleMap = new this.google.maps.Map(this.$refs.map, this.mapConfig);
      new google.maps.Marker({position:this.latlng, map:this.googleMap});
    },
    async gnavi(){
      this.$router.push('/result-gurunavi/?lat='+this.mapConfig.center.lat+'&lng='+this.mapConfig.center.lng);
    }
  }
}
</script>

<style lang="scss">
.map-holder{
  position: relative;
  width: 100%;
  height: 400px;
  .map{
    width: 100%; height: 100%;
    position: absolute;
    left: 0; top: 0;
  }
}
</style>
