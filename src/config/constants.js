export const UserRolesEnum = {
    ADMIN:"admin",
    PROJECT_ADMIN:"project_admin" ,
    MEMBER :"member",
}

export const AvalableUserRoles=Object.values(UserRolesEnum);

export const TaskStatusEnum = {
    TODO:"todo",
    IN_PROGESS:"in_progress",
    DONE:"done "
}

export const AvalableTaskStatus=Object.values(TaskStatusEnum);
