export default {
    oidc:{
        //public identifier of the client app
        clientId:'0oa1nb43c2PGrvQyQ5d7',
        //issuer of tokens
        issuer:'https://dev-69443593.okta.com/oauth2/default',
        //send user here after login
        redirectUri:'https://localhost:4200/login/callback',
        //scopes provide access to information about a user
        
        scopes: ['openid','profile','email']
        
    }
}
