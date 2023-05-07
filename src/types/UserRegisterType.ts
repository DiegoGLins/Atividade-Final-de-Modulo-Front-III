import ErrandsType from './ErrandsType';

interface UserRegisterType {
    email: string;
    password: string;
    errands: ErrandsType[],
}
export default UserRegisterType;

