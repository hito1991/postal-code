<template>
<div class="contents">
  <section class="section section-site-top pt-5 pb-5">
    <div class="container">
      <h1 class="site-title text-center font-weight-bold">Google Map</h1>
    </div>
  </section>

  <section class="section section-map pt-5 pb-5">
    <div class="container">
      <div class="map-holder">
        <div class="map" ref="map"></div>
      </div>
    </div>
  </section>
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
      }
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
    console.log(geocoder)
    geocoder.geocode({address:this.query.address},this.geoResultCallback)

  },
  methods:{
    geoResultCallback(result, status){
      console.log(1234567890)
      if (status != google.maps.GeocoderStatus.OK) {
        alert(status);
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
    }
  }
}
</script>

<style lang="scss">
.map-holder{
  position: relative;
  width: 100%;
  height: 500px;
  .map{
    width: 100%; height: 100%;
    position: absolute;
    left: 0; top: 0;
  }
}
</style>
