import { createContext, useContext,Component, ReactNode } from "react"
import AuthService, { IAuthService } from "../utilities/AuthService";

const AuthContext = createContext<IAuthService>(undefined!)

//custom hooks
export const useAuth = () => {
    return useContext(AuthContext)
}

type Props = {
    children: any;
};

export class AuthProvider extends Component<Props> {
    authService:AuthService;
    constructor(props:any) {
        super(props);
        this.authService = new AuthService();
    }
    render() {
        return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>;
    }
}

