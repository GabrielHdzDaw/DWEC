export class Http {
    async httpRequest(url, method = "GET", content = null) {
        try {
            const options = {
                method: method,
                headers: {
                    "Content-type": "application/json"
                }
            }

            if (content) {
                options.body = JSON.stringify(content);
            }

            const res = fetch(url, options);

            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.statusText}`);
            }

            return await res.json();

        } catch (err) {
            console.log(`Error en solicitud ${method} a la url: ${url}`);
            throw err;
        }
    }


    async methodGET(url) {
        return await httpRequest(url, "GET");
    }

    async methodPOST(url, content) {
        return await httpRequest(url, "POST", content);
    }

    async methodPUT(url, content) {
        return httpRequest(url, "PUT", content);
    }

    async methodDELETE(url) {
        return httpRequest(url, "DELETE");
    }

}






