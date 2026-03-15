import { Home, Package, User } from "lucide-react";

export const NAV_LINKS = [
    { name: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Products', href: '/products', icon: <Package className="h-4 w-4" /> },
    { name: 'Services', href: '#services', icon: <User className="h-4 w-4" /> },
    { name: 'Courses', href: '#courses', icon: <User className="h-4 w-4" /> },
   
];