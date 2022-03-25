module.exports = {
  authenticator: (req, res, next) => {
    // 確認驗證狀態
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  },
};
