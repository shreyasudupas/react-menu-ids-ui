import { IDENTITY_CONFIG, METADATA_OIDC } from "../utilities/authConstant";
import { UserManager, WebStorageStateStore, Log, User, SigninRequest } from "oidc-client";

export interface IAuthService{
    signinRedirectCallback:() => void;
    getUser:() => Promise<User>;
    signinRedirect:() => void;
    isAuthenticated:() => boolean;
    createSigninRequest:() => Promise<SigninRequest>;
    logout: () => void;
    signoutRedirectCallback: () => Promise<void>;
    userRoleIsAdmin:() => Promise<string>;
    isUserEnabled:() => Promise<boolean>;
}

export default class AuthService implements IAuthService {
    UserManager:UserManager;

    constructor() {
        this.UserManager = new UserManager({
            ...IDENTITY_CONFIG,
            userStore: new WebStorageStateStore({ store: window.sessionStorage }),
            metadata: {
                ...METADATA_OIDC
            }
        });
        // Logger
        Log.logger = console;
        Log.level = Log.DEBUG;
        
        this.UserManager.events.addUserLoaded((user) => {
            if (window.location.href.indexOf("signin-oidc") !== -1) {
                this.navigateToScreen();
            }
        });
        // this.UserManager.events.addSilentRenewError((e) => {
        //     console.log("silent renew error", e.message);
        // });

        this.UserManager.events.addAccessTokenExpired(() => {
            console.log("token expired");
            //this.signinSilent();
        });
    }

    signinRedirectCallback = async () => {
        await this.UserManager.signinRedirectCallback().then((user:User)=>{
            if(user!== null && user!== undefined){
                // redirect user to user page
                console.log('callback successful')
            }
          });
    };


    getUser = async () => {
        const user = await this.UserManager.getUser();
        if (!user) {
            return await this.UserManager.signinRedirectCallback();
        }
        return user;
    };

    parseJwt = (token:string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };


    signinRedirect = () => {
        localStorage.setItem("redirectUri", window.location.pathname);
        this.UserManager.signinRedirect({});
    };


    navigateToScreen = () => {
        window.location.replace("/user");
    };


    isAuthenticated = () => {
        const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`)!)

        return (!!oidcStorage && !!oidcStorage.access_token)
    };

    // signinSilent = () => {
    //     this.UserManager.signinSilent()
    //         .then((user) => {
    //             console.log("signed in", user);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    // signinSilentCallback = () => {
    //     this.UserManager.signinSilentCallback();
    // };

    createSigninRequest = () => {
        return this.UserManager.createSigninRequest();
    };

    logout = () => {
        this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        this.UserManager.clearStaleState();
    };

    signoutRedirectCallback = async () => {
        await this.UserManager.signoutRedirectCallback().then(() => {
            localStorage.clear();
            window.location.replace(process.env.REACT_APP_PUBLIC_URL!);
        });
        this.UserManager.clearStaleState();
    };

    userRoleIsAdmin = async () =>{
        let role =''
         await this.UserManager.getUser()
         .then((user:any)=> {
            role = user.profile.role
         } );

         return role;
    }

    isUserEnabled = async () => {
        const user = await this.getUser();
        let enable = user.profile["enabled"];

        if(enable !== null){
            return (enable == 'True')?true:false;
        }else{
            return false;
        }
    }
}