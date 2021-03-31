<template>
  <div
    id="app"
    style="animation: back-to-docs 1.5s ease-in-out infinite; z-index: 6"
  >
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    -->
    <router-view />
    <sui-divider
      style="width: 900px; margin-left: auto; margin-right: auto"
      inverted
    />
    <p></p>
    <sui-divider
      style="width: 800px; margin-left: auto; margin-right: auto"
      horizontal
      inverted
    >
      <span style="color: #ffffff">Last log of smart contract</span>
    </sui-divider>
    <div v-if="log" style="width: 800px; margin-left: auto; margin-right: auto">
      <!-- <div v-bind:key="item" v-for="item in logs">{{item}}</div> -->
      <sui-message
        style="width: 500px; margin-left: auto; margin-right: auto"
        success
      >
        <sui-message-header>{{ log }}</sui-message-header>
        <p>{{ log.args }}</p>
      </sui-message>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import sc from "./scripts/smartContract";

export default {
  name: "app",
  data: function () {
    return {
      logs: [],
      log: "",
    };
  },

  methods: {
    logger() {
      console.log("Called!");
    },
  },
  mounted: function () {
    sc.on("EtherDeposit", (add, amount) => {
      this.log=add + " deposit "+amount+" wei"
      console.log("eevent", add, amount);
    });

    sc.on("WithdrawEther", (add, amount) => {
      this.log=add + " has been withdrawn  "+amount+" wei of Ether"
      console.log("eevent", add, amount);
    });

    sc.on("WithdrawDai", (add, amount) => {
      this.log=add + " has been withdrawn  "+amount+" wei of DAI"
      console.log("eevent", add, amount);
    });
    // var identityAddedEvent = Courses.IdentityAdded();
    // var that = this;
    // // Courses.getInstructor(function(error, result) {
    // //   if (!error) {
    // //     console.log("event recieved:", result);
    // //   } else console.error(error);
    // // });

    // identityAddedEvent.watch((error, result) => {
    //   if (!error) {
    //     // TODO real time logs :|
    //     // that.logs.push(result)
    //     this.logs.push(result);
    //     this.log = result;
    //     console.log("event watch recieved:", result);
    //     console.log(this.logs);
    //   } else {
    //     console.log(error);
    //   }
    // });

    this.$nextTick(function () {});
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin: auto; */
}
</style>
<style>
@keyframes back-to-docs {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(0.5em);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
