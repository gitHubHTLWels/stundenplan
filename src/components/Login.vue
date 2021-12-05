<template>
  <div class="container">
    <Form class="formwrapper" @submit="processLogin">
      <div class="formTitle">
        <h2>HTL-Wels/AHIT5</h2>
      </div>
      <div class="form-element">
        <font-awesome-icon
          :icon="['fas', 'user']"
          class="fa-1x cent"
          color="gray"
        />

        <Field
          name="email"
          type="email"
          v-model="authorize.email"
          placeholder="User"
          :rules="validateEmail"
          autofocus
        />
      </div>
      <ErrorMessage name="email" />
      <span
        role="alert"
        v-if="errorMessage.length && errorMessage.startsWith('User')"
      >
        {{ errorMessage }}
      </span>
      <div class="form-element">
        <font-awesome-icon
          :icon="['fas', 'lock']"
          class="fa-x cent"
          color="gray"
        />

        <Field
          name="password"
          type="password"
          v-model="authorize.password"
          placeholder="Password"
          :rules="validatePassword"
        />
      </div>
      <ErrorMessage name="password" />
      <span
        role="alert"
        v-if="errorMessage.length && errorMessage.startsWith('Password')"
      >
        {{ errorMessage }}
      </span>
      <div class="form-password">
        <a href="">Passwort vergessen ?</a>
      </div>

      <div class="form-element">
        <input class="btn" type="submit" value="Login" />
      </div>
    </Form>
  </div>
</template>



<script>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  props: {
    serverURL: {
      type: String,
      required: true,
    },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup(props, context) {
    // let login = ref({
    //   name: '',
    //   password: '',
    // });

    let authorize = ref({
      email: '',
      password: '',
    });
    let errorMessage = ref('');

    function processLogin() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: authorize.value.email,
          password: authorize.value.password,
        }),
      };
      console.log('Fetching data ... ' + props.serverURL);
      fetch(props.serverURL, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.userExist == false) {
            errorMessage.value = `User: ${authorize.value.email} not found!`;
          } else if (data.allowed == false) {
            errorMessage.value = 'Password: Wrong password!';
          } else {
            context.emit('loginDone', authorize.value);
            console.log(data);
          }
        })
        .catch((err) => {
          console.log('Error occured ...' + err);
          errorMessage.value =
            'Communication error occured in processing authority';
        });
    }

    // function processLogin(values) {
    //   let url = `http://${props.serverURL}?email=${authorize.value.email}&password=${authorize.value.password}`;
    //   fetch(url /*, { headers }*/)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data.userExist == false) {
    //         errorMessage.value = `User: ${authorize.value.email} not found!`;
    //       } else if (data.allowed == false) {
    //         errorMessage.value = 'Password: Wrong password!';
    //       } else {
    //         context.emit('loginDone', authorize.value);
    //       }
    //       console.log(data);
    //     })
    //     .catch((err) => {
    //       console.log('Error occured ...' + err);
    //       errorMessage.value =
    //         'Communication error occured in processing authority';
    //     });
    // }

    function validateEmail(value) {
      if (!value) return 'Field cannot be empty';
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'This field must be a valid email';
      }

      // All is good
      return true;
    }
    function validatePassword(value) {
      if (!value) return 'Field cannot be empty';
      if (value.length < 3) return 'At le.ast 3 characters are required';
      return true;
    }

    return {
      authorize,
      validateEmail,
      validatePassword,
      processLogin,
      errorMessage,
    };
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  display: flex;
  justify-content: center;

  gap: 40px;
}

.flex-item {
  background: red;
  border-radius: 3%;
}

.formwrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: lightgoldenrodyellow;
  margin-top: 40px;
  padding: 50px 150px;
}
.formTitle h2 {
  text-align: center;
  color: blue;
  font-size: 1.8rem;
}
.form-base {
  margin: 2%;
}
.form-base,
.form-element {
  display: inline-flex;
  margin: 2%;
}

.form-base,
.form-password {
  margin: 2%;
}

img {
  height: 20px;
  color: #5b5b5b;
}
.user {
  margin-right: 5px;
}

.form-element input {
  height: 45px;
  width: 320px;
  border: 1px solid #d6d6d6;
  border-radius: 2%;
  font-size: 20px;
  padding-left: 5%;
}
input:focus {
  outline-style: none;
}
input::placeholder {
  color: black;
  font-size: 20px;
}
.form-element input::hover {
  background: white;
}

.form-element .btn {
  width: 150px;
  border: none;
  background: blue;
  border-radius: 3%;
  color: #eee;
  font-weight: bold;
  cursor: pointer;
  font-size: 1em;
  transition: all ease 0.5s;
}

.form-element .btn:hover {
  box-shadow: lightblue;
}

.form-element a {
  float: right;
  margin-top: 2%;
}

#design1 {
  display: none;
}

span[role='alert'] {
  background: red;
}
.hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
.cent {
  margin-top: 15px;
  margin-right: 5px;
}
</style>
