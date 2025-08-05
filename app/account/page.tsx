"use client"

import { useState } from "react"
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings, 
  MapPin, 
  Phone, 
  Mail, 
  Edit, 
  Save, 
  Eye, 
  EyeOff,
  Calendar,
  Package,
  Truck,
  CheckCircle,
  Star,
  LogOut,
  DollarSign,
  Plus,
  Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const userProfile = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  joinDate: "January 2024",
  totalOrders: 8,
  totalSpent: 456.78,
  addresses: [
    {
      id: 1,
      type: "Home",
      name: "Sarah Johnson",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true
    },
    {
      id: 2,
      type: "Work",
      name: "Sarah Johnson",
      address: "456 Business Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      isDefault: false
    }
  ]
}

const orderHistory = [
  {
    id: "VS-2024-001234",
    date: "2024-01-15",
    status: "delivered",
    total: 65.00,
    items: [
      { name: "Pink Satin Pajama Set", quantity: 2, price: 20.00 },
      { name: "Black Silk Robe", quantity: 1, price: 25.00 }
    ],
    trackingNumber: "1Z999AA1234567890"
  },
  {
    id: "VS-2024-001200",
    date: "2024-01-10",
    status: "delivered",
    total: 89.99,
    items: [
      { name: "Red Lace Bodysuit", quantity: 1, price: 40.00 },
      { name: "Cream Knit Set", quantity: 1, price: 49.99 }
    ],
    trackingNumber: "1Z999AA1234567891"
  },
  {
    id: "VS-2024-001180",
    date: "2024-01-05",
    status: "delivered",
    total: 45.50,
    items: [
      { name: "Green Striped Set", quantity: 1, price: 45.50 }
    ],
    trackingNumber: "1Z999AA1234567892"
  }
]

const wishlist = [
  {
    id: 1,
    name: "Pink Floral Pajama",
    price: 31.00,
    originalPrice: 35.00,
    image: "/v8.png",
    inStock: true
  },
  {
    id: 2,
    name: "Leopard Print Set",
    price: 32.00,
    originalPrice: 40.00,
    image: "/c4.png",
    inStock: true
  },
  {
    id: 3,
    name: "Blue Satin Set",
    price: 51.00,
    originalPrice: 51.00,
    image: "/c5.png",
    inStock: false
  }
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses' | 'settings'>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState(userProfile)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500'
      case 'shipped': return 'bg-blue-500'
      case 'processing': return 'bg-yellow-500'
      case 'pending': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // In a real app, this would make an API call to save the profile
    console.log('Saving profile:', profileData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4 animate-fade-in-up">My Account</h1>
            <p className="text-gray-600 text-lg animate-fade-in-up">Manage your profile and orders</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {[
                    { id: 'profile', label: 'Profile', icon: User },
                    { id: 'orders', label: 'Order History', icon: ShoppingBag },
                    { id: 'wishlist', label: 'Wishlist', icon: Heart },
                    { id: 'addresses', label: 'Addresses', icon: MapPin },
                    { id: 'settings', label: 'Settings', icon: Settings }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-pink-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Profile Information</h2>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          {isEditing ? (
                            <Input
                              value={profileData.name}
                              onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            />
                          ) : (
                            <p className="text-gray-900">{profileData.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          {isEditing ? (
                            <Input
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            />
                          ) : (
                            <p className="text-gray-900">{profileData.email}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        {isEditing ? (
                          <Input
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          />
                        ) : (
                          <p className="text-gray-900">{profileData.phone}</p>
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex space-x-4">
                          <Button 
                            onClick={handleSaveProfile}
                            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Account Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <Card className="hover-lift">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-6 h-6 text-pink-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{profileData.totalOrders}</p>
                      <p className="text-gray-600">Total Orders</p>
                    </CardContent>
                  </Card>
                  <Card className="hover-lift">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">${profileData.totalSpent}</p>
                      <p className="text-gray-600">Total Spent</p>
                    </CardContent>
                  </Card>
                  <Card className="hover-lift">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{profileData.joinDate}</p>
                      <p className="text-gray-600">Member Since</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Order History</h2>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <Card key={order.id} className="hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{order.id}</h3>
                            <p className="text-gray-600">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">${order.total}</p>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} (x{item.quantity})</span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Link href={`/tracking?order=${order.id}`}>
                              <Button variant="outline" size="sm">
                                <Truck className="w-4 h-4 mr-2" />
                                Track Order
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Star className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          </div>
                          <Link href={`/product/${order.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">My Wishlist</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <Card key={item.id} className="hover-lift">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <Package className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-pink-600">${item.price}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                            )}
                          </div>
                          <Badge className={item.inStock ? 'bg-green-500' : 'bg-red-500'}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                            disabled={!item.inStock}
                          >
                            Add to Cart
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">My Addresses</h2>
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Address
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profileData.addresses.map((address) => (
                    <Card key={address.id} className="hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-pink-500" />
                            <h3 className="font-semibold">{address.type}</h3>
                          </div>
                          {address.isDefault && (
                            <Badge className="bg-green-500">Default</Badge>
                          )}
                        </div>
                        <div className="space-y-2">
                          <p className="font-medium">{address.name}</p>
                          <p className="text-gray-600">{address.address}</p>
                          <p className="text-gray-600">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p className="text-gray-600">{address.country}</p>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Account Settings</h2>
                
                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Password</label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">New Password</label>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <Button className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600">
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-lift">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-gray-600">Get notified about order status changes</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Promotional Emails</p>
                          <p className="text-sm text-gray-600">Receive special offers and discounts</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">New Product Alerts</p>
                          <p className="text-sm text-gray-600">Be the first to know about new arrivals</p>
                        </div>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 