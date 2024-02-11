import { User } from "./user";

export class UserList {

    private list: User[] = [];

    constructor() {}

    public add (user: User) {
        this.list.push(user);
        // console.log(JSON.stringify(this.list, null, 2));
        return user;
    }

    public updateCompany(token: string, company: string) {
        const user = this.list.find(user => user.token === token);
        console.log(`> User: ${user?.token}`);
        if (user) {
            user.company = company;
            console.log('> Usuario actualizado');
        } else {
            console.log('> Usuario no encontrado');
        }

        console.log(JSON.stringify(this.list, null, 2));
    }

    public getList() {
        return this.list;
    }

    public getUser(token: string) {
        return this.list.find(user => user.token === token);
    }

    public getAllUserRoom(room: string) {
        return this.list.filter(user => user.room === room);
    }

    public removeUser(token: string) {
        const temp = this.getUser(token);
        this.list = this.list.filter(user => user.token !== token);
        return temp;
    }
}