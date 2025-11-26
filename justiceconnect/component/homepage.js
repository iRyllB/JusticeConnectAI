// component/HomeScreen.js
import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import HomeScreenUI from "./ui/homepage";
import SidebarLogic from "./Sidebar.js"; // import Sidebar logic

export default function HomeScreen() {
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("english");
  const [currentChatId, setCurrentChatId] = useState("");
  const [chats, setChats] = useState([]);
  const [isFreeMode, setIsFreeMode] = useState(false); // example flag
  const [user, setUser] = useState({ email: "demo@example.com", user_metadata: { name: "John Doe" } });
  
  const navigation = useNavigation();

  const handleHamburger = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const handleLanguageChange = (lang) => setLanguage(lang);

  const handleLogout = () => {
    // example logout logic
    setIsFreeMode(true);
    handleCloseSidebar();
  };

  const handleLoadChat = (chat) => {
    setCurrentChatId(chat.id);
    handleCloseSidebar();
  };

  const handleDeleteChat = (chatId) => {
    setChats((prev) => prev.filter((c) => c.id !== chatId));
  };

  const handleNewChat = () => {
    const newChat = {
      id: Math.random().toString(),
      userId: user.email,
      messages: [],
      language,
      updatedAt: new Date().toISOString(),
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Main Home Screen UI */}
      <HomeScreenUI
        message={message}
        setMessage={setMessage}
        handleHamburger={handleHamburger}
        navigation={navigation}
      />

      {/* Sidebar */}
      <SidebarLogic
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        language={language}
        onLanguageChange={handleLanguageChange}
        isFreeMode={isFreeMode}
        onLogout={handleLogout}
        onLoadChat={handleLoadChat}
        onDeleteChat={handleDeleteChat}
        onNewChat={handleNewChat}
        chats={chats}
        currentChatId={currentChatId}
        user={user}
      />
    </View>
  );
}
