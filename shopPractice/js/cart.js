
Vue.filter("moneys", function (value, type) {
    return '￥' + value.toFixed(2) + type
});


var vm = new Vue({
    el: '#app',
    data: {
        productList: [],
        totalMoney: 0,
        checkAllFlag: false,
        delFlag:false,
        currProduct:""
    },
    filters: {
        formatMoney: function (value) {
            return '￥' + value.toFixed(2)
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        });
    },
    methods: {
        cartView: function () {
            let _this = this;
            //调接口
            this.$http.get("data/cartData.json", ("id", 123)).then(res => {
                    this.productList = res.data.result.list;
                    this.totalMoney = res.data.result.totalMoney;
                }
            )
        },
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuantity++;
            } else {
                if (product.productQuantity > 1) {
                    product.productQuantity--;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct: function (item) {//单击选中
            if (typeof item.checked == 'undefined') {
                //Vue.set(item,"checked",true);//通过vue全局注册属性
                this.$set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function (flag) {//全选 取消全选
            this.checkAllFlag = flag;
            this.productList.forEach((item, index) =>{//遍历商品列表
                if (typeof item.checked == 'undefined') {
                    this.$set(item, "checked", this.checkAllFlag);
                } else {
                    item.checked = this.checkAllFlag;
                }
            })
            this.calcTotalPrice();
        },
        calcTotalPrice:function(){//商品总金额
            this.totalMoney = 0;
            this.productList.forEach((item, index) =>{
                if(item.checked){
                    this.totalMoney += (item.productPrice * item.productQuantity);
                }
            })
        },
        delConfirm:function(item){
            this.delFlag=true;
            this.currProduct = item;
        },
        delProduct:function(){
            var index = this.productList.indexOf(this.currProduct);//找到删除项的索引
            this.productList.splice(index,1);//删除数组的一项
            this.delFlag=false;
        }
    }
});