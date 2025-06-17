
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, Bell, Users, Archive } from 'lucide-react';
import BottomNavigation from '@/components/BottomNavigation';

const Inbox = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const conversations = [
    {
      id: 1,
      name: 'ETUSB Support',
      message: 'Your ticket booking is confirmed',
      time: '2h ago',
      unread: true,
      avatar: '🚌'
    },
    {
      id: 2,
      name: 'Transit Updates',
      message: 'Route 15 - Minor delays expected',
      time: '4h ago',
      unread: false,
      avatar: '📢'
    },
    {
      id: 3,
      name: 'Train Service',
      message: 'Welcome to Doroub premium service',
      time: '1d ago',
      unread: false,
      avatar: '🚄'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Journey Reminder',
      message: 'Your trip to Centre Ville starts in 30 minutes',
      time: '30m ago',
      type: 'reminder'
    },
    {
      id: 2,
      title: 'Payment Successful',
      message: 'Your ticket payment has been processed',
      time: '2h ago',
      type: 'success'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-doroub-blue via-doroub-purple to-doroub-pink text-white p-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{t('inbox')}</h1>
            <p className="text-blue-100">Stay connected with your transit</p>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-doroub-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow">
            <MessageCircle className="w-6 h-6 text-doroub-blue" />
            <span className="text-xs font-medium text-gray-700">Messages</span>
          </button>
          <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow">
            <Bell className="w-6 h-6 text-doroub-purple" />
            <span className="text-xs font-medium text-gray-700">Alerts</span>
          </button>
          <button className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow">
            <Archive className="w-6 h-6 text-doroub-pink" />
            <span className="text-xs font-medium text-gray-700">Archive</span>
          </button>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <Bell className="w-5 h-5 mr-2 text-doroub-blue" />
              Recent Notifications
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-green-500' : 'bg-doroub-blue'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{notification.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-doroub-purple" />
              Messages
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-doroub-blue to-doroub-purple rounded-full flex items-center justify-center text-white text-lg">
                    {conversation.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-800">{conversation.name}</h4>
                      <span className="text-xs text-gray-400">{conversation.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{conversation.message}</p>
                  </div>
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-doroub-pink rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help & Support */}
        <div className="bg-gradient-to-r from-doroub-blue/10 to-doroub-purple/10 rounded-xl p-4 border border-doroub-blue/20">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-doroub-blue" />
            <div>
              <h3 className="font-semibold text-gray-800">Need Help?</h3>
              <p className="text-gray-600 text-sm">Contact our support team 24/7</p>
            </div>
          </div>
          <button className="mt-3 bg-gradient-to-r from-doroub-blue to-doroub-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-shadow">
            Start Conversation
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Inbox;
