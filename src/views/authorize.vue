<template>
  <div>工号: {{ userNo }}</div>
</template>

<script>
/**
 * 引入资源
 */
import { getAccessToken, getLoginData, getUserData } from "../lark.service";
import { mapGetters } from "vuex";

export default {
  name: "authorize",
  data: () => ({
    userNo: undefined,
  }),
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(["getAppId", "getRedirectUri", "getAppSecret", "getHeaders"]),
  },
  created() {
    this.checkUrlParam();
  },
  methods: {
    /**
     * 检查参数
     */
    checkUrlParam: function () {
      // 获取授权码
      let code = this.$route.query.code;
      if (code == undefined) {
        this.jumpVerifyID();
      } else {
        // 请求应用token
        getAccessToken(
          this.URL.APP_ACCESS_TOKEN_URL,
          {
            app_id: this.getAppId,
            app_secret: this.getAppSecret,
          },
          this.getHeaders
        ).then((res1) => {
          // 判断返回值是否正常
          if (res1.data.code == 0) {
            // 获取登录用户的数据
            getLoginData(
              this.URL.GET_LOGIN_URL,
              {
                grant_type: "authorization_code",
                code,
              },
              {
                Authorization: "Bearer " + res1.data.app_access_token,
                "Content-Type": "application/json; charset=utf-8",
              }
            ).then((res2) => {
              if (res2.data.code == 0) {
                // 获取用户的详细数据
                getUserData(
                  this.URL.USER_URL + res2.data.data.user_id,
                  {
                    user_id_type: "user_id",
                  },
                  {
                    Authorization: "Bearer " + res1.data.app_access_token,
                    "Content-Type": "application/json; charset=utf-8",
                  }
                ).then((res3) => {
                  console.log(res3);
                  this.userNo = res3.data.data.user.employee_no;
                });
              } else {
                this.$message.error(
                  "系统发生错误，请联系管理员，错误代码: " + res2.data.msg
                );
                window.location.href = "http://127.0.0.1:3000";
              }
            });
          } else {
            this.$message.error(
              "飞书应用访问凭证获取错误，请联系管理员，错误代码: " +
                res1.data.msg
            );
          }
        });
      }
    },
    /**
     * 跳转授权页面
     */
    jumpVerifyID: function () {
      window.location.href =
        this.URL.REQUEST_VERIFY_ID_URL +
        "?app_id=" +
        this.getAppId +
        "&redirect_uri=" +
        this.getRedirectUri;
    },
  },
};
</script>