import { pocketbaseConection } from "@/utils/pocketbase";

// Authenticate user
export async function authenticate(email: string, password: string): Promise<boolean> {
    try {
        await pocketbaseConection.authStore.clear();
        logout();
        await pocketbaseConection.collection('users').authWithPassword(email, password);
        return true; // Returns user data and token
    } catch (error) {
        throw new Error('Invalid credentials');
    }
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
    const user = pocketbaseConection.authStore.model;
    return !!user; // Returns true if a user is authenticated, false otherwise
}

// Logout user
export function logout(): void {
    pocketbaseConection.authStore.clear();
}

// Check if user has a specific permission
export function hasPermission(permission: string): boolean {
    const user = pocketbaseConection.authStore.model;
    if (!user || !Array.isArray(user.permissions)) return false;
    return user.permissions.includes(permission);
}

// Check if user hasn't had a change like password or email, in case of it logout
export async function authCheck(): Promise<boolean> {
    try {
        const oldUser = pocketbaseConection.authStore.record;
        if (oldUser) {
            const newUser = await pocketbaseConection.collection('users').getOne(oldUser.id);
            if (newUser && newUser.updated === oldUser.updated) {
                return true;
            } else {
                logout();
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error during authCheck:', error);
        return false;
    }
}