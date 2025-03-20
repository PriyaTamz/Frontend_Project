import instance from "./instance";

const authServices = {
    adminRegister: async (data) => {
        return await instance.post('/admin/register', data);
    },
    adminlogin: async (data) => {
        return await instance.post('/admin/login', data);
    },
    profile: async (data) => {
        return await instance.get('/admin/profile', data);
    },
    logout: async (data) => {
        return await instance.post('/admin/logout', data);
    },
    addAgent: async (data) => {
        return await instance.post('/agents/add', data);
    },
    listAgent: async (data) => {
        return await instance.get('/agents/list', data);
    },
    listUploads: async (data) => {
        return await instance.get('/lists/all', data);
    }
};

export default authServices;
