<template>
  <div>
    <script src="https://kit.fontawesome.com/6c1b2d82eb.js" crossorigin="anonymous"></script>
    
    <!-- Player -->
    <div id="jquery_jplayer"><audio id="jqjp_audio_0" preload="none" src="#" style="opacity: 0"></audio></div>

    <div id="opcoes_fx"></div>

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
              playlistLateral = false
              painel_album = false
              painel_artista = false
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
              painel_album = false
              painel_artista = false
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
              painel_album = false
              painel_artista = false
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
              painel_album = false
              painel_artista = false
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
              painel_album = false
              painel_artista = false
            ">
            <h2><em class="icons_nav fas fa-heart"></em>Curtidas</h2>
          </b-nav-item>
        </b-navbar-nav>
    </div>
  </b-navbar>

  <div id="playlist" v-if="playlistLateral">
    <div id="configuracoes">
      <h1>Configurações</h1>

      <div id="palheta_cores">
        <h2>Palheta de cores</h2>

        <div id="cores_personalizadas"></div>
      </div>
    </div>

    <div id="faixas_pl" v-if="playlist_tocando.length > 0">

      <h1 id="playlist_name">{{busca_nome_album(playlist_tocando[0].idAlbum)}}</h1>
      <br>

      <div class="item_playlist" v-for="(musica, index) in playlist_tocando" :key="musica.id">
        <a href="#" @click="altera_faixa_atual(musica.id)">
          <span class="numero_faixa num_faixa_cr">{{index + 1}}</span>
          
          <img class="img_cover" :src="busca_capa_album(musica.idAlbum)" />

          <span class="nome_faixa_pl">{{musica.nome.length > 12 ? musica.nome.slice(0, 12) +"..." : musica.nome}}</span>
          <br>
          <span class="nome_artista_pl">{{busca_nome_artista(musica.idArtista)}}</span>
        </a>
        <br>
      </div>
    </div>
  </div>

  <div id="infos_faixa">
      <img id="capa_album" :src="musica_atual.capa_album">

      <div class="player-display">
          <span id="nome_artista" style="text-shadow: 0px 0px 3px black !important;">{{musica_atual.nome}}</span><br>
          <span id="nome_faixa" style="text-shadow: 0px 0px 3px black !important; filter: drop-shadow(0px 0px 15px black);">{{musica_atual.artista}}</span>
      </div>
  </div>

  <div class="jp-playlist-player">
        <div class="top-bar">
            <div class="container">
                <div class="player-controls">
                    <a href="#" class="icon_control" id="jplayer_repeat" @click="config_repeteco_alea(0)"><em class="icn_ctrl fa-2x fas fa-redo-alt icons_secundarios status_repeteco"></em></a>
                    <a href="#" class="icon_control" id="jplayer_anterior" @click="pular_faixa(0)"><em class="icn_ctrl fa-2x fas fa-fast-backward"></em></a>
                    <a href="#" class="icon_control" v-if="!player_tocando"><em class="icn_ctrl fa-2x fas fa-play-circle" @click="player_tocando = true 
                    tocar_musica()"></em></a>
                    <a href="#" class="icon_control" v-if="player_tocando" @click="player_tocando=false 
                    pausar_musica()"><em class="icn_ctrl fa-2x fas fa-pause-circle"></em></a>
                    <a href="#" class="icon_control" id="jplayer_proximo" @click="pular_faixa(1)"><em class="icn_ctrl fa-2x fas fa-fast-forward"></em></a>
                    <a href="#" class="icon_control" id="jplayer_random" @click="config_repeteco_alea(1)"><em class="icn_ctrl fa-2x fas fa-random icons_secundarios status_random"></em></a>
                </div>

                <div id="opcs_progress" class="player-timeline">
                    <a href="#"><div id="jplayer_tempo_execucao" style="float: left;">{{musica_atual.conv_tmp_tocado}}</div></a>
                    <a href="#"><div id="barra_progresso" class="player-timeline-control" @click="altera_tempo_tocado()"><div id="progress_bar"></div></div></a>
                    <a href="#" @click="opcao_reverso_tempo = !opcao_reverso_tempo"><div id="jplayer_tempo_total" style="float: right;">{{musica_atual.conv_tmp_duracao}}</div></a>
                </div>

                <div id="opcs_volume" class="volume_control">
                    <em class="fas fa-volume-down fa-2x"></em>
                    <div id="jplayer_volume_bar" class="jp-volume-bar" @click="altera_volume_musica()">
                        <div id="jplayer_volume_bar_value" class="jp-volume-bar-value"></div>
                    </div>
                </div>

                <em class="fa-2x fas fa-cog" id="btn_abrir_configuracoes"></em>

                <em class="fa-2x fas fa-arrow-left" id="btn_mostrar_playlist" @click="preview_lateral()"></em>
            </div>
        </div>
    </div>

    <div id="fundo_capa"></div>
    
    <!-- Modal para inserir novo artista -->
    <b-modal id="modal-artista" :title="titulo_prancheta" hide-footer>
      <b-overlay :show="prancheta_artista" rounded="sm">
        <b-form v-on:submit="modo_operantes">
          <label class="mr-sm-2" for="input_nome_artista">Nome do artista:</label>
          <b-form-input
            id="input_nome_artista"
            v-model="novoArtista.nome"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: Level 42"
            required
          ></b-form-input>

          <label class="mr-sm-2" for="input-responsavel">Seguidores:</label>
          <b-form-input
            v-model="novoArtista.seguidores"
            id="input-responsavel"
            class="mb-2 mr-sm-2 mb-sm-0"
            type="Number"
            required
          ></b-form-input>

          <label class="mr-sm-2" for="input-responsavel">URL da foto:</label>
          <b-form-input
            v-model="novoArtista.foto"
            id="input-responsavel"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Foto do artista"
            required
          ></b-form-input>
          
          <br>

          <b-button v-if="!btn_edit_artista" type="submit" variant="primary" @click="prancheta_artista = !prancheta_artista">Registrar</b-button>
          <b-button v-if="btn_edit_artista" type="submit" variant="primary" @click="btn_edit_artista = !btn_edit_artista">Atualizar</b-button>

          <b-button type="reset" variant="danger">Limpar formulário</b-button>
        </b-form>
      </b-overlay>
    </b-modal>
    
    <!-- Modal para inserir novo album -->
    <b-modal id="modal-album" :title="titulo_prancheta" hide-footer>
      <b-overlay :show="prancheta_album" rounded="sm">
        <b-form v-on:submit="modo_operantes">
          <label class="mr-sm-2" for="input_nome_album">Nome do álbum:</label>
          <b-form-input
            id="input_nome_album"
            v-model="novoAlbum.nome"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: The Singles: 86-98"
          ></b-form-input>

          <label class="mr-sm-2" for="input_ano_lancamento">Data de lançamento:</label>
          <b-form-datepicker id="input_ano_lancamento" v-model="novoAlbum.dataLancamento" class="mb-2"></b-form-datepicker>

          <label class="mr-sm-2" for="input_url_capa">URL da capa:</label>
          <b-form-input
            v-model="novoAlbum.capa"
            id="input_url_capa"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Capa do álbum"
            required
          ></b-form-input>
          
          <br>
          
          <b-button v-if="!btn_edit_album" type="submit" variant="primary" @click="prancheta_album = !prancheta_album">Registrar</b-button>
          <b-button v-if="btn_edit_album" type="submit" variant="primary" @click="btn_edit_album = !btn_edit_album">Atualizar</b-button>

          <b-button type="reset" variant="danger">Limpar formulário</b-button>
        </b-form>
      </b-overlay>
    </b-modal>

    <!-- Modal para inserir uma nova música -->
    <b-modal id="modal-musica" :title="titulo_prancheta" hide-footer>
      <b-overlay :show="prancheta_musica" rounded="sm">
        <b-form v-on:submit="modo_operantes">
          <label class="mr-sm-2" for="input_nome_musica">Nome da música:</label>
          <b-form-input
            id="input_nome_musica"
            v-model="novaMusica.nome"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: Stand Tall"
            required
          ></b-form-input>

          <label class="mr-sm-2" for="input_duracao_musica">Duração:</label>
          <b-form-timepicker v-model="novaMusica.duracao" locale="pt" required></b-form-timepicker>

          <label class="mr-sm-2" for="input_tipo">Estilo da música:</label>
          <b-form-select
            id="input_tipo"
            v-bind:options="estilos_musica"
            v-model="novaMusica.estilo"
            v-bind:value="null"
            required
          >
          </b-form-select>
          
          <br><br>

          <b-button v-if="!btn_edit_musica" type="submit" variant="primary" @click="prancheta_musica = !prancheta_musica">Registrar</b-button>
          <b-button v-if="btn_edit_musica" type="submit" variant="primary" @click="btn_edit_musica = !btn_edit_musica">Atualizar</b-button>

          <b-button type="reset" variant="danger">Limpar formulário</b-button>
        </b-form>
      </b-overlay>
    </b-modal>
    
    <div id="bg_stromus">
      <div class="invent-cards" v-if="inicioView">        
          <div id="pagina_inicial">
            <h1 class="titulo_pag" id="time_set">{{time_set_inicio}}</h1>
            
            <div id="play_recomendados" v-if="albuns.length > 0">
              <h2>Álbuns recomendados</h2>
              <div v-for="(album, index) in albuns" :key="album.id" v-if="albuns && albuns.length > 0 && index <= 2">
                <a href="#" class="album_inicio_recomendados" @click="
                inicioView = false
                painel_album = true
                define_album_alvo(album.id)
                ">
                  <img class="img_album_recomendado" :src="album.capa" />
                  <h3>{{album.nome.length > 12 ? album.nome.slice(0, 12) +"..." : album.nome}}</h3>
                  <span>{{busca_nome_artista(album.idArtista)}}</span>
                </a>
              </div>
            </div>

            <div id="play_recomendados" v-if="artistas.length > 0">
              <h2>Artistas recomendados</h2>
              <div v-for="(artista, index) in artistas" :key="artista.id" v-if="artistas && artistas.length > 0 && index <= 2">
                <a href="#" class="artista_inicio_recomendados"
                 @click=" inicioView = false
                          painel_artista = true
                          define_artista_alvo(artista.id)
                          busca_informacoes_artista(artista.nome)">

                  <img class="img_artista_recomendado" :src="artista.foto" />
                  <h3>{{artista.nome.length > 12 ? artista.nome.slice(0, 12) +"..." : artista.nome}}</h3>
                  <span>Artista</span>
                </a>
              </div>
            </div>

            <div id="musicas_recomendadas" v-if="musicas.length > 0">
              <h2>Músicas recomendadas</h2>
              <div v-for="(musica, index) in musicas" :key="musica.id" v-if="musicas && musicas.length > 0 && index <= 2">
                <a href="#" class="musica_inicio_recomendados">
                  
                  <hr>
                  <h4 style="float: left; min-width: 20px">{{index + 1}}</h4>

                  <a href="#" class="icon_control" id="jplayer_play" @click="altera_faixa_atual(musica.id)"><em class="icn_ctrl fa-2x fas fa-play-circle"></em></a>
                  
                  <span class="nome_musica_list">{{musica.nome.length > 30 ? musica.nome.slice(0, 30) +"..." : musica.nome}}</span>

                  <span class="nome_artista_musica_list">{{busca_nome_artista(musica.idArtista)}}</span>
                  <span class="nome_album_musica_list">{{busca_nome_album(musica.idAlbum)}}</span>

                  <span class="tempo_musica_list">{{musica.duracao}}</span>
                </a>
              </div>
            </div>

            <div id="play_sem_dados" v-if="albuns.length == 0 && artistas.length == 0 && musicas.length == 0">
              <h2>Sem dados</h2>
              <hr>
              <span>Insira artistas, álbuns e músicas para receber recomendações nesta tela.</span>

              <button v-b-modal.modal-artista @click="limpa_dados_objeto(1)">Inserir artistas</button>
            </div>
        </div>
      </div>

      <!-- Painel do álbum com as músicas do mesmo -->
      <div class="invent-table" v-if="painel_album" id="lista_artistas">
        <div v-for="album in album_alvo" :key="album.id">
          <div id="painel_album">
            <a href="#" @click="define_playlist_atual(album.id)">
              <img id="img_capa_album" :src="album.capa" />
            </a>

            <div id="informacoes_album">
              <span id="tipo_playlist"><i class="fas fa-record-vinyl" aria-hidden="true"></i>
              Álbum
              </span>

              <h1 id="nome_playlist_album">{{album.nome}}</h1>

              <div class="espaco_nome_artista">
                <a href="#" @click="painel_album = false
                              painel_artista = true
                              define_artista_alvo(album.idArtista)
                              busca_informacoes_artista(busca_nome_artista(album.idArtista))">
                  <span id="criador_playlist_album"><b>{{busca_nome_artista(album.idArtista)}}</b> ◦ <span style='font-size: 19px;'>{{album_music.length > 1 ? album_music.length +" faixas" : album_music.length > 0 ? "1 faixa" : "Nenhuma faixa"}}</span></span>
                </a>
              </div>

              <b-button v-b-modal.modal-musica @click="limpa_dados_objeto(3)" variant="dark" class="btn_add">Adicionar uma música</b-button> 

              <a href="#" class='btn_add'><i class="fa fa-pencil" aria-hidden="true" 
              @click="inicia_edicao(2, album.id)" v-b-modal.modal-album></i></a>
            </div>
          </div><br>
        
          <div class="item_playlist" v-for="(musica, index) in album_music" :key="musica.id">
            <a href="#" class="musica_inicio_recomendados">
              <h4 style="float: left; min-width: 20px">{{index + 1}}</h4>

              <a href="#" class="icon_control" id="jplayer_play" @click="altera_faixa_atual(musica.id)"><em class="icn_ctrl fa-2x fas fa-play-circle"></em></a>
              
              <span class="nome_musica_list">{{musica.nome.length > 30 ? musica.nome.slice(0, 30) +"..." : musica.nome}}</span>

              <span class="nome_artista_musica_list">{{busca_nome_artista(musica.idArtista)}}</span>
              
              <span class="tempo_musica_list">{{musica.duracao}}</span>
              
              <a href="#" class='btn_add icon_editar' @click="inicia_edicao(3, musica.id)" v-b-modal.modal-musica><i class="fa fa-pencil" aria-hidden="true"></i></a>
              <i class="icon_excluir fa fa-trash" aria-hidden="true" v-on:click="removeSelectedMusica(musica.id)"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Painel do artista com músicas e álbuns -->
      <div class="invent-table" v-if="painel_artista" id="painel_artista">
        <div v-for="artista in artista_alvo" :key="artista.id">
          <div id="painel_album">
            <img id="img_foto_artista" :src="artista.foto" />
            
            <h1 id="nome_playlist_album">{{artista.nome}}</h1> <a href="#" class='btn_add' @click="inicia_edicao(1, artista.id)" v-b-modal.modal-artista><i class="fa fa-pencil" aria-hidden="true"></i></a>
            <span id="qtd_musicas_artista">{{artista_music.length > 1 ? artista_music.length +" músicas" : artista_music.length > 0 ? "1 música" : "Nenhuma música"}}</span>

            <span id="descricao_artista">{{descricao_artista}}</span>
          </div>
          <br>

          <div id="faixas_populares_artista_perfil" v-if="artista_music.length > 0">
            <h2>Músicas populares</h2>

            <div class="item_playlist" v-for="(musica, index) in artista_music" :key="musica.id" v-if="artista_music && artista_music.length > 0 && index <= 3">
              <a href="#" class="musicas_populares_artista">
                <h4 style="float: left; min-width: 20px">{{index + 1}}</h4>

                <a href="#" class="icon_control" id="jplayer_play" @click="altera_faixa_atual(musica.id)"><em class="icn_ctrl fa-2x fas fa-play-circle"></em></a>

                <span class="nome_musica_list">{{musica.nome.length > 30 ? musica.nome.slice(0, 30) +"..." : musica.nome}}</span>

                <span class="tempo_musica_list_react">{{musica.duracao}}</span>
              </a>
            </div>
          </div>

          <div id="discografia_artista_perfil">

            <b-button v-b-modal.modal-album @click="limpa_dados_objeto(2)" variant="dark" class="btn_add">Adicionar um álbum</b-button>

            <div v-if="artista_album.length > 0">
              <br><h2>Discografia</h2>

              <div class="item_playlist_artista_perfil" v-for="(album, index) in artista_album" :key="album.id" v-if="artista_album && artista_album.length > 0 && index <= 3">
                <a href="#" class="album_artista_perfil" @click="
                painel_artista = false
                painel_album = true
                define_album_alvo(album.id)
                ">
                  <img class="img_album_recomendado" :src="album.capa" />
                  <h3>{{album.nome.length > 12 ? album.nome.slice(0, 12) +"..." : album.nome}}</h3>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabela de artistas -->
      <div class="invent-table" v-if="artistaView" id="lista_artistas">

        <div class="barra_topo_opcoes">
          <b-button v-b-modal.modal-artista @click="limpa_dados_objeto(1)" variant="dark" class="btn_add">Adicionar um artista</b-button>

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
                <a href="#" @click="
                  artistaView = false
                  painel_artista = true
                  define_artista_alvo(cellData.item.id)
                  busca_informacoes_artista(cellData.item.nome)">
                  <img class="foto_artista" v-bind:src="cellData.item.foto">
                </a>
              </template>

              <template #cell(nome)="cellData">
                  <a href="#" @click="
                              artistaView = false
                              painel_artista = true
                              define_artista_alvo(cellData.item.id)
                              busca_informacoes_artista(cellData.item.nome)">
                  <h1 class='nome_artista'>{{cellData.item.nome}}</h1></a>
                  
                  <i class="icon_excluir fa fa-trash" aria-hidden="true" v-on:click="removeSelectedArtista(cellData.item.id)"></i>
              </template>

              <template #cell(seguidores)="cellData">
                  <p class='seguidores_artista'>{{cellData.item.seguidores}} seguidores</p>
              </template>
        </b-table>
      </div>

      <!-- Tabela de álbuns -->
      <div class="invent-table" v-if="albumView" id="lista_albuns">

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
        
        <div id="lista_biblioteca_pessoal">
          <div v-for="album in albuns">

            <div class="item_album_link">
              <a href="#" @click="
                  albumView = false
                  painel_album = true
                  define_album_alvo(album.id)">

                <img class="capa_album_lista" :src="album.capa" />
                <h3 class="nome_item_album_curtido">{{album.nome.length > 20 ? album.nome.slice(0, 20) +"..." : album.nome}}</h3>
              </a>
              
              <i class="icon_excluir fa fa-trash" aria-hidden="true" v-on:click="removeSelectedAlbum(album.id)"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabela de músicas -->
      <div class="invent-table" v-if="musicaView" id="lista_albuns">
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

        <b-table id="items-table" borderless thead-class="d-none" fixed
                :per-page="perPage" 
                :current-page="currentPage" 
                v-bind:items="filterSearchMusica">
              
              <template #cell(nome)="cellData">
                  <h4 class='nome_artista'><a href="#" class="icon_control" id="jplayer_play" @click="altera_faixa_atual(cellData.item.id)"><em class="icn_ctrl fa-2x fas fa-play-circle"></em></a> {{cellData.item.nome}}</h4>

                  <i class="icon_excluir fa fa-trash" aria-hidden="true" v-on:click="removeSelectedMusica(cellData.item.id)"></i>
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
    async asyncData({store, $axios, redirect }) {
      console.log("STATE: "+ store.state.authenticationToken)
      const authToken = typeof window !== 'undefined' ? store.state.authenticationToken : null // se tiver carregando client side, recupera o token do usuário

      // Check if user is logged in.
      if (authToken === null) {
          // This means that there ISN'T JWT and no user is logged in.
          $axios.defaults.headers.common.Authorization = null;
          redirect("/");
      } else {
          // This means that there IS a JWT so someone must be logged in.
          $axios.defaults.headers.common.Authorization = `Bearer ${authToken}`; // salva o token para usar nos headers nas requisições
      }
    
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
        prancheta_artista: false,
        prancheta_album: false,
        prancheta_musica: false,

        btn_edit_artista: false,
        btn_edit_album: false,
        btn_edit_musica: false,
        
        modo_operantes: this.createNewArtista,
        titulo_prancheta: "Novo artista",

        inicioView: true,
        albumView: false,
        artistaView: false,
        musicaView: false,
        curtidaView: false,
        playlistLateral: false,
        
        player_tocando: false,
        timeout_progress: null,

        painel_album: false,
        painel_artista: false,

        time_set_inico: null,
        artistaSearch: "",
        currentPage: 1,
        totalRows: 0,
        perPage: 50,
        url: "",
        
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

        album_alvo: [{id: 0}],
        album_music: [],
        limit: 3,

        artista_alvo: [],
        artista_music: [],
        artista_album: [],
        descricao_artista: null,

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
        },
        musica_atual : {
          id_musica: 2,
          nome: "One Vision",
          artista: "Queen",
          capa_album: "https://i.scdn.co/image/ab67616d0000b273ee74ffacfeb2b593261d4be1",
          tempo_tocado: null,
          tempo_duracao: null,
          conv_tmp_tocado: "00:00",
          conv_tmp_duracao: "00:00",
          source: "songs/3.mp3"
        },
        playlist_atual: [2],
        playlist_tocando: [],

        opcao_repeteco: true,
        opcao_aleatorio: false,
        opcao_reverso_tempo: true
      };
    },

    methods: {
      busca_nome_artista: function(id_artista){
        
        if(!id_artista) return 'Artista desconhecido';

        try{
          for(let i = 0; i < this.artistas.length; i++){

            if(this.artistas[i].id == id_artista)
              return this.artistas[i].nome;
          }
        }catch(err){
          return console.log("Não há artistas registrados");
        }
      },

      busca_nome_album: function(id_album, caso){
        
        if(typeof id_album == "undefined") return 'Álbum desconhecido';
        
        try{
          for(let i = 0; i < this.albuns.length; i++){     
            if(this.albuns[i].id == id_album){
              if(typeof caso == "undefined")
                return this.albuns[i].nome.length > 25 ? this.albuns[i].nome.slice(0, 25) +"..." : this.albuns[i].nome.length;
              else
                return this.albuns[i].nome;
            }
          }
        }catch(err){
          return console.log("Não há álbuns registrados");
        }
      },

      busca_capa_album: function(id_album){

        let capa_album = this.albuns.filter((album) =>
          album.id == id_album
        )

        return capa_album[0].capa;
      },
      
      // Atualiza as músicas para o álbum aberto
      define_album_alvo: function(id_album) {

        this.$axios.$get(`album/${id_album}`).then((response) => {
          this.album_alvo = response;

          this.novaMusica.idAlbum = this.album_alvo[0].idAlbum;
          this.define_artista_alvo(this.album_alvo[0].idArtista);
        })

        // Atualizando a lista de músicas do álbum selecionado
        this.atualizar_lista_musicas(id_album);
      },

      define_artista_alvo: function(id_artista) {
        
        for(let i = 0; i < this.artistas.length; i++){
            if(this.artistas[i].id == id_artista){
              this.artista_alvo[0] = this.artistas[i];

              // Atalho para o cadastro ( sincronizando automaticamente )
              this.novaMusica.idArtista = this.artista_alvo[0].id;
              this.novoAlbum.idArtista = this.artista_alvo[0].id;
            }
        }

        // Buscando as músicas do artista pelo idArtista
        this.artista_music = this.musicas.filter((musica) => 
              musica.idArtista == id_artista
            )

        // Filtrando os álbuns do artista
        this.artista_album = this.albuns.filter((album) => 
              album.idArtista == id_artista
            )
      },

      formata_ano_lancamento: function(ano_lancamento){
        return (ano_lancamento.toString()).slice(0, 4);
      },

      atualizar_lista_albuns: function(id_artista) {
        // Filtrando os álbuns do artista
        this.artista_album = this.albuns.filter((album) => 
          album.idArtista == id_artista
        )
      },
      
      atualizar_lista_musicas: function(id_album){
        this.album_music = this.musicas.filter((musica) => 
          musica.idAlbum == id_album
        )
      },

      define_playlist_atual: function(id_album) {
        
        let musicas_alvos = this.musicas.filter((musica) => 
          musica.idAlbum == id_album
        )
        
        // Previne atualizações de álbuns vazios
        if(musicas_alvos.length < 1) return;

        this.playlist_atual = [];

        for(let i = 0; i < musicas_alvos.length; i++){
          this.playlist_atual.push(musicas_alvos[i].id);
        }

        this.playlistLateral = true;
        this.playlist_tocando = musicas_alvos;
        this.altera_faixa_atual(this.playlist_atual[0]);
      },

      inicia_edicao: function(tipo_alvo, id_alvo){

        // 1 -> Artista, 2 -> "Album", 3 -> Música
        if(tipo_alvo == 1){
          this.$axios.$get(`artista/${id_alvo}`).then((response) => {
            this.novoArtista = response[0];

            this.titulo_prancheta = "Atualizar Artista";
            this.modo_operantes = this.updateSelectedArtista;
            this.btn_edit_artista = true;
          })
        }else if(tipo_alvo == 2){
          this.$axios.$get(`album/${id_alvo}`).then((response) => {
            this.novoAlbum = response[0];

            this.titulo_prancheta = "Atualizar Álbum";
            this.modo_operantes = this.updateSelectedAlbum;
            this.btn_edit_album = true;
          })
        }else{
          this.$axios.$get(`musica/${id_alvo}`).then((response) => {
            this.novaMusica = response[0];
            
            this.titulo_prancheta = "Atualizar Música";
            this.modo_operantes = this.updateSelectedMusic;
            this.btn_edit_musica = true;
          })
        }
      },

      limpa_dados_objeto: function(caso){
        
        // 1 -> Artista, 2 -> Álbum, 3 -> Música
        if(caso == 1){ // Artista
          this.novoArtista = {
            foto: null,
            nome: null,
            seguidores: null
          }

          this.btn_edit_artista = false;
          this.titulo_prancheta = "Novo Artista";
          this.modo_operantes = this.createNewArtista;
        }else if(caso == 2){ // Álbum
          this.novoAlbum = {
            capa: null,
            nome: null,
            idArtista: null,
            dataLancamento: null
          }

          this.btn_edit_album = false;
          this.titulo_prancheta = "Novo Álbum";
          this.modo_operantes = this.createNewAlbum;
        }else{
          this.novaMusica = {
            nome: null,
            estilo: null,
            idAlbum: null,
            duracao: null,
            idArtista: null
          }

          this.btn_edit_musica = false;
          this.titulo_prancheta = "Nova Música";
          this.modo_operantes = this.createNewMusica;
        }
      },

      // Função para buscar os dados do artista
      busca_informacoes_artista: function(nome_artista) {
        
        this.descricao_artista = "Sem descrição disponível no momento";
        return;

        const url = `https://api.duckduckgo.com/?q=${nome_artista}&format=json&pretty=0&skip_disambig=1&no_html=1`;

        fetch(url)
        .then(response => response.json())
        .then(async res => {

          console.log(res.AbstractText);
          // this.descricao_artista = res.AbstractText;
        })
      },

      formata_tempo_musica: function(valor_base){
        const sec = parseInt(valor_base, 10);

        let hours   = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60);

        return `${("0"+ minutes).substr(-2)}:${("0"+ seconds).substr(-2)}`;
      },

      atualiza_barra_progresso: function(){
        
        const song = document.getElementById("jqjp_audio_0");

        if(isNaN(this.musica_atual.tempo_duracao))
          this.musica_atual.tempo_duracao = song.duration;

        if(this.musica_atual.conv_tmp_duracao == "00:00" || isNaN(this.musica_atual.conv_tmp_duracao)){
          this.musica_atual.conv_tmp_duracao = this.formata_tempo_musica(song.duration);
          this.musica_atual.tempo_duracao = song.duration;
        }

        this.musica_atual.conv_tmp_tocado = this.formata_tempo_musica(song.currentTime);

        if(this.opcao_reverso_tempo)
          this.musica_atual.conv_tmp_duracao = this.formata_tempo_musica(song.duration - song.currentTime);
        else
          this.musica_atual.conv_tmp_duracao = this.formata_tempo_musica(song.duration);

        // Barra de progresso da música
        let porcentagem = (100 * song.currentTime) / this.musica_atual.tempo_duracao;
        document.getElementById("progress_bar").style.width = `${porcentagem}%`;
        
        this.timeout_progress = setTimeout(() => {
          if(porcentagem < 100 || isNaN(porcentagem)) this.atualiza_barra_progresso();
          else{ // Termino da música
            if(this.opcao_repeteco)
              this.pular_faixa(1);
          }
        }, 500)
      },

      tocar_musica: function(){

        if(!this.player_tocando) this.player_tocando = true;

        if(this.timeout_progress != null){
          this.timeout_progress = null;
          document.getElementById("progress_bar").style.width = `0%`;
        }

        const song = document.getElementById("jqjp_audio_0");
        song.src = this.musica_atual.source;
        let tempo_tocado = this.musica_atual.tempo_tocado || 0;

        song.currentTime = tempo_tocado;
        // song.volume = 5;
        song.play();

        // Alterando o banner de fundo para a capa do álbum
        const banner_fundo = document.getElementById("fundo_capa");
        banner_fundo.style.background = `url(${this.musica_atual.capa_album})`;

        this.atualiza_barra_progresso();
      },
      
      pausar_musica: function(){
        const song = document.getElementById("jqjp_audio_0");

        this.musica_atual.tempo_tocado = song.currentTime
        song.pause();

        this.timeout_progress = null;
      },

      altera_tempo_tocado: function(){

          let a = document.getElementById("barra_progresso");
          let b = document.getElementById("opcs_progress");
          const distancia_left = a.offsetLeft + b.offsetLeft;

          let e = window.event;
          let posX = e.clientX;

          const song = document.getElementById("jqjp_audio_0");

          let porcentagem = ((100 * (distancia_left - posX) / 430) * -1);
          let tempo_custom = (this.musica_atual.tempo_duracao * porcentagem) / 100;
          song.currentTime = tempo_custom;
      },

      altera_faixa_atual: function(id_nova_faixa){
        
        if(this.timeout_progress != null){
          this.timeout_progress = null;
          document.getElementById("progress_bar").style.width = `0%`;
        }

        const song = document.getElementById("jqjp_audio_0");
        song.pause();

        let dados_musica = this.musicas.filter((musica) => 
          musica.id == id_nova_faixa
        )

        dados_musica = dados_musica[0];

        let artista = this.artistas.filter((artista) => 
          artista.id == dados_musica.idArtista
        )
        
        let album = this.albuns.filter((album) =>
          album.id == dados_musica.idAlbum
        )
      
        this.musica_atual = {
          id_musica: dados_musica.id,
          nome: dados_musica.nome,
          artista: artista[0].nome,
          capa_album: album[0].capa,
          tempo_tocado: null,
          tempo_duracao: null,
          conv_tmp_tocado: "00:00",
          conv_tmp_duracao: "00:00",
          source: null
        }

        if(this.musica_atual.nome == "Aerie")
          this.musica_atual.source = "songs/2.mp3";
        else if(this.musica_atual.nome == "Skyfall")
          this.musica_atual.source = "songs/4.mp3";
        else
          this.musica_atual.source = "songs/1.mp3";

        this.tocar_musica();
      },

      altera_volume_musica: function(){
        const song = document.getElementById("jqjp_audio_0");

        let a = document.getElementById("jplayer_volume_bar");
        let b = document.getElementById("opcs_volume");

        const distancia_left = a.offsetLeft + b.offsetLeft;
        let e = window.event;
        let posX = e.clientX;

        let porcentagem = (((100 * (distancia_left - posX) / 983) - 100) * -1);

        porcentagem = porcentagem * 10;
        document.getElementById("jplayer_volume_bar_value").style.width = `${porcentagem}%`;

        porcentagem = porcentagem / 100;

        if(porcentagem > 1)
          porcentagem = 1;
        else if(porcentagem < 0)
          porcentagem = 0;

        song.volume = porcentagem;
      },

      pular_faixa: function(caso) {
        
        const song = document.getElementById("jqjp_audio_0");
        let proxima_faixa;

        if(song.currentTime > 5 && !caso){
          song.currentTime = 0;
        }else{
          // Avançar
          if(caso){
            proxima_faixa = this.playlist_atual[this.playlist_atual.indexOf(this.musica_atual.id_musica) + 1];
            if(!proxima_faixa) proxima_faixa = this.playlist_atual[0];
          }else{ // Retornar 
            if(song.currentTime > 5){ // Reinicia a música atual
              song.currentTime = 0;
            }else{
              proxima_faixa = this.playlist_atual[this.playlist_atual.indexOf(this.musica_atual.id_musica) - 1];
              if(!proxima_faixa) proxima_faixa = this.playlist_atual[this.playlist_atual.length - 1];
            }
          }

          this.altera_faixa_atual(proxima_faixa)

          if(!this.player_tocando) this.player_tocando = true;
        }
      },

      config_repeteco_alea: function(caso){
        
        let alvos_altera = document.getElementsByClassName("icons_secundarios");

        // 0 - Repeteco, 1 - Aleatório
        if(!caso){
          this.opcao_repeteco = !this.opcao_repeteco;

          if(this.opcao_repeteco)
            alvos_altera[0].style.color = "rgb(5, 2, 99) !important";
          else
            alvos_altera[0].style.color = "rgb(105, 105, 105) !important";
        }else{
          this.opcao_aleatorio = !this.opcao_aleatorio;

          if(this.opcao_aleatorio)
            alvos_altera[1].style.color = "rgb(5, 2, 99) !important";
          else
            alvos_altera[1].style.color = "rgb(105, 105, 105) !important";
        }
      },

      preview_lateral: function(){
        this.playlistLateral = !this.playlistLateral;
      },

      createNewArtista: function (event) {
        event.preventDefault();

        // Veja mais sobre em https://axios.nuxtjs.org/usage
        this.$axios
          .$post("artista", this.novoArtista)
          .then((response) => {
            this.updateArtista();
          })
          .catch((error) => {
            console.error('Não foi possível criar um novo artista');
            console.log(error);
          });

          this.$bvModal.hide('modal-artista');
          this.prancheta_artista = false;
      },

      updateArtista: function () {
        this.$axios.$get("artista").then((response) => {
          this.artistas = response;
          this.totalRows = this.artistas.length
        })
      },

      updateSelectedArtista: function (event) {
        event.preventDefault();

        this.$axios
          .$post("artista/update", this.novoArtista)
          .then((response) => {
            this.updateArtista();
          })
          .catch((error) => {
            console.error('Não foi possível atualizar o artista selecionado');
            console.log(error);
          });

          this.$bvModal.hide('modal-artista');
          this.modo_operantes = this.createNewArtista;
      },

      removeSelectedArtista: function (id) {
        this.$axios.$delete(`artista/${id}`).then((response) => {
          
          this.updateArtista();
        })
      },

      createNewAlbum: function (event) {
        event.preventDefault();

        if(this.novoAlbum.idArtista != this.artista_alvo[0].id)
          this.novoAlbum.idArtista = this.artista_alvo[0].id;

        this.$axios
          .$post("album", this.novoAlbum)
          .then((response) => {
            // Acessa o objeto que controla os modais e esconde aquele que você passar o id.
            this.updateAlbum();

            this.atualizar_lista_albuns(this.novoAlbum.idArtista);
          })
          .catch((error) => {
            console.error('Não foi possível criar um novo album');
            console.log(error);
          });

          this.$bvModal.hide('modal-album');
          this.prancheta_album = false;
      },

      updateAlbum: function () {
        this.$axios.$get("album").then((response) => {
          this.albuns = response;
        })
      },

      updateSelectedAlbum: function (event) {
        event.preventDefault();

        this.$axios
          .$post("album/update", this.novoAlbum)
          .then((response) => {
            this.updateAlbum();
          })
          .catch((error) => {
            console.error('Não foi possível atualizar o álbum selecionado');
            console.log(error);
          });

          this.$bvModal.hide('modal-album');
          this.modo_operantes = this.createNewAlbum;
      },

      removeSelectedAlbum: function (id) {
        this.$axios.$delete(`album/${id}`).then((response) => {
          
          this.updateAlbum();
        })      
      },

      createNewMusica: function (event) {
        event.preventDefault();
        
        if(this.novaMusica.idAlbum != this.album_alvo[0].id)
          this.novaMusica.idAlbum = this.album_alvo[0].id;

        if(this.novaMusica.idArtista != this.artista_alvo[0].id)
          this.novaMusica.idArtista = this.artista_alvo[0].id;

        this.$axios
          .$post("musica", this.novaMusica)
          .then((response) => {
            // Atualiza a lista de músicas do álbum
            this.updateMusica();
            this.atualizar_lista_musicas(this.album_alvo[0].id);
          })
          .catch((error) => {
            console.error('Não foi possível criar uma nova música');
            console.log(error);
          });

          this.$bvModal.hide('modal-musica');
          this.prancheta_musica = false;
      },

      updateMusica: function () {
        this.$axios.$get("musica").then((response) => {
          this.musicas = response;
          this.totalRows = this.musicas.length;
        })
      },

      updateSelectedMusic: function (event) {
        event.preventDefault();

        this.$axios
          .$post("musica/update", this.novaMusica)
          .then((response) => {
            this.updateMusica();
          })
          .catch((error) => {
            console.error('Não foi possível atualizar a música selecionada');
            console.log(error);
          });

          this.$bvModal.hide('modal-musica');
          this.modo_operantes = this.createNewMusica;
          
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
</style>