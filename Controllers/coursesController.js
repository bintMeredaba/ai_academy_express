const Course = require("../models/course");
// Fonction utilitaire pour extraire les paramètres du cours du corps de la requête
const getCourseParams = (body) => {
  return {
    title: body.title,
    description: body.description,
    maxStudents: body.maxStudents,
    cost: body.cost,
  };
};
module.exports = {
  index: (req, res, next) => {
    Course.find({})
      .then((courses) => {
        res.render("courses/index", {
          pageTitle: "Liste des cours",
          courses: courses,
        });
      })
      .catch((error) => {
        console.log(
          `Erreur lors de la récupération des cours : ${error.message}`
        );
        res.locals.messages.error = "Impossible de récupérer les cours.";
        res.render("courses/index", {
          pageTitle: "Liste des cours",
          courses: [],
        });
      });
  },
  indexView: (req, res) => {
    res.render("courses/index", { pageTitle: "Liste des cours" });
  },
  new: (req, res) => {
    res.render("courses/new", { pageTitle: "Créer un nouveau cours" });
  },
  create: (req, res, next) => {
    let courseParams = getCourseParams(req.body);
    Course.create(courseParams)
      .then((course) => {
        res.locals.redirect = "/courses";
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(`Erreur lors de la création du cours: ${error.message}`);
        res.locals.redirect = "/courses/new";
        next();
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .populate("students")
      .then((course) => {
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(
          `Erreur lors de la récupération du cours par ID: ${error.message}`
        );
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("courses/show", { pageTitle: "Détails du cours" });
  },
  edit: (req, res, next) => {
    let courseId = req.params.id;
    Course.findById(courseId)
      .then((course) => {
        res.render("courses/edit", {
          pageTitle: "Modifier le cours",
          course: course,
        });
      })
      .catch((error) => {
        console.log(
          `Erreur lors de la récupération du cours par ID: ${error.message}`
        );
        next(error);
      });
  },

  update: (req, res, next) => {
    let courseId = req.params.id,
      courseParams = getCourseParams(req.body);
    Course.findByIdAndUpdate(courseId, {
      $set: courseParams,
    })
      .then((course) => {
        res.locals.redirect = `/courses/${courseId}`;
        res.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(
          `Erreur lors de la mise à jour du cours par ID: ${error.message}`
        );
        next(error);
      });
  },
  delete: (req, res, next) => {
    let courseId = req.params.id;

    Course.findByIdAndDelete(courseId)
      .then(() => {
        res.locals.messages.success = "Cours supprimé avec succès !";
        res.redirect("/courses");
      })
      .catch((error) => {
        console.log(
          `Erreur lors de la suppression du cours : ${error.message}`
        );
        res.locals.messages.error = "Impossible de supprimer le cours.";
        next(error);
      });
  },
};
