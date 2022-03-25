module.exports = {
  authenticator: (req, res, next) => {
    // 確認驗證狀態
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("warning_msg", "請先登入才能使用！"); // 加入這行
    res.redirect("/users/login");
  }
};
