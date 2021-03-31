<template>
  <div style="margin: auto; width: 800px; padding-top: 250px">
    <router-link to="/">
      <sui-button>Back</sui-button>
    </router-link>
    <sui-segment stacked="tall">
      <sui-form>
        
        <sui-form-field>
          <label>Copy all trades of this account address:</label>
          <input v-model="add" placeholder="Address" />
        </sui-form-field>
        <sui-form-field></sui-form-field>
        <sui-button v-on:click="follow" type="submit">Copy</sui-button>
      </sui-form>
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
    return { add: "" };
  },
  methods: {
    follow: async function () {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      // console.log(accounts);
      sc.follow(this.add).then((f) => console.log(f));

      // sc.methods
      //   .follow(this.add)
      //   .send({ from: account, value: this.amount }, function (err, res) {
      //     if (err) alert(err.message);
      //   });
    },
  },
};
</script>
