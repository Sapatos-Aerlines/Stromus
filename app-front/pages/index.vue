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
              playListlateral = false
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

  <div id="playlist" v-if="playListlateral">
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

          <label class="mr-sm-2" for="input_ano_lancamento">Data de lançamento:</label>
          <b-form-datepicker id="input_ano_lancamento" v-model="novoAlbum.dataLancamento" class="mb-2"></b-form-datepicker>

          <label class="mr-sm-2" for="input_artista">Artista:</label>
          <b-form-select v-model="novoAlbum.idArtista">
            <option id="input_artista" v-for="artista in artistas" :value="artista.id" required>{{artista.nome}}</option>
          </b-form-select>

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
          <b-form-select v-model="novaMusica.idArtista">
            <option id="input_artista" v-for="artista in artistas" @change="lista_albuns_artista(novaMusica.idArtista)" :value="artista.id">{{artista.nome}}</option>
          </b-form-select>

          <label class="mr-sm-2" for="input_album">Álbum:</label>
          <b-form-select v-model="novaMusica.idAlbum">
            <option v-for="album in albuns" :value="album.id">{{album.nome}}</option>
          </b-form-select>

          <label class="mr-sm-2" for="input_duracao_musica">Duração:</label>
          <b-form-input
            id="input_duracao_musica"
            v-model="novaMusica.duracao"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: 02:30"
          ></b-form-input>

          <label class="mr-sm-2" for="input_tipo">Estilo da música:</label>
          <b-form-select
            id="input_tipo"
            v-bind:options="estilos_musica"
            v-model="novaMusica.estilo"
            v-bind:value="null"
          >
          </b-form-select>
          
          <br>
          <b-button type="submit" variant="primary" @click="show = !show">Registrar</b-button>
          <b-button type="reset" variant="danger">Limpar formulário</b-button>
        </b-form>
      </b-overlay>
    </b-modal>

    <div id="bg_stromus">
      <div class="invent-cards" v-if="inicioView">        
          <div id="pagina_inicial">
            <h1 class="titulo_pag" id="time_set">{{time_set_inicio}}</h1>
            <div id="play_recomendados">
              <h2>Álbuns recomendados</h2>
              <div v-for="(album, index) in albuns"  :key="album.id" v-if="albuns && albuns.length > 0 && index <= 2">
                <a href="#" class="album_inicio_recomendados">
                  <img class="img_album_recomendado" :src="album.capa" />
                  <h3>{{album.nome.length > 12 ? album.nome.slice(0, 12) +"..." : album.nome}}</h3>
                  <span>{{album.idArtista}}</span>
                </a>
              </div>
            </div>

            <div id="play_recomendados">
              <h2>Artistas recomendados</h2>
              <div v-for="(artista, index) in artistas" :key="artista.id" v-if="artistas && artistas.length > 0 && index <= 2">
                <a href="#" class="artista_inicio_recomendados">
                  <img class="img_artista_recomendado" :src="artista.foto" />
                  <h3>{{artista.nome.length > 12 ? artista.nome.slice(0, 12) +"..." : artista.nome}}</h3>
                  <span>Artista</span>
                </a>
              </div>
            </div>

            <div id="musicas_recomendadas">
              <h2>Músicas recomendadas</h2>
              <div v-for="(musica, index) in musicas" :key="musica.id" v-if="musicas && musicas.length > 0 && index <= 2">
                <a href="#" class="musica_inicio_recomendados">
                  
                  <hr>
                  <h4 style="float: left; min-width: 20px">{{index + 1}}</h4>

                  <a href="#" class="icon_control" id="jplayer_play"><em class="icn_ctrl fa-2x fas fa-play-circle"></em></a>
                  
                  <span class="nome_musica_list">{{musica.nome.length > 30 ? musica.nome.slice(0, 30) +"..." : musica.nome}}</span>

                  <span class="nome_artista_musica_list">{{busca_nome_artista(musica.idArtista)}}</span>
                  <span class="nome_album_musica_list">{{busca_nome_album(musica.idAlbum)}}</span>

                  <span class="tempo_musica_list">{{musica.duracao}}</span>
                </a>
              </div>
            </div>
        </div>
      </div>

      <!-- Tabela de artistas -->
      <div class="invent-table" v-if="artistaView" id="lista_artistas">

        <div class="barra_topo_opcoes">
          <b-button v-b-modal.modal-novo-artista @click="show = !show" variant="dark" class="btn_add">Adicionar um artista</b-button>

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

              <template #cell(foto)="cellData">
                  <img class="foto_artista" v-bind:src="cellData.item.foto">
              </template>

              <template #cell(nome)="cellData">
                  <h1 class='nome_artista'>{{cellData.item.nome}}</h1>
                  <b-button class='btn_remover' v-on:click="removeSelectedArtista(cellData.item.id)">Remover</b-button>
              </template>

              <template #cell(seguidores)="cellData">
                  <p class='seguidores_artista'>{{cellData.item.seguidores}} seguidores</p>
              </template>
        </b-table>
      </div>

      <!-- Tabela de álbuns -->
      <div class="invent-table" v-if="albumView" id="lista_albuns">

        <div class="barra_topo_opcoes">
          <b-button v-b-modal.modal-novo-album @click="show = !show" variant="dark" class="btn_add">Adicionar um álbum</b-button>

          <b-nav-form class="input_pesquisa">
            <b-form-input
              size="sm"
              v-model="artistaSearch"
              class="input_pesquisa_tam"
              placeholder="Pesquisar"
            ></b-form-input>
          </b-nav-form>
        </div>
        
        <div id="lista_biblioteca_pessoal">
          <div v-for="album in albuns">

            <a href="#" class="item_album_link">
              <img class="capa_album_lista" :src="album.capa" />
              <h3 class="nome_item_album_curtido">{{album.nome.length > 20 ? album.nome.slice(0, 20) +"..." : album.nome}}</h3>

              <!-- Local Temporário -->
              <b-button class='btn_remover' v-on:click="removeSelectedAlbum(album.id)">Remover</b-button>
            </a>
          </div>
        </div>
      </div>

      <!-- Tabela de músicas -->
      <div class="invent-table" v-if="musicaView" id="lista_albuns">
        <div class="barra_topo_opcoes">
          <b-button v-b-modal.modal-nova-musica @click="show = !show" variant="dark" class="btn_add">Adicionar uma música</b-button>

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
                v-bind:items="filterSearchMusica">
              
              <template #cell(nome)="cellData">
                  <h4 class='nome_artista'><a href="#" class="icon_control" id="jplayer_play"><em class="icn_ctrl fa-2x fas fa-play-circle"></em></a> {{cellData.item.nome}}</h4>
                  <b-button class='btn_remover' v-on:click="removeSelectedMusica(cellData.item.id)">Remover</b-button>
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
  export default {
    //Executado quando a instância do Vue estiver construída
    async asyncData({ $axios }) {
      let artistas, albuns, musicas, totalRows, time_set_inicio;

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

      let horario = new Date();
      time_set_inicio = horario.getHours() >= 12 && horario.getHours() < 18 ? "Boa tarde" : horario.getHours() >= 18 || horario.getHours() < 6 ? "Boa noite" : "Bom dia"

      return { artistas, albuns, musicas, totalRows, time_set_inicio }
    },

    name: 'IndexPage',
    data: function () {
      return {
        show: false,
        inicioView: true,
        albumView: false,
        artistaView: false,
        musicaView: false,
        curtidaView: false,

        time_set_inico: null,
        artistaSearch: "",
        currentPage: 1,
        totalRows: 0,
        perPage: 50,
        url: '',
        
        artistas: [],
        albuns: [],
        musicas: [],

        estilos_musica: [
          {text: "Escolha um:", value:null},
          "Pop",
          "Rock",
          "Eletrônica",
          "Blue",
          "Country",
          "Sertanejo",
          "Bossa nova"
        ],

        albuns_dinamic: [],
        limit: 3,

        novoArtista: {
          foto: null,
          nome: null,
          seguidores: null
        },
        novoAlbum : {
          capa : null,
          nome : null,
          idArtista : null,
          dataLancamento : null
        },
        novaMusica : {
          nome : null,
          estilo : null,
          idAlbum : null,
          duracao : null,
          idArtista : null
        }
      };
    },

    methods: {

      busca_nome_artista: function(id_artista){
        
        if(!id_artista) return 'Artista desconhecido';
        
        try{
          for(let i = 0; i < artistas.length; i++){

            if(artista[i].id == id_artista)
              return artista[i].nome;
          }
        }catch(err){
          return console.log("Não há artistas registrados");
        }
      },

      busca_nome_album: function(id_album){
        
        if(!id_album) return 'Álbum desconhecido';
        
        try{
          for(let i = 0; i < albuns.length; i++){

            if(album[i].id == id_album)
              return album[i].nome;
          }
        }catch(err){
          return console.log("Não há álbuns registrados");
        }
      },


      
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

      removeSelectedArtista: function (id) {
        this.$axios.$delete(`artista/${id}`).then((response) => {
          
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

      removeSelectedAlbum: function (id) {
        this.$axios.$delete(`album/${id}`).then((response) => {
          
          this.updateAlbum();
        })      
      },

      createNewMusica: function (event) {
        event.preventDefault();

        this.$axios
          .$post("musica", this.novaMusica)
          .then((response) => {
            console.log('Resposta do servidor obtida', response);
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
          this.musicas = response;
          this.totalRows = this.musicas.length;
        })
      },

      removeSelectedMusica: function (id) {
        this.$axios.$delete(`musica/${id}`).then((response) => {
          
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
  @import '../static/animations.css';
    .invent-table {
        padding: 0 100px;
        margin: 0 auto;
    }

    .invent-cards {
        padding: 0px 100px;
        margin: 20px auto;
    }
</style>