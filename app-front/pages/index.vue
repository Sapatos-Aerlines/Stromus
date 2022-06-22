<template>
    <div>

        <div id="filtro_fundo">
            <div id="filtro_fundo_img"></div>
        </div>

        <b-container>
            <div class="login">
                <img style="width: 100px;" src="~/assets/login_logo.png" alt />

                <b-form @submit="doLogin">
                    <b-form-group id="user" label="Usuário" label-for="user-input" label-align="left">
                        <b-form-input id="user-input" v-model="login.username" type="text" required
                            placeholder="Nome de usuário"></b-form-input>
                    </b-form-group>

                    <b-form-group id="pwd" label="Senha" label-for="pwd-input" label-align="left">
                        <b-form-input id="pwd-input" v-model="login.pwd" type="password" required
                            placeholder="Senha"></b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="success">Entrar</b-button>
                </b-form>
            </div>
        </b-container>
    </div>
</template>

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
                    localStorage.setItem("token", response.data.token) // armazena o token do usuário
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
