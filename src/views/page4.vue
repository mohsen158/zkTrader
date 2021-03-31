<template>
  <div style="margin: auto; width: 800px; padding-top: 250px">
    <router-link to="/">
      <sui-button>Back</sui-button>
    </router-link>
    <sui-segment stacked="tall">
      <sui-form>
        <sui-form-field>
          <label>ٍMake open order to sell Eth and get DAI token.</label>
          <span> </span>
        </sui-form-field>
        <sui-form-field>
          <label>Price</label>
          <input v-model="hashh" placeholder="Hash of price" />
        </sui-form-field>
        <sui-form-field></sui-form-field>
        <sui-button v-on:click="openOrder" type="submit">Send</sui-button>
      </sui-form>

      <sui-segment>
        <sui-form>
          <sui-form-field>
            <label>ٍGenerate hash of the price</label>
            <span>{{ this.hashh }}</span>
          </sui-form-field>
          <sui-form-field>
            <label>Price</label>
            <input v-model="price" placeholder="Price" />
          </sui-form-field>
          <sui-form-field></sui-form-field>
          <sui-button v-on:click="hashF" type="submit">ٍGenerate</sui-button>
          <sui-button v-on:click="getCurrentPrice" color="green" inverted type="submit">Current price (using chain link)</sui-button>
        </sui-form></sui-segment
      >
    </sui-segment>
  </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";
import sc from "../scripts/smartContract";
const Web3 = require("web3");

import MerkleTree from "merkletreejs";
import SHA256 from "crypto-js/sha256";
//TODO change account of metamask  realtime
export default {
  name: "home",
  data: function () {
    return {
      hashh: "",
      price: "",
      endorsee: "",
    };
  },
  methods: {
    getCurrentPrice: async function(){
            this.price = await sc.getLatestPrice();

    },
    openOrder: async function () {
      sc.openOrder(this.hashh).then((f) => console.log(f));
    },
    hashF: async function () {
      // sc.methods.purpose().call().then(console.log);
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      this.hashh = await sc.hash(this.price);

      // sc.methods
      //   .hash(123)
      //   .send({ from: account })
      //   .then(function (result) {
      //     console.log("sfs", result);
      //   });
      // sc.methods.hash(this.price).call({}, function (err, res) {
      //   if (err) alert(err.message);
      // });
    },
  },
};
</script>
