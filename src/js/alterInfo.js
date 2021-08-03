require("../css/alterInfo.less");
document.ready(function () {
    // 获取标签
    let backDom = document.querySelector("#back");
    let genderDom = document.querySelector("#gender");
    let birthdayDom = document.querySelector("#birthday")
    let birthdayValDom = document.querySelector("#birthdayVal")

    let provinceBtnDom = document.querySelector("#province");
    let cityBtnDom = document.querySelector("#city");
    let proVal = document.querySelector("#proVal");
    let cityVal = document.querySelector("#cityVal");

    let btn = document.querySelector(".btn");

    let nicknameDom = document.querySelector(".nickname");
    let genderVal = document.querySelector('#genderVal');
    let signVal = document.querySelector("textarea")



    let pid = "";
    let cityArr;

    const user = JSON.parse(localStorage.getItem("user"))
    let params = {
        params: "",
        gender: "",
        birthday: "",
        address: [],
        sign: "",
        userId: user.userId
    }
    // 如果本地存储有userid，直接先发送请求，渲染页面
    if (user) {
        $http.get("/users/accountinfo", { userId: user.userId }, function (res) {
            console.log(res);
            let userInfo = res.data;
            console.log(userInfo);
            console.log(userInfo.nickname);
            nicknameDom.value = userInfo.nickname;
            genderVal.textContent = userInfo.gender;
            let date = new Date(userInfo.birthday);
            console.log(date);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate()
            console.log(year, month, day);
            birthdayValDom.textContent = `${year}-${month > 10 ? month : '0' + month}-${day > 10 ? day : '0' + day}`;
            console.log(userInfo.address);
            let arr = userInfo.address.split(",");
            console.log(arr);
            proVal.textContent = arr[0];
            cityVal.textContent = arr[1];
            signVal.value = userInfo.sign;
        })
    }
    // 点击iconfont，返回my.html页面
    backDom.addEventListener("click", function () {
        location.href = './my.html'
    })


    // 性别
    //点击事件监听---生成picker
    genderDom.addEventListener('click', function () {
        //生成 picker 
        weui.picker([{
            label: '男',
            value: '男'
        }, {
            label: '女',
            value: '女'
        }], {
            onConfirm: function (result) {
                console.log(result);
                console.log('确认值');
                console.log(result[0].value);
                genderVal.textContent = result[0].value;
            },
            title: '性别'
        });
    })
    // 生日
    birthdayDom.addEventListener('click', function () {
        weui.datePicker({
            start: 1850,
            end: new Date().getFullYear(),
            onConfirm: function (res) {
                console.log(res);
                // let str = res[0].label + res[1].label + res[2].label;
                // 添零补齐
                // let str = `${res[0].value}-${res[1].value}-${res[2].value}`
                let str = `${res[0].value}-${res[1].value < 10 ? '0' + res[1].value : res[1].value
                    }-${res[2].value < 10 ? '0' + res[2].value : res[2].value}`
                console.log(str);
                birthdayValDom.textContent = str;
            },
            title: '出生日期'
        })
    })
    // 城市二级联动
    // 省级单位
    provinceBtnDom.addEventListener("click", function () {
        $http.get("/address/province", function (res) {
            let proList = res.data
            console.log(proList);
            let arr = proList.map(function (item, index) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            console.log(arr);
            //生成 picker 
            weui.picker(arr, {
                onConfirm: function (result) {
                    console.log('确认值');
                    console.log(result[0].label);
                    proVal.textContent = result[0].label;
                    pid = result[0].value;
                    $http.get("/address/city/" + pid, function (res) {
                        console.log(res);
                        let cityList = res.data;
                        console.log(cityList);
                        cityVal.textContent = res.data[0].name;
                        arr = cityList.map(function (item, value) {
                            return { label: item.name }
                        })
                    })
                },
                title: '省份'
            });
        })

    })
    // 市级单位
    cityBtnDom.addEventListener("click", function () {
        // 判断pid的值是否存在
        if (!pid) {
            utils.createToast("icon-cuowu", "请先输入省份");
            return
        }
        $http.get("/address/city/" + pid, function (res) {
            console.log(res);
            let cityList = res.data;
            let arr = cityList.map(function (item, index) {
                return {
                    label: item.name,
                    value: item.addressId
                }
            })
            console.log(arr);
            //生成 picker 
            weui.picker(arr, {
                onConfirm: function (result) {
                    console.log(result);
                    console.log('确认值');
                    console.log(result[0].label);
                    cityVal.textContent = result[0].label;
                },
                title: '城市'
            });
        })
    })
    // 点击事件，保存信息
    btn.addEventListener("click", function () {
        console.log(params);
        params.nickname = nicknameDom.value;
        params.gender = genderVal.textContent;
        params.birthday = birthdayValDom.textContent;
        params.address[0] = proVal.textContent;
        params.address[1] = cityVal.textContent;
        params.sign = signVal.value;
        console.log(params);
        // 发生请求，上传数据
        $http.post("/users/userEdit", params, function (res) {
            console.log(res);
            if (res.status == 0) {
                utils.createToast("icon-xuanze-", "修改成功");
                setTimeout(function () {
                    location.href = './my.html'
                }, 1000)
            }
            else {
                utils.createToast("icon-cuowu", "修改失败");
            }
        })
    })




    // 城市二级联动优化
    // provinceBtnDom.addEventListener("click", function () {
    //     $http.get("/address/province", function (res) {
    //         let proList = res.data
    //         console.log(proList);
    //         let arr = proList.map(function (item, index) {
    //             return {
    //                 label: item.name,
    //                 value: item.addressId
    //             }
    //         })
    //         console.log(arr);
    //         //生成 picker 
    //         weui.picker(arr, {
    //             onConfirm: function (result) {
    //                 console.log('确认值');
    //                 console.log(result[0].label);
    //                 document.querySelector("#proVal").textContent = result[0].label;
    //                 pid = result[0].value;
    //                 // 发送城市请求，获取城市
    //                 $http.get("/address/city/" + pid, function (res) {
    //                     console.log(res);
    //                     let cityList = res.data;
    //                     console.log(cityList);
    //                     document.querySelector("#cityVal").textContent = res.data[0].name;
    //                     cityArr = cityList.map(function (item, value) {
    //                         return { label: item.name }
    //                     })
    //                 })
    //             },
    //             title: '省份'
    //         });
    //     })

    // })


    // cityBtnDom.addEventListener("click", function () {
    //     //生成 picker 
    //     weui.picker(cityArr, {
    //         onConfirm: function (result) {
    //             console.log(result);
    //             console.log('确认值');
    //             console.log(result[0].value);
    //             document.querySelector('#genderVal').textContent = result[0].value;
    //         },
    //         title: '城市'
    //     });
    // })






})