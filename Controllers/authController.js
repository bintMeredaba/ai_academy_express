const User = require("../models/user");
const passport = require("passport");

module.exports = {
  // Affiche le formulaire de connexion
  login: (req, res) => {
    res.render("auth/login");
  },

  // Gère l'authentification des utilisateurs
  authenticate: passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: "Votre email ou mot de passe est incorrect.",
    successRedirect: "/",
    successFlash: "Vous êtes maintenant connecté!"
  }),

  // Déconnecte l'utilisateur
  logout: (req, res, next) => {
    req.logout((err) => {  // Utilisation du callback
      if (err) {
        return next(err);  // Si une erreur survient, la transmettre au middleware suivant
      }
      req.flash("success", "Vous avez été déconnecté avec succès!");
      res.locals.redirect = "/";  // Redirection vers la page d'accueil
      next();  // Passe au middleware suivant
    });
  },

  // Affiche le formulaire d'inscription
  signup: (req, res) => {
    res.render("auth/signup");
  },

  // Crée un nouvel utilisateur et l'authentifie
  register: (req, res, next) => {
    if (req.skip) return next();  // Si on saute cette étape, on passe au middleware suivant
    
    let newUser = new User({
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      zipCode: req.body.zipCode
    });

    // Enregistre le nouvel utilisateur avec son mot de passe
    User.register(newUser, req.body.password, (error, user) => {
      if (user) {
        req.flash("success", `Le compte de ${user.fullName} a été créé avec succès!`);
        res.locals.redirect = "/";  // Redirection vers la page d'accueil
        next();  // Passe au middleware suivant
      } else {
        req.flash("error", `Échec de la création du compte utilisateur: ${error.message}`);
        res.locals.redirect = "/signup";  // Redirection vers la page d'inscription
        next();  // Passe au middleware suivant
      }
    });
  },

  // Middleware pour vérifier si l'utilisateur est connecté
  ensureLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();  // L'utilisateur est connecté, on passe au middleware suivant
    } else {
      req.flash("error", "Vous devez être connecté pour accéder à cette page.");
      res.redirect("/login");  // Redirection vers la page de connexion
    }
  }
};
