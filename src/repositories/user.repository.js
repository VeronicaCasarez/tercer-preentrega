export default class UserRepository {
    constructor(dao) {
      this.dao = dao;
    }
    createUser = (user) => {
      return this.dao.save(user);
    };
    getAllUsers = () => {
      return this.dao.getAll();
    };
    getUserById = (params) => {
      return this.dao.getById(params);
    };
    updateUser = (id, user) => {
      return this.dao.update(id, user);
    };
  }