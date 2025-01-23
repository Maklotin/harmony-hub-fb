import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import userpool from "./userpool";

export const authenticate=(Email:string, Password:string)=>{
    return new Promise((resolve, reject)=>{
        const user = new CognitoUser({
            Username: Email,
            Pool: userpool
        });

        const authDetails = new AuthenticationDetails({
            Username: Email,
            Password
        });

        user.authenticateUser(authDetails, {
            onSuccess:(result)=>{
                console.log('onSuccess:', result);
                resolve(result);
            },
            onFailure:(err)=>{
                console.error('onFailure:', err);
                reject(err);
            }
        })
    })
}

export const logOut = () => {
    const user = userpool.getCurrentUser();
    user?.signOut();
    window.location.href = '/';
}