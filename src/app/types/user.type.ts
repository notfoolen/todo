/**
 * User
 */
export class User {
    public login: string;
    public email: string;

    constructor(login: string, email: string) {
        this.login = login;
        this.email = email;
    }
}