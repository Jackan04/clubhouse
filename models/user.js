export default class User {
  constructor(firstname, lastname, username, password, admin = false) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.admin = admin;
  }
}
