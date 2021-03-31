<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>-->
  <!-- 
  <div class="home" >
    
    <router-link   to="/about">
  <button>sdfdfsd</button>
</router-link>
    
  </div>-->
  <!-- <sui-grid divided="vertically" style="  margin:250px auto; width: 50%;"  > -->
  <div style="margin: auto; width: 800px; padding-top: 250px">
    <router-link to="/">
      <sui-button>Back</sui-button>
    </router-link>
    <sui-segment stacked="tall">
      <sui-form>
        <sui-form-field>
          <label>Amount</label>
          <input v-model="amount" placeholder="Amount in wei" />
        </sui-form-field>

        <sui-form-field></sui-form-field>
        <sui-button v-on:click="save" type="submit"
          >Send (create transactionssss)</sui-button
        >
      </sui-form>
    </sui-segment>
    <!-- </sui-grid> -->
    <!-- <div>
    <sui-card class="raised link">
      <sui-card-content>
        <sui-card-header>Cute Dog</sui-card-header>
        <sui-card-meta>Animals</sui-card-meta>
        <sui-image src="/static/images/wireframes/paragraph.png" />
      </sui-card-content>
      <sui-card-content extra>
        <span slot="right">
          <sui-image src="/static/images/avatar/small/matt.jpg" shape="circular" size="mini" /> Matt
        </span>
      </sui-card-content>
    </sui-card>
    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import sc from "../scripts/smartContract";

import MerkleTree from "merkletreejs";
import SHA256 from "crypto-js/sha256";

export default {
  name: "home",
  data: function () {
    return { amount: "" };
  },
  methods: {
    save: async function () {
      // const leaves = [this.firstName, this.lastName].map((x) => SHA256(x));
      // const tree = new MerkleTree(leaves, SHA256);
      // const root = tree.getRoot().toString("hex");
      // const leaf = SHA256("a");
      // const proof = tree.getProof(leaf);
      // console.log("tree1:"); // true
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log(accounts);
      sc.ethDeposit({ value:  this.amount }).then((f) => console.log(f));

      // sc.methods
      //   .ethDeposit()
      //   .send({ from: account, value: this.amount }, function (err, res) {
      //     console.log("res in deposit:", res);
      //     if (err) alert(err.message);
      //   });

      // console.log(this.firstName);
    },
  },
};
</script>
