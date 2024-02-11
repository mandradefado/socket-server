export class User {

    public token: string;
    public company: string;
    public room: string;

    constructor(token: string) {
        this.token = token;
        this.company = 'N/A';
        this.room = 'N/A';
    }
}