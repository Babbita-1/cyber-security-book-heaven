const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
};

const PERMISSIONS = {
    CREATE_BOOK: 'create:book',
    READ_BOOK: 'read:book',
    UPDATE_BOOK: 'update:book',
    DELETE_BOOK: 'delete:book',
    MANAGE_USERS: 'manage:users',
    PLACE_ORDER: 'place:order',
    VIEW_ORDERS: 'view:orders'
};

const ROLE_PERMISSIONS = {
    [ROLES.ADMIN]: [
        PERMISSIONS.CREATE_BOOK,
        PERMISSIONS.READ_BOOK,
        PERMISSIONS.UPDATE_BOOK,
        PERMISSIONS.DELETE_BOOK,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.VIEW_ORDERS
    ],
    [ROLES.USER]: [
        PERMISSIONS.READ_BOOK,
        PERMISSIONS.PLACE_ORDER,
        PERMISSIONS.VIEW_ORDERS
    ],
    [ROLES.GUEST]: [
        PERMISSIONS.READ_BOOK
    ]
};

const hasRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized - No user found' });
        }

        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden - Insufficient role permissions' });
        }

        next();
    };
};

const hasPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized - No user found' });
        }

        const userRole = req.user.role;
        const rolePermissions = ROLE_PERMISSIONS[userRole] || [];

        if (!rolePermissions.includes(permission)) {
            return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
        }

        next();
    };
};

module.exports = {
    ROLES,
    PERMISSIONS,
    ROLE_PERMISSIONS,
    hasRole,
    hasPermission
};
