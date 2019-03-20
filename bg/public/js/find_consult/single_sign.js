/**
 * Created by licong on 2017/9/6.
 */
$(function () {
     // 获取账户信息
     Qnzs.getSessionAccount({}).then(function (data) {
     	
          if(data.status != 'OK') { // 用户没有登录
               $.alert(data.msg);
               return;
          }

          // 用户已登录
          account_common = data.account; // 账户信息
          if(!account_common.mobile) {
               $.alert('用户名不能为空');
               return;
          }
        
          window.open('http://ledger.12355.net:8081/youngLogin?userName=' + account_common.mobile);
     });
});