var beefClick = 0;
var wedgesClick = 0;
var drinkClick = 0;

Vue.component("item", {
  template: "#product-box",
  props: ["item_data", "buyitems"],
  methods: {
    addItem: function(item_data) {
      if (item_data.id == "beef") {
        beefClick += 1;
        if (beefClick <= 1) {
          this.pushData();
        } else {
          var i = this.findIndex(this.$parent.buyitems, "id", "beef");
          this.$parent.buyitems[i].qty += 1;
          this.$parent.buyitems[i].total = this.$parent.buyitems[i].qty*this.$parent.buyitems[i].price;
          console.log(i);
        }
      } else if (item_data.id == "wedges") {
        wedgesClick += 1;
        if (wedgesClick <= 1) {
          this.pushData();
        } else {
          var i = this.findIndex(this.$parent.buyitems, "id", "wedges");
          this.$parent.buyitems[i].qty += 1;
          this.$parent.buyitems[i].total =this.$parent.buyitems[i].qty*this.$parent.buyitems[i].price;
        }
      } else {
        drinkClick += 1;
        if (drinkClick <= 1) {
          this.pushData();
        } else {
          var i = this.findIndex(this.$parent.buyitems, "id", "health-drink");
          this.$parent.buyitems[i].qty += 1;
          this.$parent.buyitems[i].total = this.$parent.buyitems[i].qty*this.$parent.buyitems[i].price;
        }
      }
      console.log(beefClick, wedgesClick, drinkClick);
    },
    pushData: function() {
      this.$parent.buyitems.push({
        img: this.item_data.img,
        title: this.item_data.title,
        price: this.item_data.price,
        qty: 1,
        total: this.item_data.price,
        id: this.item_data.id
      });
    },
    findIndex: function(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },
  }
});
Vue.component("buyitem", {
  template: "#buy-box",
  props: ["buy_data", "buyitems"],
  methods: {
    removeItem: function(buy_data) {
      var index = this.$parent.buyitems.indexOf(buy_data);
      this.$parent.buyitems.splice(index, 1);
      if (buy_data.id == "beef") {
        beefClick = 0;
      } else if (buy_data.id == "wedges") {
        wedgesClick = 0;
      } else {
        drinkClick = 0;
      }
    },
    plusQty: function(buy_data){
      buy_data.qty += 1;
      buy_data.total = buy_data.qty*buy_data.price;
    },
    minusQty: function(buy_data){
      buy_data.qty -= 1;
      if (buy_data.qty < 0){
        buy_data.qty = 0;
      }
      buy_data.total = buy_data.qty*buy_data.price;
    }
    
  }
});

var app = new Vue({
  el: "#app",
  data: {
    items: [
      {
        img: "./images/burger-beef.png",
        title: "Beef Burger",
        price: "3",
        id: "beef"
      },
      {
        img: "./images/sides-wedges.png",
        title: "Wedges",
        price: "1",
        id: "wedges"
      },
      {
        img: "./images/drinks-healthy.png",
        title: "Health Drink",
        price: "1.25",
        id: "health-drink"
      }
    ],
    buyitems: []
  },
  methods: {
    total: function(){
      var sum = 0;
      this.buyitems.forEach(function(buyitem){
          sum += parseInt(buyitem.total);
      });
      return sum;
    }
  }
});
