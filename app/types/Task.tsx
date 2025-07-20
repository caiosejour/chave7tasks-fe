import UserType from "./User";

export default interface TaskType{

    id: String,
    title: String,
    description: String,
    owner: UserType,
    type: String,
    status: String,
    createdAt: String

}