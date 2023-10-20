export default class UserRepository {
    constructor(dao) {
      this.dao = dao;
    }
    createUser = (user) => {
      return this.dao.saveUser(user);
    };
    getAll = () => {
      return this.dao.getAll();
    };
    getUserId = (params) => {
      return this.dao.getUserById(params);
    };
    update = (id, user) => {
      return this.dao.updateUser(id, user);
    };
  }