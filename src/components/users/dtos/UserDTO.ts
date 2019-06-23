type UserDTOProps = {
    readonly id: string;
    readonly username: string;
    readonly following: UserDTO[];
}

export class UserDTO {
    readonly id: string;
    readonly username: string;
    readonly following: UserDTO[];
    
    constructor(props: UserDTOProps) {
        this.id = props.id;
        this.username = props.username;
        this.following = props.following;
    }
}