export class User{
    constructor(
        public id: number = null,
        public name: string = null,
        public surname: string = null,
        public avatar: string = null,
        public description: string = null,
        public role: string = 'ROLE_USER',
        public email: string = null,
        public password: string = null,

    ){}
    
}