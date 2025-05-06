//Login in pocketbase
import { pocketbaseConection } from './core/pocketbase';


export const authData = async (email:string,password:string) => await pocketbaseConection.collection('users').authWithPassword(
    email,
    password,
);

// Subscribe to changes only in the specified record
export const connectRealTimeUser = async () => await pocketbaseConection.collection('users').subscribe('z0qukjwt101u62l', function (e) {
    console.log(e.action);
    console.log(e.record);
}, { /* other options like expand, custom headers, etc. */ });

