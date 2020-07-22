// import {AxiosStatic} from "axios";
//
// export interface AxiosInstance{
//     (request) : jest.fn(() => Promise.resolve({ data: {} }))
// }
// const Axios: AxiosInstance;
//
// export default Axios
export default {
    post: jest.fn(() => Promise.resolve({data:{}})),
    get: jest.fn(() => Promise.resolve({ data: {} })),
    patch: jest.fn(() => Promise.resolve({ data: {} }))
};
