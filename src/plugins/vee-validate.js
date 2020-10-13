import Vue from 'vue'
import {
  extend,
  ValidationProvider,
  ValidationObserver,
  localize
} from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json';

localize('ja', ja);
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)



import * as rules from 'vee-validate/dist/rules'
for (let rule in rules) {
  // console.log(rule, rules[rule])
  extend(rule, rules[rule]);
}
//
/* 使っているもの
required
email
min
max,
size    画像サイズ　5000KB
* ext     jpg,png,gif,heic
mimes   :image/*
*/

export default {}
