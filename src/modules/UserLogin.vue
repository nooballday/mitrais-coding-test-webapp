<template>
  <div class="m-user-login">
    <div class="m-user-login-form shadow p-3 bg-white rounded">
      <div class="title-signin">Signin</div>
      <hr />
      <b-form-group label="Email">
        <b-form-input></b-form-input>
      </b-form-group>
      <b-form-group label="Password">
        <b-form-input type="password"></b-form-input>
      </b-form-group>
      <b-link class="m-user-login-forgot-pass">Forgot password ? Click here</b-link>
      <b-button block variant="primary" style="margin-top:20px">Signin</b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserLogin"
};
</script>
<style>
.m-user-login {
  display: flex;
  flex-flow: row-reverse;
  align-items: center;
  height: 100vh;
}

.title-signin {
  font-size: 25px;
}

.m-user-login-form {
  width: 30vw;
  margin: 2vw;
}

@media screen and (max-width: 720px) {
  .m-user-login-form {
    width: 95vw;
  }
}
</style>