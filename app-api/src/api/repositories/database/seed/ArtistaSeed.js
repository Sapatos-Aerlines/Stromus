const Artista = require("../model/Artista");

module.exports = (database) => {
    database.addArtista(
        new Artista(
            {
                "foto": 'https://i.scdn.co/image/21d5b66db963d4c4afe31ec7e2e5281a20742e2d',
                "nome": "Guns n' Roses",
                "seguidores": 1245421218,
            }
        )
    )
    
    database.addArtista(
        new Artista(
            {
                "foto": 'https://th.bing.com/th/id/OIP.vEuD0NjY5pChstF0qXWwxAHaHV?pid=ImgDet&rs=1',
                "nome": "Skid row",
                "seguidores": 65465442,
            }
        )
    )

    database.addArtista(
        new Artista(
            {
                "foto": 'https://th.bing.com/th/id/R.4cb2cb660a059dc6a3bd0015c8b3d95a?rik=uwSvEGHSkz9UcQ&riu=http%3a%2f%2fwww.tribunapr.com.br%2fwp-content%2fuploads%2fsites%2f1%2f2017%2f04%2fWeslwy-Safadao.jpg&ehk=Whxo0y7Eoc7T0TDnFXOtjK2pLXdTftbJ3Dzk6eW2rgw%3d&risl=&pid=ImgRaw&r=0',
                "nome": "Wesley Safadão",
                "seguidores": 1,
            }
        )
    )

    database.addArtista(
        new Artista(
            {
                "foto" : "https://bhaz.com.br/wp-content/uploads/2019/05/Racionais-2-1-850x491.jpg",
                "nome": "Racionais",
                "seguidores": 97974213,
            }
        )
    )

}

