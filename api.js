import * as axios from "axios";


let instance = axios.create({
    baseURL: 'https://62beba4a0bc9b125615dc671.mockapi.io/'
})


export let API = {
    getInstitutions() {
        return instance.get(`Organization`).then(res => res.data);
    },
    getCurrentInstitution(id) {
        return instance.get(`Organization/${id}`).then(res => res.data);
    },

    getCurrentInstitutionComments() {
        return instance.get(`OrgComment/`).then(res => res.data);
    },

    getCurrentEmployees(id) {
        return instance.get(`Organization/${id}/Employee`).then(res => res.data);
    },

    getCurrentEmployeeComments(orgId, emplId) {
        return instance.get(`Organization/${orgId}/Employee/${emplId}/Comment`).then(res => res.data);
    },
    getCurrentEmployeeInfo(orgId, emplId) {
        return instance.get(`Organization/${orgId}/Employee/${emplId}`).then(res => res.data);
    },
    addInstitutions(values){
        return instance.post(`Organization`, {...values}).then(res => res.data);
    },
    addEmployee(values, id){
        return instance.post(`Organization/${id}/Employee`, {...values}).then(res => res.data);
    },

    addInstitutionComment(values){
        return instance.post(`OrgComment`, {...values}).then(res => res.data);
    },
    addEmployeeComment(orgId, emplId, values) {
        return instance.post(`Organization/${orgId}/Employee/${emplId}/Comment`, {...values}).then(res => res.data);
    },
    updateInstitutions(id, values){
        return instance.put(`Organization/${id}`, {...values}).then(res => res.data);
    },
    deleteInstitution(id){
        return instance.delete(`Organization/${id}`).then(res => res.data);
    },
    deleteInstitutionComment(id){
        return instance.delete(`OrgComment/${id}`).then(res => res.data);
    },
    updateInstitutionRating(id, values){
        return instance.put(`Organization/${id}`, {...values}).then(res => res.data);
    },
    updateEmployeeRating(orgId, empId, values){
        return instance.put(`Organization/${orgId}/Employee/${empId}`, {...values}).then(res => res.data);
    }
}