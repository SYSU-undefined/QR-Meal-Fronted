<template>
  <div class="custom-form-control">
      <b-container fluid class="container">
        <b-row class="form-row">
        <b-form-input v-model="form.username"
                  type="text"
                  placeholder="请输入用户名"></b-form-input>

        </b-row>
                <b-row class="form-row">
        <b-form-input v-model="form.password"
                  type="password"
                  placeholder="请输入密码"></b-form-input>

        </b-row>
        <b-row  class="form-row">
        <b-button class="custom-btn" variant="primary" @click="()=>onSubmit()">登录</b-button>
        </b-row>
        <b-row  class="form-row">
        <b-button class="custom-btn" variant="warning" @click="showInfo()">成为进驻商家</b-button>
        </b-row>
      </b-container>
  </div>
</template>

<style scoped>
.custom-form-control {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
.custom-btn {
    width: 100%;
}
.container {
    background-color: #ffffff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    max-width: 300px;
}
.form-row {
    margin-bottom: 15px;
}
.form-row:nth-of-type(1) {
    margin-top: 20px;
}
</style>

<script>
export default {
  data() {
      return {
          form : {
              username : null,
              password: null
          }
      }
  },
  methods : {
    onSubmit () {
        this.axios.post('/api/auth', this.form).then((res)=>{
            if (res.status == 200) {
                console.log(res);
                this.$router.push({path:'/food'});
                this.$cookies.set('loginSuccess', true);
                this.$cookies.set('rid', res.data.data.restaurant_id)
                console.log(res.data.data.restaurant_id);
            } else {
                alert("Wrong Password/Username");
            }
        })
    },
    showInfo() {
        alert('请联系: xxxxxxxx or mailto: xxxx@xx.com');
    }
  }
}
</script>


