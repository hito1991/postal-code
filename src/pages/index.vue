<template>
<div class="contents">
  <section class="section section-site-top">
    <div class="container">
      <h1 class="site-title font-weight-bold">郵便番号検索API</h1>
    </div>
  </section>

  <section class="section section-input">
    <div class="container-md">
      <div class="addres-form-block pb-5 pt-5">
        <h2 class="section-title text-center font-weight-bold">住所入力</h2>
        <validation-observer tag="div" class="mt-5" ref="obs" v-slot="{errors,validate}">
            
            <div class="form-group form-group-postal-code">
              <h3 class="form-title">郵便番号</h3>
              <div>
                <div class="d-flex">
                  <div class="w-25 pr-2 postal-code-el">
                    <input type="text" class="form-control" name="postalCode1" v-model="postalCodeView.postalCode1" maxlength="3">
                  </div>
                  <div class="w-25 pl-2 postal-code-el">
                    <input type="text" class="form-control" name="postalCode2" v-model="postalCodeView.postalCode2" maxlength="4">
                  </div>
                  <div class="ml-4">
                    <button type="button" class="btn btn-primary" @click="postalCodeSearch()">住所検索</button>
                  </div>
                </div>
              </div>
              <ValidationProvider tag="div" class="form-postal-code" name="郵便番号" v-slot="{ errors }" vid="postalCode" rules="required">
                <input class="d-none" type="text" name="postalCode" v-model="post.postalCode">
                <p class="form-error-text small mt-1 text-danger" v-html="errors[0]" v-if="errors.length"></p>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <h3 class="form-title">都道府県</h3>
              <ValidationProvider tag="div" class="d-block pr-5" name="都道府県" v-slot="{ errors }" vid="prefectures" rules="required">
                <div class="w-50">
                  <select v-model="post.prefectures" class="form-control">
                    <option disabled value="" selected="">選択して下さい</option>
                    <option v-for="(n,key) in prefecturesList" :value="n" :key="key" v-html="n"></option>
                  </select>
                </div>
                <p class="form-error-text small mt-1 text-danger" v-html="errors[0]" v-if="errors.length"></p>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <h3 class="form-title">市区町村・番地</h3>
              <ValidationProvider tag="div" class="" name="市区町村" v-slot="{ errors }" vid="address" rules="required">
                <input type="text" class="form-control" v-model="post.address" placeholder="" required />
                <p class="form-error-text small mt-1 text-danger" v-html="errors[0]" v-if="errors.length"></p>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <h3 class="form-title">建物名</h3>
              <ValidationProvider tag="div" class="" name="建物名" v-slot="{ errors }" vid="building">
                <input type="text" class="form-control" v-model="post.building" placeholder="" />
              </ValidationProvider>
            </div>
            <div class="btn-holder mt-5">
              <button type="submit" class="btn btn-lg btn-block btn-primary" @click="check(validate)">Google Map を見る</button>
            </div>
        </validation-observer>
      </div>
    </div>
  </section>

  <Modal ref="modal">
    <p class="text-danger mb-0">{{modalText}}</p>
  </Modal>


</div>
</template>

<script>

import { ValidationObserver, ValidationProvider } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import axiosJsonpAdapter from 'axios-jsonp'
import Modal from '~/components/Modal';
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Modal
  },


  data () {
    return {
      postalCodeView:{
        postalCode1: "",
        postalCode2: "",
      },
      prefecturesList:['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
      post:{
        postalCode: "",
        prefectures: "",
        address: "",
        building: ""
      },
      modalText:"",
    }
  },
  watch:{
    "postalCodeView.postalCode1"(v){
      this.postalCodeView.postalCode1=v.replace(/\D/g, '')
    },
    "postalCodeView.postalCode2"(v){
      this.postalCodeView.postalCode2=v.replace(/\D/g, '')
    },
    postalCodeView:{
      handler(v) {
        this.post.postalCode=this.postalCodeView.postalCode1+this.postalCodeView.postalCode2;
      },
      deep: true
    }
  },
  methods:{
    async postalCodeSearch() {
      var url = "https://zipcloud.ibsnet.co.jp/api/search"
      
      if(this.post.postalCode.length!=7) {
        this.modalText="郵便番号を正しく入力してください。"
        this.$bvModal.show("modal")
        return false;
      }
      
      var params = {zipcode:this.post.postalCode}
      var response = await this.$axios.$get(url,{
        adapter:axiosJsonpAdapter,
        params:params
      }).catch((error)=>{
        //エラー処理
      });
      if(response){
        if(response.results){
          var address = response.results[0];
          this.post.prefectures=address.address1;
          this.post.address=address.address2+address.address3;
        }
        else{
          this.modalText="郵便番号を確認してください。"
          this.$bvModal.show("modal")
          return false;
        }
      }
    },
    async check(validate){
      const isValid= await validate();
      if(isValid){
        var address = this.post.prefectures + this.post.address;
        if(this.post.building){
          address += ' ' + this.post.building
        }
        this.$router.push('/result-map?address=' + address)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.section-site-top{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background: #eee;
}
.site-title{
  text-align: center;
}
.form-title{
  font-size: 18px;;
}

.postal-code-el + .postal-code-el{
  position: relative;
  &:before{
    content: "-";
    position: absolute;
    left: 0; top: 50%;
    line-height: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
