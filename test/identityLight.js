var IdentityLight = artifacts.require("../contracts/IdentityLight.sol");




contract("IdentityLight", function (accounts) {

    // console.log(accounts)
    it("Status must be zero ", function () {
        return IdentityLight.deployed().then(function (app) {
            return app.status();
        }).then(function (num) {
            assert.equal(num, 0);
        })
    })

    it("Initial number of user is ZERO", function () {
        return IdentityLight.deployed().then(function (app) {
            return app.numberOfUsers();
        }).then(function (num) {
            assert.equal(num, 0);
        })
    })


    it("Initial number of endorses must be ZERO ", function () {
        return IdentityLight.deployed().then(function (app) {
            return app.numberOfEndorsees();
        }).then(function (num) {
            assert.equal(num, 0);
        })
    })


})