import docgo from "docgo-sdk";
import { urlBase, getToken } from "./utils";

interface AdicionaMonitoramentoParams {
  tipo: number;
  documento: string;
}

async function adicionaMonitorament(
  params: AdicionaMonitoramentoParams
): Promise<any> {
  try {
    if (
      Array.isArray(params) &&
      params.length === 1 &&
      typeof params[0] === "object"
    ) {
      params = params[0];
    }
    if (!params.tipo || !params.documento) {
      console.log(
        docgo.result(false, null, "É necessário informar tipo e documento.")
      );
      return;
    }

    const user = docgo.getEnv("doc9User");
    if (!user) {
      console.log(docgo.result(false, null, "Usuario Doc9 não informado."));
      return;
    }

    const pass = docgo.getEnv("doc9Pass");
    if (!pass) {
      console.log(docgo.result(false, null, "Senha Doc9 não informada."));
      return;
    }

    const token = await getToken(user, pass);
    if (!token) {
      console.log(
        docgo.result(false, null, "Não foi possível autenticar no Doc9.")
      );
      return;
    }

    const response = await fetch(
      `${urlBase}/_sol/API/cliente-v2/argus/adicionar_monitoramento/endpoint.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tipo: params.tipo,
          documento: params.documento,
        }),
      }
    );

    const data = await response.json();
    console.log(
      docgo.result(true, data, "Monitoramento adicionado com sucesso.")
    );
  } catch (error) {
    console.log(
      docgo.result(false, null, `Erro ao adicionar monitoramento: ${error}`)
    );
  }
}

export default adicionaMonitorament;
