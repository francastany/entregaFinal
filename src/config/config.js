export default {
    app: {
        ADMIN_USER: process.env.SUPERADMIN_USER,
        ADMIN_PWD: process.env.SUPERADMIN_PWD,
    },
    mongo: {
        URL: process.env.MONGO_URL,
    },
    jwt: {
        COOKIE: process.env.JWT_COOKIE,
        SECRET: process.env.JWT_SECRET,
    },
};
