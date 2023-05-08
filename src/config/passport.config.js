import passport from "passport";
import local from "passport-local";
import { validatePassword } from "../services/auth.js";
import { usersService } from "../DAO/index.js";

const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                if (!email || !password)
                    return done(null, false, { message: "Incomplete values" });
                const user = await usersService.getUserBy({ email });
                if (!user)
                    return done(null, false, { message: "Invalid user" });
                const isValidPwd = await validatePassword(
                    password,
                    user.password
                );
                if (!isValidPwd)
                    return done(null, false, { message: "Incorrect password" });
                return done(null, user);
            }
        )
    );
};
export default initializeStrategies;
