export const jwtConstants = {
    secret: `${process.env.JWT_SECRET}`
}

export const bcryptConstant = {
    saltRounds: `${process.env.SALT_ROUND}`
}

export const IRoles = {
    ADMIN: "ADMIN",
    INSTRUCTOR: "INSTRUCTOR",
    STUDENT: "STUDENT"
}