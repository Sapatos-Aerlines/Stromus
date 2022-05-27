<template>
  <div>
    <script src="https://kit.fontawesome.com/6c1b2d82eb.js" crossorigin="anonymous"></script>
    
    <!-- Navegação -->
    <b-navbar id="painel_infos">
      <h1 id="stromus_title">Stromus</h1>

      <div id="buttons_nav">
        <b-navbar-nav>
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
      <img id="capa_album" src="https://m.media-amazon.com/images/I/71VApfdR6lL._AC_SX425_.jpg">

      <div class="player-display">
          <span id="nome_artista" style="text-shadow: 0px 0px 3px black !important;">Van Halen</span><br>
          <span id="nome_faixa" style="text-shadow: 0px 0px 3px black !important; filter: drop-shadow(0px 0px 15px black);">Jump</span>
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
          <label class="mr-sm-2" for="input-patrimonio">Nome do artista:</label>
          <b-form-input
            id="input-patrimonio"
            v-model="novoArtista.nome"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: Banda Dejavu"
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
          <b-button type="reset" variant="danger">Limpar</b-button>
        </b-form>
      </b-overlay>
    </b-modal>
    
    <!-- Modal para inserir novo album -->
    <b-modal id="modal-novo-album" title="Novo Álbum" hide-footer>
      <b-overlay :show="show" rounded="sm">
        <b-form v-on:submit="createNewArtista">
          <label class="mr-sm-2" for="input-patrimonio">Nome do álbum:</label>
          <b-form-input
            id="input-patrimonio"
            v-model="novoAlbum.nome"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: The Singles: 86-98"
          ></b-form-input>

          <label class="mr-sm-2" for="input-responsavel">Artista:</label>
          <b-form-input
            v-model="novoAlbum.proprietario"
            id="input-responsavel"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Proprietário"
          ></b-form-input>

          <label class="mr-sm-2" for="input-responsavel">URL da capa:</label>
          <b-form-input
            v-model="novoAlbum.capa"
            id="input-responsavel"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Capa do álbum"
          ></b-form-input>
          
          <br>
          <b-button type="submit" variant="primary" @click="show = !show">Registrar</b-button>
          <b-button type="reset" variant="danger">Limpar</b-button>
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
              placeholder="Buscar artista"
            ></b-form-input>
          </b-nav-form>
        </div>

        <b-table id="items-table" borderless thead-class="d-none" fixed
                :per-page="perPage" 
                :current-page="currentPage" 
                v-bind:items="filterSearch">
              
              <template #cell(id)="cellData">
                <h1 class='campo_hidden'>{{cellData.item.id}}</h1>
              </template>

              <template #cell(foto)="cellData">
                  <img class="foto_artista" v-bind:src="cellData.item.foto">
              </template>

              <template #cell(nome)="cellData">
                  <h1 class='nome_artista'>{{cellData.item.nome}}</h1>
                  <b-button v-on:click="removeSelectedArtista(cellData.item.nome)">Excluir artista</b-button>
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
              placeholder="Buscar álbum"
            ></b-form-input>
          </b-nav-form>
        </div>

        <b-table id="items-table" borderless thead-class="d-none" fixed
                :per-page="perPage" 
                :current-page="currentPage" 
                v-bind:items="filterSearch">
              
              <template #cell(id)="cellData">
                <h1 class='campo_hidden'>{{cellData.item.id}}</h1>
              </template>

              <template #cell(foto)="cellData">
                  <img class="capa_album_lista" v-bind:src="cellData.item.foto">
              </template>

              <template #cell(nome)="cellData">
                  <h1 class='nome_artista'>{{cellData.item.nome}}</h1>
                  <b-button v-on:click="removeSelectedArtista(cellData.item.nome)">Excluir álbum</b-button>
              </template>
        </b-table>
      </div>

      <!-- Tabela de albúns -->
      <div class="invent-table" v-if="musicaView" id="lista_albuns"></div>
      
      <!-- Tabela de albúns -->
      <div class="invent-table" v-if="curtidaView" id="lista_albuns">
        <h1 class="titulo_pag musicas_curtidas">Suas músicas curtidas</h1>
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
    let artistas, totalRows;
    try {
      const response = await $axios.$get('artista');
      artistas = response;
      
      totalRows = artistas.length;
    } catch (ex) {
      console.log(ex);
    }

    return { artistas, totalRows }
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
        perPage: 5,
        url: '',
        artistas: [],
        albuns: [],
        novoArtista: {
          foto: null,
          nome: null,
          seguidores: 0
        },
        novoAlbum : {
          capa : null,
          nome : null,
          proprietario : null
        }
    };
  },

  methods: {
    createNewArtista: function (event) {
      event.preventDefault();
      console.log(JSON.stringify(this.novoArtista));
      // A instância do axios disponível no Nuxt.js é acessível
      // por this.$axios.
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
      // A instância do axios disponível no Nuxt.js é acessível
      // por this.$axios.
      // Veja mais sobre em https://axios.nuxtjs.org/usage
      this.$axios.$get("artista").then((response) => {
        this.artistas = response;
        this.totalRows = this.artistas.length

        console.log(this.artistas.length);
      })
    },

    removeSelectedArtista: function (nome) {
      // A instância do axios disponível no Nuxt.js é acessível
      // por this.$axios.
      // Veja mais sobre em https://axios.nuxtjs.org/usage
      this.$axios.$delete(`artista/${nome}`).then((response) => {
        
        this.updateArtista();
      })      
    },
  },

  computed: {
    filterSearch: function () {
      console.log("Termo de busca:"+ this.artistaSearch);

      if (this.artistaSearch.length > 0) {
        return this.artistas.filter((artista) => 
          artista.nome.toLowerCase().includes(this.artistaSearch.toLowerCase())
        )
      } else {
        return this.artistas
      }
    },
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
