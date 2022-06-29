const MSAL_CONF = {
    auth: {        
        clientId:  "7a3a0db8-520b-4579-a9ce-bf654e865216",
        authority: "https://login.microsoftonline.com/ed0cd196-c46d-43d9-813e-500e8c413eda",
        redirectUri: "http://localhost:4200/auth/login"
    },
    cache: {
        // set your cache location to local storage
        cacheLocation: "localStorage"
    }
};

window.MSAL_INSTANCE = new msal.PublicClientApplication(MSAL_CONF);

window.MSAL_INSTANCE
        .handleRedirectPromise()
        .then((tokenResponse) => {
            let accountObj = null;
            if (tokenResponse !== null) {
                accountObj = tokenResponse.account;
                const id_token = tokenResponse.idToken;
                const access_token = tokenResponse.accessToken;
                console.log('id_token', id_token);
                console.log('access_token', access_token);

                const event = new CustomEvent("userLogged", { });
                document.dispatchEvent(event);                        
            }
        })
        .catch(error => {
            console.error(error);
        });

window.MSAL_INSTANCE.loginRedirect({
       scopes: ['openid'],
        loginhint: "teststudent.pdde@iese.net"
});