<template>
    <div>
        <b-container>
            <img style="width: 100px;" src="~/assets/login_logo.png" alt />

            <div class="login">
                <b-form @submit="doLogin">
                    <b-form-group id="user" label="Usuário" label-for="user-input"
                        description="Insira o seu nome de usuário (e-mail)." label-align="left">
                        <b-form-input id="user-input" v-model="login.username" type="text" required
                            placeholder="Nome de usuário"></b-form-input>
                    </b-form-group>

                    <b-form-group id="pwd" label="Senha" label-for="pwd-input" label-align="left"
                        description="Insira a sua senha.">
                        <b-form-input id="pwd-input" v-model="login.pwd" type="password" required
                            placeholder="Senha"></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="success">Entrar</b-button>
                </b-form>
            </div>
        </b-container>
    </div>
</template>

<style>
    body{
        background-color: rgba(0, 0, 0, .9);
    }
</style>

<script>
export default {
    name: "Login",

    data() {
        return {
            login: {
                // username: "",
                // pwd: "",
                username: "stromus",
                pwd: "123abc",
            },
        };
    },

    methods: {
        doLogin(event) {
            event.preventDefault();

            this.$axios
                .post("http://localhost:5000/login", this.login)
                .then((response) => {
                    console.log(response.data);
                    console.log(response);
                    this.$router.push("/main");
                })
                .catch((error) => {
                    console.error("Não foi possível realizar o Login");
                    console.error(error);
                });
        },
    },
}
</script>

<style>
    @import '../static/login.css';
</style>
