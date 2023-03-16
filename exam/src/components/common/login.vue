<!-- 用户登录界面 -->
<template>
  <div id="login">
    <div class="bg"></div>
    <el-row class="main-container">
      <el-col :lg="8" :xs="16" :md="10" :span="10">
        <div class="top">
          <i class="iconfont icon-kaoshi"></i><span class="title">在线考试系统</span>
        </div>
        <div class="bottom">
          <div class="container">
            <p class="title">账号登录</p>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :rules="rules"
                     ref="loginForm">
              <el-form-item label="用户名" prop="username">
                <el-input v-model.number="formLabelAlign.username" placeholder="请输入用户名" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input v-model="formLabelAlign.password" placeholder="请输入密码" type='password'
                          autocomplete="off"></el-input>
              </el-form-item>
              <div class="submit">
                <el-button type="primary" class="row-login" @click="login()">登录</el-button>
              </div>
              <!-- <div class="options">
                <p class="find">
                  <router-link to="">找回密码</router-link>
                </p>
                <div class="register">
                  <span>没有账号?</span>
                  <span>
                    <router-link to="register">去注册 </router-link>
                  </span>
                </div>
              </div>-->
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="footer">
      <el-col>
        <p class="msg2">版权所有 ©2020 保留所有权利 渝ICP备19001371号</p>
      </el-col>
    </el-row>
    <!-- <section class="remind">
       <span>管理员账号：20169527</span>
       <span>教师账号：20081001</span>
       <span>密码都是：123456</span>
     </section>-->

  </div>
</template>

<script>
  import store from '@/vuex/store'
  import {mapState} from 'vuex'
  import {validatePass, stripscript, validateUser} from '@/utils/validate'

  export default {
    store,
    name: "login",
    data() {
      let validateUsername = (rule, value, callback) => {
        // this.formLabelAlign.username = stripscript(value);
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if (validateUser(value)) {
          return callback(new Error('用户名格式有误'));
        } else {
          callback();
        }
      };
      let validatePassward = (rule, value, callback) => {
        this.formLabelAlign.password = stripscript(value);
        console.log(this.formLabelAlign.password)
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (validatePass(value)) {
          callback(new Error('密码为6至20位数字或字母'));
        } else {
          callback();
        }
      };
      return {
        role: 2,
        labelPosition: 'left',
        formLabelAlign: {
          //20164084
          //123456
          username: '19970408',
          // username:'20164084',
          password: '123456'

          // username: '',
          // password: ''
        },
        rules:
          {
            username:
              [{validator: validateUsername, trigger: 'blur'}],
            password:
              [{validator: validatePassward, trigger: 'blur'}]
          }
      }
    },
    methods: {
      //用户登录请求后台处理
      login() {
        const _this = this;
        console.log("登录操作执行-------");
        _this.$axios({
          method: 'post',
          url: `/api/login`,
          data: {
            //对象展开运算符
            ..._this.formLabelAlign

          }
        }).then(function (resp) {
          let resData = resp.data.data
          console.log(resp.data.data)
          if (resData != null) {
            switch (resData.role) {
              case "0":  //管理员
                _this.$cookies.set("cname", resData.adminName)
                _this.$cookies.set("cid", resData.adminId)
                _this.$cookies.set("role", 0)
                _this.$router.push({path: '/admin'}) //跳转到首页==老师管理页面
                break
              case "1": //教师
                _this.$cookies.set("cname", resData.teacherName)
                _this.$cookies.set("cid", resData.teacherId)
                _this.$cookies.set("role", 1)
                _this.$router.push({path: '/index'}) //跳转到教师用户
                break
              case "2": //学生
                _this.$cookies.set("cname", resData.studentName)
                _this.$cookies.set("cid", resData.studentId)
                _this.$cookies.set("role", 2)
                _this.$router.push({path: '/student'})
                break
            }
          } else { //错误提示
            _this.$message({
              showClose: true,
              type: 'error',
              message: '用户名或者密码错误'
            })
          }
        })
      },
      /*clickTag(key) {
        this.role = key
      }*/
    },
    computed: mapState(["userInfo"]),
    /*mounted() {
    }*/
  }
</script>

<style lang="scss" scoped>
  .remind {
    border-radius: 4px;
    padding: 10px 20px;
    display: flex;
    position: fixed;
    right: 20px;
    bottom: 50%;
    flex-direction: column;
    color: #606266;
    background-color: #fff;
    border-left: 4px solid #409eff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
  }

  .container {
    margin-bottom: 32px;
  }

  .container .el-radio-group {
    margin: 30px 0px;
  }

  a:link {
    color: #ff962a;
    text-decoration: none;
  }

  #login {
    font-size: 14px;
    color: #000;
    background-color: #fff;
  }

  #login .bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow-y: auto;
    height: 100%;
    background: url('../../assets/img/log.jpg') center top / cover no-repeat;
    background-color: #b6bccdd1 !important;
  }

  #login .main-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #login .main-container .top {
    margin-top: 100px;
    font-size: 30px;
    color: #ff962a;
    display: flex;
    justify-content: center;
  }

  #login .top .icon-kaoshi {
    font-size: 80px;
  }

  #login .top .title {
    margin-top: 20px;
  }

  #login .bottom {
    display: flex;
    justify-content: center;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  #login .bottom .title {
    text-align: center;
    font-size: 30px;
  }

  .bottom .container .title {
    margin: 30px 0px;;
  }

  .bottom .submit .row-login {
    width: 100%;
    background-color: #04468b;
    border-color: #04468b;
    margin: 20px 0px 10px 0px;
    padding: 15px 20px;
  }

  .bottom .submit {
    display: flex;
    justify-content: center;
  }

  .footer {
    margin-top: 50px;
    text-align: center;
  }

  .footer .msg1 {
    font-size: 18px;
    color: #fff;
    margin-bottom: 15px;
  }

  .footer .msg2 {
    font-size: 14px;
    color: #e3e3e3;
    margin-top: 70px;
  }

  .bottom .options {
    margin-bottom: 40px;
    color: #ff962a;
    display: flex;
    justify-content: space-between;
  }

  .bottom .options > a {
    color: #ff962a;
  }

  .bottom .options .register span:nth-child(1) {
    color: #8C8C8C;
  }
</style>
