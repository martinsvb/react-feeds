export const messages = {
  en: {
    minLength: (minLength) => "Minimal length is % characters.".replace("%", minLength),
    maxLength: (maxLength) => "Maximal length is % characters.".replace("%", maxLength),
    email: "Bad E-mail format.",
    required: "Field is required."
  },
  cz: {
    minLength: (minLength) => "Minimální délka je % znaků.".replace("%", minLength),
    maxLength: (maxLength) => "Maximální délka je % znaků.".replace("%", maxLength),
    email: "Špatný formát E-mailové adresy.",
    required: "Pole je povinné."
  },
  sk: {
    minLength: (minLength) => "Minimálna dĺžka je % znakov.".replace("%", minLength),
    maxLength: (maxLength) => "Maximálna dĺžka je % znakov.".replace("%", maxLength),
    email: "Zlý formát E-mailové adresy.",
    required: "Pole je povinné"
  }
}
