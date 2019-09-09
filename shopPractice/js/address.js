/** @author Administrator @date 2019/9/5 0005 下午 2:41*/
new Vue({
    el: '.container',
    data: {
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{
        filterAddress:function(){//只显示4条数据
            return this.addressList.slice(0,this.limitNum);//slice截取后返回全新数组 保留原数组
        }
    },
    methods: {
        getAddressList:function(){//获取列表数据
            var _this = this;
            this.$http.get("data/address.json").then(function(response){
                var res = response.data;
                if(res.status=='0'){
                    _this.addressList = res.result;
                }
            });
        },
        loadMore:function(){
            this.limitNum = this.addressList.length;
        },
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index){
                if(address.addressId==addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })
        }
    }
});