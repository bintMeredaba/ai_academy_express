const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom est requis"], // Validation de la présence
    minlength: [3, "Le nom doit contenir au moins 3 caractères"], // Validation de la longueur
  },
  email: {
    type: String,
    required: [true, "L'email est requis"],
    lowercase: true,
    unique: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "L'email n'est pas valide"], // Validation du format email
  },
  zipCode: {
    type: String, // Modifier zipCode pour être une chaîne de caractères
    required: [true, "Le code postal est requis"],
    match: [/^\d{5}$/, "Le code postal doit comporter exactement 5 chiffres"], // Validation du code postal (5 chiffres)
  }
});

subscriberSchema.methods.getInfo = function() {
  return `Nom: ${this.name} Email: ${this.email} Code Postal: ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model("Subscriber")
    .find({ zipCode: this.zipCode })
    .exec();
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
