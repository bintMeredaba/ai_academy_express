// Controllers/faqController.js

exports.faq = (req, res) => {
    res.render("faq", {
      title: "FAQ",
      questions: [
        { q: "Qu'est-ce que AI Academy ?", a: "C'est une plateforme d'apprentissage en IA." },
        { q: "Comment m'inscrire ?", a: "Cliquez sur 'S'inscrire' dans le menu." },
        { q: "Puis-je obtenir un certificat ?", a: "Oui, à la fin de chaque cours." },
        { q: "Quels langages sont utilisés ?", a: "Principalement Python et JavaScript." },
        { q: "Y a-t-il un support ?", a: "Oui, via le formulaire de contact." }
      ]
    });
  };
  