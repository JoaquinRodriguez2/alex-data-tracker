// permissions-service.js
import PocketBase from 'pocketbase';
import { create } from 'zustand';

// Initialize PocketBase client
const pb = new PocketBase('YOUR_POCKETBASE_URL');

// Create a Zustand store to manage permission state
export const usePermissionsStore = create((set) => ({
  permissions: [],
  roles: [],
  isAdmin: false,
  isLoading: true,
  error: null,
}));

// Utility to determine if user has a specific permission
export const hasPermission = (permissionName) => {
  const { permissions } = usePermissionsStore.getState();
  return permissions.includes(permissionName);
};

// Utility to determine if user has a specific role
export const hasRole = (roleName) => {
  const { roles } = usePermissionsStore.getState();
  return roles.includes(roleName);
};

// Main function to initialize and subscribe to permission changes
export const initPermissionsService = async () => {
  try {
    // Set loading state
    usePermissionsStore.setState({ isLoading: true, error: null });

    // Check if user is authenticated
    if (!pb.authStore.isValid) {
      usePermissionsStore.setState({ 
        permissions: [], 
        roles: [], 
        isAdmin: false,
        isLoading: false 
      });
      return;
    }

    // Get the current user ID
    const userId = pb.authStore.model.id;

    // Function to fetch and update permissions
    const fetchAndUpdatePermissions = async () => {
      try {
        // Assuming you have a 'user_permissions' collection that links users to permissions
        // Adjust the query according to your data structure
        const permissionsData = await pb.collection('user_permissions').getList(1, 50, {
          filter: `user="${userId}"`,
          expand: 'permission,role',
        });

        // Extract permissions and roles from the response
        const permissions = permissionsData.items.map(item => 
          item.expand?.permission?.name || item.permission_name || ''
        ).filter(Boolean);

        const roles = permissionsData.items.map(item => 
          item.expand?.role?.name || item.role_name || ''
        ).filter(Boolean);

        // Check if user is admin (you can adjust this logic)
        const isAdmin = roles.includes('admin');

        // Update the store
        usePermissionsStore.setState({ 
          permissions, 
          roles, 
          isAdmin,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching permissions:', error);
        usePermissionsStore.setState({ 
          error: error,
          isLoading: false
        });
      }
    };

    // Initial fetch
    await fetchAndUpdatePermissions();

    // Subscribe to real-time updates for user permissions
    // Adjust the collection name according to your PocketBase structure
    pb.collection('user_permissions').subscribe(`user="${userId}"`, async (data) => {
      console.log('Permission change detected:', data);
      await fetchAndUpdatePermissions();
    });

    // Also subscribe to auth changes
    pb.authStore.onChange(async (auth) => {
      if (auth) {
        await fetchAndUpdatePermissions();
      } else {
        // Reset permissions when user logs out
        usePermissionsStore.setState({ 
          permissions: [], 
          roles: [], 
          isAdmin: false,
          isLoading: false 
        });
      }
    });

  } catch (error) {
    console.error('Error initializing permissions service:', error);
    usePermissionsStore.setState({ 
      error: error,
      isLoading: false
    });
  }
};

// Function to clean up subscriptions
export const cleanupPermissionsService = () => {
  pb.collection('user_permissions').unsubscribe();
};