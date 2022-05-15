const request = require("supertest");
const app = require("../app");

describe("Testes para o path 'artista'", () => {
    test("[GET /artista] Recupera todos os artistas do sistema", async () => {
        const res = await request(app)
            .get("/artista")
            // Especifique na API que o tipo enviado é application/json.
            // Caso contrário o Supertest não será capas de fazer o parse da resposta
            // para um objeto javascript, e consequentemente res.body vira vazio.
            .set('Accept', 'application/json');
        // Espera que o código HTTP seja 200
        expect(res.statusCode).toBe(200);

        // Teste se foi retornado um array
        expect(res.body).toBeInstanceOf(Array);

        // Espera que o objeto retornado contenha os atributos 
        // definidos no schema definido no OpenAPI.
        // Ver em: https://jestjs.io/pt-BR/docs/expect#tohavepropertykeypath-value
        // ---- Testes para ItemPatrimonio
        // Para simplificar, vamos testar apenas o primeiro objeto
        const objToTest = res.body[0];

        expect(objToTest).toHaveProperty("nome");
        expect(objToTest).toHaveProperty("seguidores");
        expect(objToTest).toHaveProperty("foto");

    });

    test("[GET /artista/{artista_id}] Recupera um artista por nome", async () => {
        const res = await request(app)
            .get("/artista/Skid row")
            .set('Accept', 'application/json');

        // Espera que o código HTTP seja 200
        expect(res.statusCode).toBe(200);

        // Espera que o objeto retornado contenha os atributos 
        // definidos no schema definido no OpenAPI.
        // Ver em: https://jestjs.io/pt-BR/docs/expect#tohavepropertykeypath-value
        // ---- Testes para ItemPatrimonio
        // Para simplificar, vamos testar apenas o primeiro objeto
        expect(res.body).toHaveProperty("nome");
        expect(res.body).toHaveProperty("seguidores");
        expect(res.body).toHaveProperty("foto");
    });

    test("[POST /artista] Criação de um novo artista", async () => {
        const res = await request(app)
                            .post("/artista", {
                                "nome": "Van Halen",
                                "seguidores": 28348234,
                                "foto": "https://warnermusicstore.com.br/wp-content/uploads/2021/10/9477224908_VAN20HALEN20-20VAN20HALEN20II20CD20INT200081227954918.jpg"
                            })
                            .set("Content-Type", "application/json")
                            .set('Accept', 'application/json');

        // Espera que o código HTTP seja 201
        expect(res.statusCode).toBe(201);                        

        expect(res.body).toEqual({ status: "Artista criado com sucesso." });
    });

    test("[DELETE /artista/{artista_nome}] Remove um artista por nome", async () => {
        const res = await request(app)
            .delete("/artista/Wesley Safadão")
            .set('Accept', 'application/json');

        // Espera que o código HTTP seja 200
        expect(res.statusCode).toBe(200); 
        expect(res.body).toEqual({ status: "Artista removido com sucesso." });
    });

    const agent = request.agent(app);

    test("Não retorna objeto pro ID em um GET após executar um DELETE ", async () => {

        // Faz primeiro a requisição DELETE ...        
        const resPOST = await agent
                            .delete("/artista/Wesley Safadão")
                            .set('Accept', 'application/json');

        // Espera que o código HTTP seja 200
        expect(resPOST.statusCode).toBe(200); 
        expect(resPOST.body).toEqual({ status: "Artista removido com sucesso." });

        // ... Para em seguida fazer um GET e obter um 404.
        const resGET = await agent
                            .get("/artista/Wesley Safadão")
                            .set('Accept', 'application/json');

        // Espera que o código HTTP seja 404 - Not Found
        expect(resGET.statusCode).toBe(404); 
        expect(resGET.body).toEqual({status: `Não foi possível encontrar o artista para Wesley Safadão.`});
    });
});
