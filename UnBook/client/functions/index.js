export const imageSource = (user) => {
    if (user && user.image) {
    return user.image.url;
    } else {
    return "/images/logo.png";
    }
};