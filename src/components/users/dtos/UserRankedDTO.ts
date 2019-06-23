type UserRankedDTOProps = {
    readonly username: string; 
    readonly answered: number;
}

export class UserRankedDTO {
    readonly username: string;
    readonly answered: number;
    
    constructor(props: UserRankedDTOProps) {
        this.username = props.username;
        this.answered = props.answered;
    }
}