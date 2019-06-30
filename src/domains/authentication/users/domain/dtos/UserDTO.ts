type UserDTOProps = {
    readonly id: string;
    readonly username: string;
}

export class UserDTO {
    readonly id: string;
    readonly username: string;
    
    constructor(props: UserDTOProps) {
        Object.assign(this, props);
    }
}