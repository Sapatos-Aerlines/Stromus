<template>
  <div>
    <script src="https://kit.fontawesome.com/6c1b2d82eb.js" crossorigin="anonymous"></script>
    
    <!-- Navegação -->
    <b-navbar id="painel_infos">
      <h1 id="stromus_title">Stromus</h1>

      <div id="buttons_nav">
        <b-navbar-nav>
          
          <!-- Button Inicio -->
          <b-nav-item class='icons_nav_menu_lateral'
            @click="
              inicioView = true
              artistaView = false
              albumView = false
              musicaView = false
              curtidaView = false
            ">
            <h2><em class="icons_nav fas fa-chess-queen"></em>Inicio</h2>
          </b-nav-item>
          
          <!-- Button Artistas -->
          <b-nav-item class='icons_nav_menu_lateral'
            @click="
              inicioView = false
              artistaView = true
              albumView = false
              musicaView = false
              curtidaView = false
            ">
            <h2><em class="icons_nav fas fa-user-astronaut"></em>Artistas</h2>
          </b-nav-item>

          <!-- Button Álbuns -->
          <b-nav-item class='icons_nav_menu_lateral'
            @click="
              inicioView = false
              artistaView = false
              albumView = true
              musicaView = false
              curtidaView = false
            ">
            <h2><em class="icons_nav fas fa-book"></em>Álbuns</h2>
          </b-nav-item>

          <!-- Button Músicas -->
          <b-nav-item class='icons_nav_menu_lateral'
            @click="
              inicioView = false
              artistaView = false
              albumView = false
              musicaView = true
              curtidaView = false
            ">
            <h2><em class="icons_nav fas fa-music"></em>Músicas</h2>
          </b-nav-item>

          <!-- Button Curtidas -->
          <b-nav-item class='icons_nav_menu_lateral'
            @click="
              inicioView = false
              artistaView = false
              albumView = false
              musicaView = false
              curtidaView = true
            ">
            <h2><em class="icons_nav fas fa-heart"></em>Curtidas</h2>
          </b-nav-item>
        </b-navbar-nav>
    </div>
  </b-navbar>

  <div id="playlist">
    <div id="configuracoes">
      <h1>Configurações</h1>

      <div id="palheta_cores">
        <h2>Palheta de cores</h2>

        <div id="cores_personalizadas"></div>
      </div>
    </div>

    <div id="faixas_pl"></div>
  </div>

  <div id="infos_faixa">
      <img id="capa_album" src="https://i.scdn.co/image/ab67616d0000b2734cf0b29eb06a92aa96acae64">

      <div class="player-display">
          <span id="nome_artista" style="text-shadow: 0px 0px 3px black !important;">C418</span><br>
          <span id="nome_faixa" style="text-shadow: 0px 0px 3px black !important; filter: drop-shadow(0px 0px 15px black);">Aria Math</span>
      </div>
  </div>

  <div class="jp-playlist-player">
        <div class="top-bar">
            <div class="container">
                <div class="player-controls">
                    <a href="#" class="icon_control" id="jplayer_repeat"><em class="icn_ctrl fa-2x fas fa-redo-alt icons_secundarios status_repeteco"></em></a>
                    <a href="#" class="icon_control" id="jplayer_anterior"><em class="icn_ctrl fa-2x fas fa-fast-backward"></em></a>
                    <a href="#" class="icon_control" id="jplayer_play"><em class="icn_ctrl fa-2x fas fa-play-circle"></em></a>
                    <a href="#" class="icon_control" id="jplayer_pause"><em class="icn_ctrl fa-2x fas fa-pause-circle"></em></a>
                    <a href="#" class="icon_control" id="jplayer_proximo"><em class="icn_ctrl fa-2x fas fa-fast-forward"></em></a>
                    <a href="#" class="icon_control" id="jplayer_random"><em class="icn_ctrl fa-2x fas fa-random icons_secundarios status_random"></em></a>
                </div>

                <div id="opcs_progress" class="player-timeline">
                    <a href="#"><div id="jplayer_tempo_execucao" style="float: left;">00:00</div></a>
                    <a href="#"><div id="barra_progresso" class="player-timeline-control" onclick="altera_tempo_tocado()"><div id="progress_bar"></div></div></a>
                    <a href="#"><div id="jplayer_tempo_total" style="float: right;">00:00</div></a>
                </div>

                <div class="volume_control">
                    <em class="fas fa-volume-down fa-2x" onclick="desliga_som()"></em>
                    <div id="jplayer_volume_bar" class="jp-volume-bar">
                        <div id="jplayer_volume_bar_value" class="jp-volume-bar-value"></div>
                    </div>
                </div>

                <em class="fa-2x fas fa-cog" id="btn_abrir_configuracoes"></em>

                <em class="fa-2x fas fa-arrow-left" id="btn_mostrar_playlist"></em>
            </div>
        </div>
    </div>

    <div id="fundo_capa"></div>
    
    <!-- Modal para inserir novo artista -->
    <b-modal id="modal-novo-artista" title="Novo Artista" hide-footer>
      <b-overlay :show="show" rounded="sm">
        <b-form v-on:submit="createNewArtista">
          <label class="mr-sm-2" for="input_nome_artista">Nome do artista:</label>
          <b-form-input
            id="input_nome_artista"
            v-model="novoArtista.nome"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: Banda Djavú"
          ></b-form-input>

          <label class="mr-sm-2" for="input-responsavel">Seguidores:</label>
          <b-form-input
            v-model="novoArtista.seguidores"
            id="input-responsavel"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Seguidores"
          ></b-form-input>

          <label class="mr-sm-2" for="input-responsavel">URL da foto:</label>
          <b-form-input
            v-model="novoArtista.foto"
            id="input-responsavel"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Foto do artista"
          ></b-form-input>
          
          <br>

          <b-button type="submit" variant="primary" @click="show = !show">Registrar</b-button>
          <b-button type="reset" variant="danger">Limpar formulário</b-button>
        </b-form>
      </b-overlay>
    </b-modal>
    
    <!-- Modal para inserir novo album -->
    <b-modal id="modal-novo-album" title="Novo Álbum" hide-footer>
      <b-overlay :show="show" rounded="sm">
        <b-form v-on:submit="createNewAlbum">
          <label class="mr-sm-2" for="input_nome_album">Nome do álbum:</label>
          <b-form-input
            id="input_nome_album"
            v-model="novoAlbum.nome"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: The Singles: 86-98"
          ></b-form-input>

          <label class="mr-sm-2" for="input_ano_lancamento">Ano de lançamento:</label>
          <b-form-input
            id="input_ano_lancamento"
            v-model="novoAlbum.anoLancamento"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: 2022"
          ></b-form-input>

          <label class="mr-sm-2" for="input_artista">Artista:</label>
          <b-form-input
            v-model="novoAlbum.artista"
            id="input_artista"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Artista"
          ></b-form-input>

          <label class="mr-sm-2" for="input_url_capa">URL da capa:</label>
          <b-form-input
            v-model="novoAlbum.capa"
            id="input_url_capa"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Capa do álbum"
          ></b-form-input>
          
          <br>
          <b-button type="submit" variant="primary" @click="show = !show">Registrar</b-button>
          <b-button type="reset" variant="danger">Limpar formulário</b-button>
        </b-form>
      </b-overlay>
    </b-modal>

    <!-- Modal para inserir uma nova música -->
    <b-modal id="modal-nova-musica" title="Nova Música" hide-footer>
      <b-overlay :show="show" rounded="sm">
        <b-form v-on:submit="createNewMusica">
          <label class="mr-sm-2" for="input_nome_musica">Nome da música:</label>
          <b-form-input
            id="input_nome_musica"
            v-model="novaMusica.nome"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: Circles"
          ></b-form-input>

          <label class="mr-sm-2" for="input_artista">Artista:</label>
          <b-form-input
            v-model="novaMusica.artista"
            id="input_artista"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Artista"
          ></b-form-input>

          <label class="mr-sm-2" for="input_tipo">Estilo da música:</label>
          <b-form-input
            v-model="novaMusica.estilo"
            id="input_tipo"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Estilo"
          ></b-form-input>
          
          <br>
          <b-button type="submit" variant="primary" @click="show = !show">Registrar</b-button>
          <b-button type="reset" variant="danger">Limpar formulário</b-button>
        </b-form>
      </b-overlay>
    </b-modal>

    <div id="bg_stromus">
      <div class="invent-cards" v-if="inicioView">        
          <div id="pagina_inicial">
            <h1 class="titulo_pag" id="time_set"></h1>
            <div id="play_recomendados"></div>
        </div>
      </div>

      <!-- Tabela de artistas -->
      <div class="invent-table" v-if="artistaView" id="lista_artistas">

        <div class="barra_topo_opcoes">
          <b-button v-b-modal.modal-novo-artista variant="dark" class="btn_add">Adicionar um artista</b-button>

          <b-nav-form class="input_pesquisa">
            <b-form-input
              size="sm"
              v-model="artistaSearch"
              class="input_pesquisa_tam"
              placeholder="Pesquisar"
            ></b-form-input>
          </b-nav-form>
        </div>

        <b-table id="items-table" borderless thead-class="d-none" fixed
                :per-page="perPage" 
                :current-page="currentPage" 
                v-bind:items="filterSearchArtista">
              
              <template #cell(id)="cellData">
                <h1 class='campo_hidden'>{{cellData.item.id}}</h1>
              </template>

              <template #cell(foto)="cellData">
                  <img class="foto_artista" v-bind:src="cellData.item.foto">
              </template>

              <template #cell(nome)="cellData">
                  <h1 class='nome_artista'>{{cellData.item.nome}}</h1>
                  <b-button class='btn_remover' v-on:click="removeSelectedArtista(cellData.item.nome)">Remover</b-button>
              </template>

              <template #cell(seguidores)="cellData">
                  <p class='seguidores_artista'>{{cellData.item.seguidores}} seguidores</p>
              </template>
        </b-table>
      </div>

      <!-- Tabela de álbuns -->
      <div class="invent-table" v-if="albumView" id="lista_albuns">

        <div class="barra_topo_opcoes">
          <b-button v-b-modal.modal-novo-album variant="dark" class="btn_add">Adicionar um álbum</b-button>

          <b-nav-form class="input_pesquisa">
            <b-form-input
              size="sm"
              v-model="artistaSearch"
              class="input_pesquisa_tam"
              placeholder="Pesquisar"
            ></b-form-input>
          </b-nav-form>
        </div>

        <b-table id="items-table" borderless thead-class="d-none" fixed
                :per-page="perPage" 
                :current-page="currentPage" 
                v-bind:items="filterSearchAlbum">
              
              <template #cell(id)="cellData">
                <h1 class='campo_hidden'>{{cellData.item.id}}</h1>
              </template>

              <template #cell(foto)="cellData">
                  <img class="capa_album_lista" v-bind:src="cellData.item.foto">
              </template>

              <template #cell(dataLancamento)="cellData">
                <h3>{{cellData.item.dataLancamento}}</h3>
              </template>

              <template #cell(nome)="cellData">
                  <h1 class='nome_artista'>{{cellData.item.nome}}</h1>
                  <b-button class='btn_remover' v-on:click="removeSelectedAlbum(cellData.item.nome)">Remover</b-button>
              </template>
        </b-table>
      </div>

      <!-- Tabela de músicas -->
      <div class="invent-table" v-if="musicaView" id="lista_albuns">
        <div class="barra_topo_opcoes">
          <b-button v-b-modal.modal-nova-musica variant="dark" class="btn_add">Adicionar uma música</b-button>

          <b-nav-form class="input_pesquisa">
            <b-form-input
              size="sm"
              v-model="musicaSearch"
              class="input_pesquisa_tam"
              placeholder="Pesquisar"
            ></b-form-input>
          </b-nav-form>
        </div>

        <b-table id="items-table" borderless thead-class="d-none" fixed
                :per-page="perPage" 
                :current-page="currentPage" 
                v-bind:items="filterSearchMusica">
              
              <template #cell(id)="cellData">
                <h1 class='campo_hidden'>{{cellData.item.id}}</h1>
              </template>

              <template #cell(foto)="cellData">
                  <img class="capa_album_lista" v-bind:src="cellData.item.foto">
              </template>

              <template #cell(nome)="cellData">
                  <h1 class='nome_artista'>{{cellData.item.nome}}</h1>
                  <b-button class='btn_remover' v-on:click="removeSelectedMusica(cellData.item.nome)">Remover</b-button>
              </template>
        </b-table>
      </div>

      <!-- Tabela de músicas curtidas -->
      <div class="invent-table" v-if="curtidaView" id="lista_albuns">
        <div class="barra_topo_opcoes">

          <b-nav-form class="input_pesquisa">
            <b-form-input
              size="sm"
              v-model="artistaSearch"
              class="input_pesquisa_tam"
              placeholder="Pesquisar"
            ></b-form-input>
          </b-nav-form>
        </div>

        <h1 class="titulo_pag musicas_curtidas">Suas músicas curtidas <em class="icons_nav fas fa-heart"></em></h1>
        <div id="lista_faixas_curtidas"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import CardArtista from '../components/CardArtista.vue'

  export default {
    //Executado quando a instância do Vue estiver construída
    async asyncData({ $axios }) {
      let artistas, albuns, musicas, totalRows;

      try {
        const response = await $axios.$get('artista');
        artistas = response;
        
        totalRows = artistas.length;
      } catch (ex) {
        console.log(ex);
      } 

      try {
        const response = await $axios.$get('album');
        albuns = response;
      } catch (ex) {
        console.log(ex);
      }

      try {
        const response = await $axios.$get('musica');
        musicas = response;
      } catch (ex) {
        console.log(ex);
      }
 
      return { artistas, albuns, musicas, totalRows }
    },
    components: { CardArtista },
    name: 'IndexPage',
    data: function () {
        return {                
          show: false,
          inicioView: true,
          albumView: false,
          artistaView: false,
          musicaView: false,
          curtidaView: false,

          artistaSearch: "",
          currentPage: 1,
          totalRows: 0,
          perPage: 50,
          url: '',
          
          artistas: [],
          albuns: [],
          musicas: [],

          novoArtista: {
            foto: null,
            nome: null,
            seguidores: null
          },
          novoAlbum : {
            capa : null,
            nome : null,
            artista : null,
            anoLancamento : null
          },
          novaMusica : {
            artista : null,
            nome : null,
            estilo : null,
            duracao : null
          }
      };
    },

    methods: {
      createNewArtista: function (event) {
        event.preventDefault();

        // Veja mais sobre em https://axios.nuxtjs.org/usage
        this.$axios
          .$post("artista", this.novoArtista)
          .then((response) => {
            console.log('Resposta do servidor obtida');
            // Acessa o objeto que controla os modais e esconde aquele que você passar o id.
            this.$bvModal.hide('modal-novo-artista');
            this.show = false;
            this.updateArtista();
          })
          .catch((error) => {
            console.error('Não foi possível criar um novo artista');
            console.log(error);
            this.$bvModal.hide('modal-novo-artista');
            this.show = false;
          });
      },

      updateArtista: function () {

        this.$axios.$get("artista").then((response) => {
          this.artistas = response;
          this.totalRows = this.artistas.length
        })
      },

      removeSelectedArtista: function (nome) {
        this.$axios.$delete(`artista/${nome}`).then((response) => {
          
          this.updateArtista();
        })
      },

    createNewAlbum: function (event) {
        event.preventDefault();
        
        this.$axios
          .$post("album", this.novoAlbum)
          .then((response) => {
            console.log('Resposta do servidor obtida');
            // Acessa o objeto que controla os modais e esconde aquele que você passar o id.
            this.$bvModal.hide('modal-novo-album');
            this.show = false;
            this.updateAlbum();
          })
          .catch((error) => {
            console.error('Não foi possível criar um novo album');
            console.log(error);
            this.$bvModal.hide('modal-novo-album');
            this.show = false;
          });
      },

      updateAlbum: function () {
        this.$axios.$get("album").then((response) => {
          this.albuns = response;
          this.totalRows = this.albuns.length
        })
      },

      removeSelectedAlbum: function (nome) {
        this.$axios.$delete(`album/${nome}`).then((response) => {
          
          this.updateAlbum();
        })      
      },

      createNewMusica: function (event) {
        event.preventDefault();

        this.$axios
          .$post("musica", this.novaMusica)
          .then((response) => {
            console.log('Resposta do servidor obtida');
            // Acessa o objeto que controla os modais e esconde aquele que você passar o id.
            this.$bvModal.hide('modal-nova-musica');
            this.show = false;
            this.updateMusica();
          })
          .catch((error) => {
            console.error('Não foi possível criar uma nova música');
            console.log(error);
            this.$bvModal.hide('modal-nova-musica');
            this.show = false;
          });
      },

      updateMusica: function () {
        this.$axios.$get("musica").then((response) => {
          this.albuns = response;
          this.totalRows = this.musicas.length;
        })
      },

      removeSelectedMusic: function (nome) {
        this.$axios.$delete(`musica/${nome}`).then((response) => {
          
          this.updateMusica();
        })      
      },
    },

    computed: {
      filterSearchArtista: function () {

        try{
          if(this.artistas.length > 0){
            if (this.artistaSearch.length > 0) {
              return this.artistas.filter((artista) => 
                artista.nome.toLowerCase().includes(this.artistaSearch.toLowerCase())
              )
            } else {
              return this.artistas;
            }
          }
        }catch(err){
          return console.log("Não há artistas registrados para pesquisar");
        }
      },
      filterSearchAlbum: function () {
        try{
          if(this.albuns.length > 0){
            if (this.artistaSearch.length > 0) {
              return this.albuns.filter((album) => 
                album.nome.toLowerCase().includes(this.artistaSearch.toLowerCase())
              )
            } else {
              return this.albuns;
            }
          }
        }catch(err){
          return console.log("Não há álbuns registrados para pesquisar");
        }
      },
      filterSearchMusica: function () {
        try{
          if (this.artistaSearch.length > 0) {
            return this.musicas.filter((musica) => 
              musica.nome.toLowerCase().includes(this.artistaSearch.toLowerCase())
            )
          } else {
            return this.musicas;
          }
        }catch(err){
          return console.log("Não há músicas registradas para pesquisar");
        }
      }
    },
  }
</script>

<style scoped>
  @import '../static/style.css';
  @import '../static/responsividade.css';

    .invent-table {
        padding: 0 100px;
        margin: 0 auto;
    }

    .invent-cards {
        padding: 0px 100px;
        margin: 20px auto;
    }
</style>