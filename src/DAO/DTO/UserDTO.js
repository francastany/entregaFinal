export default class UserDTO {
    static getTokenDTO = (user) => {
        return {
            cart: user.cart,
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            id: user._id,
            avatar:
                user.avatar ||
                "http:localhost:8080/public/img/defaultAvatar.jpg",
        };
    };
}
