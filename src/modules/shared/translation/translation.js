/** Translation component */
export const getLang = (lang = null) => {
  let userLang = lang || navigator.language.split('-')[0]; // use navigator lang if available
  let availLangs = Object.keys(translation);

  if (!availLangs.includes(userLang)) {
    userLang = 'en';
  }

  return  userLang;
};

export const getTranslation = (lang) => {

  return translation[lang];
};

export const regex = {
  "emailSimple": /^([A-Za-z0-9]|-|_)+@[A-Za-z]+\.[A-Za-z]{2,}$/,
  "email": /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};

export const translation = {
  "en": {
    "home": "home",
    "news": "news",
    "addNew": "add new",
    "subject": "subject",
    "appendix": "appendix",
    "content": "content",
    "image": "image",
    "gallery": "gallery",
    "attachments": "attachments",
    "is": "is",
    "required": "required",
    "submit": "submit",
    "file": "file",
    "upload": "upload",
    "create": "create",
    "newM": "new",
    "newF": "new",
    "newN": "new",
    "edit": "edit",
    "delete": "delete",
    "read": "read",
    "write": "write",
    "del": "del",
    "enabledM": "enabled",
    "enabledF": "enabled",
    "enabledN": "enabled",
    "disabledM": "diabled",
    "disabledF": "diabled",
    "disabledN": "diabled",
    "file_upload": "upload file",
    "guest": "guest",
    "user": "user",
    "users": "users",
    "login": "login",
    "logout": "logout",
    "name": "name",
    "firstName": "name",
    "lastName": "surname",
    "password": "password",
    "repassword": "repeat password",
    "register": "register",
    "email": "e-mail",
    "role": "role",
    "roles": "roles",
    "profile": "profile",
    "actions": "actions",
    "list": "list",
    "description": "description",
    "changePassword": "change password",
    "oldPassword": "old password",
    "newPassword": "new password",
    "newRepassword": "repeat new password",
    "notCompleteCredentials": "Please fill all required credentials.",
    "notMatchPasswords": "Passwords not matched.",
    "userTr": {
      "profileChanged": "Profile was successfully changed.",
      "profileNotChanged": "Profile change operation failed, please try it again.",
      "profileDeleted": "Profile was successfully completely deleted.",
      "profileNotDeleted": "Profile delete operation failed, please try it again.",
      "userExists": "Your user alredy exists.",
      "userRegistered": "You were successfully registered.",
      "userRegistrationError": "Registration error, please try it again.",
      "userNotExists": (email) => "User with e-mail: % isn't registered.".replace("%", email),
      "userBadPass": "Typed password isn't correct.",
      "userNotActive": "Your user account isn't active. Please contact your system administrator.",
      "userNotLogged": "Login process isn't finished correctly. Please try it again.",
      "userLoggedIn": "You are successfully logged in system.",
      "userNotLoggedOut": "Logged out failed. Please try it again.",
      "userLoggedOut": "You are logged out from system.",
      "userSaved": "User was successfully stored in the system.",
      "userNotSaved": "Saving user to the system wasn't successfull, please try it again.",
      "userChanged": "User data was successfully changed.",
      "userNotChanged": "Changing user to the system wasn't successfull, please try it again.",
      "userActivated": "Your user profile was successfully activated. You can now log by your credentials.",
      "userNotActivated": "Your user profile wasn't activated. Please reload this page for new activation."
    },
    "xPass": "Please, fill all necessary passwords.",
    "requiredTence": (name) => "% is required.".replace("%", this.translation.en[name]),
    "minLengthTence": (minLength) => "Minimal length is % characters.".replace("%", minLength),
    "patternTence": (name) => "Value doesn't match type %.".replace("%", name),
    "language": "language",
    "en": "en",
    "english": "english",
    "cz": "cz",
    "czech": "czech",
    "sk": "sk",
    "slovak": "slovak",
    "active": "active",
    "ico": "CRN",
    "ico_title": "Company registration number",
    "street": "street",
    "street_nr": "street_nr",
    "state": "state",
    "city": "city",
    "zip": "zip",
    "phone": "phones",
    "company": "company",
    "companies": "companies",
    "noCompanies": "There isn't any company store in the system.",
    "compEmailExists": "Company with this e-mail is alredy stored in the system.",
    "compIcoExists": "Company with this CRN is alredy stored in the system.",
    "compNotEmailExists": "Company with this e-mail isn't stored in the system.",
    "compNotIcoExists": "Company with this CRN isn't stored in the system.",
    "companySaved": "Company was successfully stored in the system.",
    "companyNotSaved": "Saving company to the system wasn't successfull, please try it again.",
    "companyChanged": "Company data was successfully changed.",
    "companyNotChanged": "Changing company data wasn't successfull, please try it again.",
    "modules": "modules",
    "module": "module",
    "noModules": "There isn't any module store in the system.",
    "moduleNameExists": "Module with this name is alredy stored in the system.",
    "moduleNotNameExists": "Module with this name isn't stored in the system.",
    "moduleSaved": "Module was successfully stored in the system.",
    "moduleNotSaved": "Saving module to the system wasn't successfull, please try it again.",
    "moduleChanged": "Module data was successfully changed.",
    "moduleNotChanged": "Changing module data wasn't successfull, please try it again.",
    "noRoles": "There isn't any role store in the system.",
    "roleNameExists": "Role with this name is alredy stored in the system.",
    "roleNotNameExists": "Role with this name isn't stored in the system.",
    "roleSaved": "Role was successfully stored in the system.",
    "roleNotSaved": "Saving role to the system wasn't successfull, please try it again.",
    "roleChanged": "Role data was successfully changed.",
    "roleNotChanged": "Changing role data wasn't successfull, please try it again.",
    "nousers": "There isn't any user store in the system.",
    "uploader": {
      "uploadPic": "Upload picture",
      "uploadFile": "Upload file",
      "uploading": "Uploading...",
      "deletePic": "Delete picture",
      "deleteFile": "Delete file",
      "deleting": "Deleting...",
    },
    "regex": regex
  },
  "cz": {
    "home": "domů",
    "news": "novinky",
    "addNew": "Přidat novinku",
    "subject": "předmět",
    "appendix": "úvod",
    "content": "obsah",
    "image": "obrázek",
    "gallery": "galerie",
    "attachments": "přílohy",
    "is": "je",
    "required": "povinný",
    "submit": "potvrdit",
    "file": "soubor",
    "upload": "nahrát",
    "create": "vytvořit",
    "newM": "nový",
    "newF": "nová",
    "newN": "nové",
    "edit": "editace",
    "delete": "smazat",
    "read": "čtení",
    "write": "zápis",
    "del": "mazání",
    "enabledM": "povolen",
    "enabledF": "povolena",
    "enabledN": "povoleno",
    "disabledM": "zakázán",
    "disabledF": "zakázána",
    "disabledN": "zakázáno",
    "file_upload": "nahrát soubor",
    "guest": "host",
    "user": "uživatel",
    "users": "uživatelé",
    "login": "přihlášení",
    "logout": "odhlášení",
    "name": "jméno",
    "firstName": "jméno",
    "lastName": "příjmení",
    "password": "heslo",
    "repassword": "opakujte heslo",
    "register": "registrace",
    "email": "e-mail",
    "role": "role",
    "roles": "role",
    "profile": "profil",
    "actions": "akce",
    "list": "seznam",
    "description": "popis",
    "changePassword": "změna hesla",
    "oldPassword": "staré heslo",
    "newPassword": "nové heslo",
    "newRepassword": "Opakujte nové heslo",
    "notCompleteCredentials": "Prosím vyplňte všechny povinné přihlašovací údaje.",
    "notMatchPasswords": "Zadaná hesla se neschodují.",
    "userTr": {
      "profileChanged": "Profil byl úspěšně změněn.",
      "profileNotChanged": "Při změně profilu nastala chyba, prosím zkuste to znovu.",
      "profileDeleted": "Profil byl úspěšně kompletně smazán.",
      "profileNotDeleted": "Při smazání profilu nastala chyba, prosím zkuste to znovu.",
      "userExists": "Vámi zadaný uživatel již existuje.",
      "userRegistered": "Vaše registrace proběhla úspěšně.",
      "userRegistrationError": "Chyba registrace, prosím zkuste jí znovu.",
      "userNotExists": (email) => "Uživatel: % není registrován.".replace("%", email),
      "userBadPass": "Zadané heslo není správné.",
      "userNotActive": "Váš uživatelský účet není aktivní. Prosím kontaktujte Vašeho systémového administrátora.",
      "userNotLogged": "Proces přihlašování nebyl dokončen korektně. Prosím, zkuste to znovu.",
      "userLoggedIn": "Úspěšně jste se přihlásili do systému.",
      "userNotLoggedOut": "Odhlášení selhalo. Prosím, zkuste to znovu.",
      "userLoggedOut": "Nyní jste odhlášeni ze systému.",
      "userSaved": "Uživatel byl úspěšně uložen do systému.",
      "userNotSaved": "Uložení uživatele do systému bylo neuspěšné, prosím zkuste to znovu.",
      "userChanged": "Data uživatele byla úspěšně změněna.",
      "userNotChanged": "Změna dat uživatele se nezdařila, prosím zkuste to znovu.",
      "userActivated": "Váš uživatelský profil byl úspěšně aktivován. Nyní se můžete přihlásit Vašimi údaji.",
      "userNotActivated": "Váš uživatelský profil nebyl aktivován. Prosím obnovte tuto stránku pro novou aktivaci.",
    },
    "xPass": "Prosím, vyplňte všechna nezbytná hesla.",
    "requiredTence": (name) => "% je vyžadováno.".replace("%", this.translation.cz[name]),
    "minLengthTence": (minLength) => "Minimální délka je % znaků.".replace("%", minLength),
    "patternTence": (name) => "Hodnota neodpovídá %.".replace("%", name),
    "language": "jazyk",
    "en": "en",
    "english": "angličtina",
    "cz": "cz",
    "czech": "čeština",
    "sk": "sk",
    "slovak": "slovenčina",
    "active": "aktivní",
    "ico": "IČO",
    "ico_title": "Identifikační číslo osoby",
    "street": "ulice",
    "street_nr": "číslo popisné",
    "state": "země",
    "city": "město",
    "zip": "psč",
    "phone": "tel. čísla",
    "company": "společnost",
    "companies": "společnosti",
    "noCompanies": "V systému není uložena žádná společnost.",
    "compEmailExists": "Společnost se zadanou E-mail adresou je již v systému uložena.",
    "compIcoExists": "Společnost se zadaným IČEM je již v systému uložena.",
    "compNotEmailExists": "Společnost se zadanou E-mail adresou není v systému uložena.",
    "compNotIcoExists": "Společnost se zadaným IČEM není v systému uoložena.",
    "companySaved": "Společnost byla úspěšně uložena do systému.",
    "companyNotSaved": "Uložení společnosti do systému bylo neuspěšné, prosím zkuste to znovu.",
    "companyChanged": "Data společnosti byla úspěšně změněna.",
    "companyNotChanged": "Změna dat společnosti se nezdařila, prosím zkuste to znovu.",
    "modules": "moduly",
    "module": "modul",
    "noModules": "V systému není uložen žádný modul.",
    "moduleNameExists": "Modul se zadaným jménem je již v systému uložen.",
    "moduleNotNameExists": "Modul se zadaným jménem není v systému uložen.",
    "moduleSaved": "Modul byl úspěšně uložen do systému.",
    "moduleNotSaved": "Uložení modulu do systému bylo neuspěšné, prosím zkuste to znovu.",
    "moduleChanged": "Data modulu byla úspěšně změněna.",
    "moduleNotChanged": "Změna dat modulu se nezdařila, prosím zkuste to znovu.",
    "noRoles": "V systému není uložena žádná role.",
    "roleNameExists": "Role se zadaným jménem je již v systému uložen.",
    "roleNotNameExists": "Role se zadaným jménem není v systému uložena.",
    "roleSaved": "Role byla úspěšně uložena do systému.",
    "roleNotSaved": "Uložení role do systému bylo neuspěšné, prosím zkuste to znovu.",
    "roleChanged": "Data role byla úspěšně změněna.",
    "roleNotChanged": "Změna dat role se nezdařila, prosím zkuste to znovu.",
    "nousers": "V systému není uložena žádný uživatel.",
    "uploader": {
      "uploadPic": "Nahrát obrázek",
      "uploadFile": "Nahrát soubor",
      "uploading": "Nahrávám...",
      "deletePic": "Smazat obrázek",
      "deleteFile": "Smazat soubor",
      "deleting": "Mažu..."
    },
    "regex": regex
  },
  "sk": {
    "home": "domov",
    "news": "noviny",
    "addNew": "Pridat novinu",
    "subject": "predmet",
    "appendix": "úvod",
    "content": "obsah",
    "image": "obrázok",
    "gallery": "galéria",
    "attachments": "prílohy",
    "is": "je",
    "required": "povinný",
    "submit": "potvrdiť",
    "file": "súbor",
    "upload": "nahrať",
    "create": "vytvoriť",
    "newM": "nový",
    "newF": "nová",
    "newN": "nové",
    "edit": "editácia",
    "delete": "zmazať",
    "read": "čítania",
    "write": "zápis",
    "del": "mazanie",
    "enabledM": "povolený",
    "enabledF": "povolené",
    "enabledN": "povolené",
    "disabledM": "zakázaný",
    "disabledF": "zakázané",
    "disabledN": "zakázané",
    "file_upload": "nahrať súbor",
    "guest": "hosť",
    "user": "užívateľ",
    "users": "užívatelia",
    "login": "prihlásenie",
    "logout": "odhlásenie",
    "name": "meno",
    "firstName": "meno",
    "lastName": "priezvisko",
    "password": "heslo",
    "repassword": "opakujte heslo",
    "register": "registrácia",
    "email": "e-mail",
    "role": "role",
    "roles": "role",
    "profile": "profil",
    "actions": "akcie",
    "list": "zoznam",
    "description": "popis",
    "changePassword": "zmena hesla",
    "oldPassword": "staré heslo",
    "newPassword": "nové heslo",
    "newRepassword": "opakujte nové heslo",
    "notCompleteCredentials": "Prosím vyplňte všetky povinné prihlasovacie údaje.",
    "notMatchPasswords": "Zadané heslá sa nezhodujú.",
    "userTr": {
      "profileChanged": "Profil bol úspešne zmenený.",
      "profileNotChanged": "Pri zmene profilu nastala chyba, prosím skúste znova.",
      "profileDeleted": "Profil bol úspešne zmazaný.",
      "profileNotDeleted": "Pri zmazanie profilu nastala chyba, prosím skúste znova.",
      "userExists": "Vami zadaný používateľ už existuje.",
      "userRegistered": "Vaša registrácia prebehla úspešne.",
      "userRegistrationError": "Chyba registrácie, prosím skúste jej znovu.",
      "userNotExists": (email) => "Používateľ: % nie je registrovaný.".replace("%", email),
      "userBadPass": "Zadané heslo nie je správne.",
      "userNotActive": "Váš užívateľský účet nie je aktívny. Prosím kontaktujte Vášho systémového administrátora.",
      "userNotLogged": "Proces prihlasovania nebol dokončený korektne. Prosím, skúste to znova.",
      "userLoggedIn": "Úspešne ste sa prihlásili do systému.",
      "userNotLoggedOut": "Odhlásenie zlyhalo. Prosím, skúste to znova.",
      "userLoggedOut": "Teraz ste sa odhlásili zo systému.",
      "userSaved": "Užívateľ bol úspešne uložený do systému.",
      "userNotSaved": "Vloženie užívateľa do systému bolo neúspešné, prosím skúste to znova.",
      "userChanged": "Dáta užívateľa bola úspešne zmenená.",
      "userNotChanged": "Zmena dát užívateľa zlyhala, prosím skúste to znova.",
      "userActivated": "Váš užívateľský profil bol úspešne aktivovaný. Teraz sa môžete prihlásiť pomocou poverení.",
      "userNotActivated": "Váš užívateľský profil nebol aktivovaný. Obnovte túto stránku pre novů aktiváciu.",
    },
    "xPass": "Prosím, vyplňte všetky potrebné heslá.",
    "requiredTence": (name) => "% je vyžadované.".replace("%", this.translation.sk[name]),
    "minLengthTence": (minLength) => "Minimálna dĺžka je % znakov.".replace("%", minLength),
    "patternTence": (name) => "Hodnota nezodpovedá typu %.".replace("%", name),
    "language": "jazyk",
    "en": "en",
    "english": "angličtina",
    "cz": "cz",
    "czech": "čeština",
    "sk": "sk",
    "slovak": "slovenčina",
    "active": "aktívny",
    "ico": "IČO",
    "ico_title": "Identifikačné číslo organizácie",
    "street": "ulice",
    "street_nr": "číslo popisné",
    "state": "krajina",
    "city": "město",
    "zip": "psč",
    "phone": "tel. čísla",
    "company": "spoločnosť",
    "companies": "spoločnosti",
    "noCompanies": "V systéme nie je vložená žiadna spoločnosť.",
    "compEmailExists": "Spoločnosť sa zadanú E-mail adresou je už v systéme uložená.",
    "compIcoExists": "Spoločnosť sa zadaným ČOM je už v systéme uložená.",
    "compNotEmailExists": "Spoločnosť sa zadanú E-mail adresou nie je v systéme uložená.",
    "compNotIcoExists": "Spoločnosť sa zadaným ČOM nie je v systéme uložená.",
    "companySaved": "Spoločnosť bola úspešne uložená do systému.",
    "companyNotSaved": "Vloženie spoločnosti do systému bolo neúspešné, prosím skúste to znova.",
    "companyChanged": "Dáta spoločnosti bola úspešne zmenená.",
    "companyNotChanged": "Zmena dát spoločnosti zlyhala, prosím skúste to znova.",
    "modules": "moduly",
    "module": "modul",
    "noModules": "V systéme nie je uložený žiadny modul.",
    "moduleNameExists": "Modul so zadaným menom je už v systéme uložený.",
    "moduleNotNameExists": "Modul so zadaným menom nie je v systéme uložený.",
    "moduleSaved": "Modul bol úspešne uložený do systému.",
    "moduleNotSaved": "Vloženie modulu do systému bolo neúspešné, prosím skúste to znova.",
    "moduleChanged": "Dáta modulu bola úspešne zmenená.",
    "moduleNotChanged": "Zmena dát modulu zlyhala, prosím skúste to znova.",
    "noRoles": "V systéme nie je vložená žiadna role.",
    "roleNameExists": "Role so zadaným menom je už v systéme uložena.",
    "roleNotNameExists": "Role so zadaným menom nie je v systéme uložena.",
    "roleSaved": "Role bola úspešne uložená do systému.",
    "roleNotSaved": "Vloženie role do systému bolo neúspešné, prosím skúste to znova.",
    "roleChanged": "Dáta role bola úspešne zmenená.",
    "roleNotChanged": "Zmena dát role zlyhala, prosím skúste to znova.",
    "nousers": "V systéme nie je uložený žiadny užívateľ.",
    "uploader": {
      "UploadPic": "Nahrať obrázok",
      "UploadFile": "Nahrať súbor",
      "Uploading": "Nahrávam ...",
      "DeletePic": "Zmazať obrázok",
      "DeleteFile": "Zmazať súbor",
      "Deleting": "Mažem ..."
    },
    "regex": regex
  }
};
