export class Http {
    async httpRequest(url, method = "GET", content = null) {
        try {
            const options = {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                }
            }

            if (content) {
                options.body = JSON.stringify(content);
            }

            const res = await fetch(url, options);

            if (!res.ok) {
                const errorText = await res.text();
                console.error(`Error HTTP: ${res.status} ${res.statusText}`);
                console.error("Detalles del error:", errorText);
                throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
            }

            if (method !== "DELETE") {
                return await res.json();
            } else if (method === "DELETE" && res.ok){
                console.log("Objeto eliminado con éxito");
            }

        } catch (err) {
            console.log(`Error en solicitud ${method} a la url: ${url}`);
            throw err;
        }
    }


    async methodGET(url) {
        return await this.httpRequest(url);
    }

    async methodPOST(url, content) {
        return await this.httpRequest(url, "POST", content);
    }

    async methodPUT(url, content) {
        return this.httpRequest(url, "PUT", content);
    }

    async methodDELETE(url) {
        return this.httpRequest(url, "DELETE");
    }

}






