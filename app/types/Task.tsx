import UserType from "./User";

export default interface TaskType{

    id: string,
    title: string,
    description: string,
    owner: UserType,
    type: string,
    status: string,
    createdAt: string

}