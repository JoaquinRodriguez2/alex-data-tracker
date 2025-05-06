//Login in pocketbase
import { pocketbaseConection } from './core/pocketbase';


export const authData = async (email:string,password:string) => await pocketbaseConection.collection('users').authWithPassword(
    email,
    password,
);



