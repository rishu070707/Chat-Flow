import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, app } from '../firebase';
import EmojiPicker from 'emoji-picker-react';
import { Send, Smile, Moon, Sun, LogOut, MessageCircle } from 'lucide-react';
// Import useNavigate if you're using React Router for navigation
import { useNavigate } from 'react-router-dom'; 

const db = getFirestore(app);

const ChatApp = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Auth state check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (!loggedInUser) {
        console.log('User not logged in, redirecting...');
        navigate('/'); // Redirect to login/home page if user is not logged in
      } else {
        setUser(loggedInUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]); // Add navigate to dependency array

  // Load messages
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
      // Scroll to the latest message with a slight delay for smooth animation
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, 'messages'), {
      uid: user.uid,
      photoURL: user.photoURL || '',
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp(),
    });
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp?.toDate) return '...';
    
    const date = timestamp.toDate();
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  const isMyMessage = (messageUid) => messageUid === user?.uid;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6
      }
    }
  };

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Effect to toggle 'dark' class on <html> element for Tailwind dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`flex flex-col h-screen w-screen transition-all duration-500 ${
        darkMode 
          ? 'bg-slate-900 text-white' 
          : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Header */}
      <motion.div 
        variants={itemVariants}
        className={`flex justify-between items-center p-6 border-b transition-all duration-500 relative z-20 ${
          darkMode 
            ? 'bg-slate-900 border-slate-700/30' 
            : 'bg-slate-100 border-slate-200/30'
        }`}
      >
        <div className="flex items-center gap-4 relative">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            animate={floatingAnimation}
            className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 shadow-lg"
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ChatFlow
            </motion.h1>
            <motion.p 
              className={`text-sm transition-all duration-300 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome, {user?.displayName || 'Guest'}
            </motion.p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 relative">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-2xl transition-all duration-300 shadow-lg ${
              darkMode 
                ? 'bg-slate-800/80 hover:bg-slate-700/80 text-yellow-400 shadow-yellow-400/20' 
                : 'bg-white/80 hover:bg-slate-100/80 text-slate-700 shadow-slate-200/50'
            }`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <motion.div
              animate={{ rotate: darkMode ? 0 : 180 }}
              transition={{ duration: 0.5 }}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </motion.div>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-red-500/25"
            onClick={async () => { // Made onClick async
              try {
                await signOut(auth);
                console.log("User logged out successfully.");
                navigate('/'); // This line is crucial for redirection after logout
              } catch (error) {
                console.error("Error signing out:", error);
                // Optionally show an error message to the user
              }
            }}
          >
            <LogOut className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div>

      {/* Chat Container Wrapper */}
      <div className="flex-1 flex justify-center items-stretch p-6 pb-0">
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-5xl flex flex-col h-full rounded-3xl overflow-hidden" 
          style={{
            boxShadow: darkMode 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
          }}
        >
          {/* Messages Area */}
          <motion.div 
            className={`flex-1 p-6 overflow-y-auto chat-messages-scrollbar transition-all duration-500 relative ${ 
              darkMode 
                ? 'bg-slate-800' 
                : 'bg-white' 
            }`}
          >
            {/* Subtle animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                background: darkMode 
                  ? ['radial-gradient(circle at 20% 20%, #4f46e5 0%, transparent 50%)', 'radial-gradient(circle at 80% 80%, #7c3aed 0%, transparent 50%)']
                  : ['radial-gradient(circle at 20% 20%, #6366f1 0%, transparent 50%)', 'radial-gradient(circle at 80% 80%, #8b5cf6 0%, transparent 50%)']
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            
            <div className="relative z-10">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, index) => {
                  const isMine = isMyMessage(msg.data.uid);
                  return (
                    <motion.div
                      key={msg.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ delay: index * 0.03 }}
                      className={`flex mb-8 ${isMine ? 'justify-end' : 'justify-start'}`}
                    >
                      <motion.div 
                        className={`flex max-w-[75%] ${isMine ? 'flex-row-reverse' : 'flex-row'} items-end gap-4`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {!isMine && (
                          <motion.img
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            src={
                              msg.data.photoURL ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                msg.data.displayName || 'User'
                              )}&background=random&rounded=true`
                            }
                            alt={msg.data.displayName}
                            className="w-12 h-12 rounded-full object-cover border-3 border-white shadow-xl flex-shrink-0"
                            style={{
                              boxShadow: darkMode
                                ? '0 8px 25px rgba(0,0,0,0.4)'
                                : '0 8px 25px rgba(0,0,0,0.15)'
                            }}
                            onError={(e) =>
                              (e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                msg.data.displayName || 'User'
                              )}&background=random&rounded=true`)
                            }
                          />
                        )}
                        
                        <motion.div
                          whileHover={{ 
                            y: -2,
                            boxShadow: darkMode 
                              ? '0 20px 40px rgba(0,0,0,0.4)'
                              : '0 20px 40px rgba(0,0,0,0.15)'
                          }}
                          className={`rounded-3xl px-6 py-4 backdrop-blur-sm transition-all duration-300 ${
                            isMine
                              ? 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white rounded-br-lg shadow-lg shadow-purple-500/25'
                              : darkMode 
                                ? 'bg-slate-700 text-white rounded-bl-lg shadow-lg border border-slate-600/30'
                                : 'bg-slate-100 text-slate-900 rounded-bl-lg shadow-lg border border-slate-200/50'
                          }`}
                        >
                          {!isMine && (
                            <motion.div 
                              className="text-xs font-semibold mb-2 opacity-70"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 0.7, y: 0 }}
                              transition={{ delay: 0.2 }}
                            >
                              {msg.data.displayName}
                            </motion.div>
                          )}
                          <motion.div 
                            className="text-sm leading-relaxed whitespace-pre-wrap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {msg.data.text}
                          </motion.div>
                          <motion.div 
                            className={`text-xs mt-3 opacity-60 ${isMine ? 'text-right' : 'text-left'}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.4 }}
                          >
                            {formatDateTime(msg.data.timestamp)}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={messagesEndRef}></div>
            </div>
          </motion.div>

          {/* Input Area */}
          <motion.div 
            variants={itemVariants}
            className={`relative p-6 pt-0 transition-all duration-500 ${ 
              darkMode 
                ? 'bg-slate-800' 
                : 'bg-white' 
            }`}
          >
            <div className="flex items-end gap-4">
              <div className="flex-1 relative">
                <motion.textarea
                  whileFocus={{ scale: 1.01 }} 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  className={`w-full resize-none rounded-2xl px-6 py-4 pr-14 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                    darkMode 
                      ? 'bg-slate-700 text-white placeholder-slate-400 border border-slate-600/30' 
                      : 'bg-slate-50 text-slate-900 placeholder-slate-500 border border-slate-200/50'
                  }`}
                  style={{ minHeight: '60px', maxHeight: '140px' }}
                />
                
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-300 ${
                    darkMode 
                      ? 'hover:bg-slate-600/50 text-slate-400 hover:text-yellow-400' 
                      : 'hover:bg-slate-200/50 text-slate-500 hover:text-indigo-600'
                  }`}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="w-6 h-6" />
                </motion.button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="p-4 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white rounded-2xl shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Send className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Emoji Picker */}
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute bottom-full right-6 mb-4 z-50"
                >
                  <motion.div 
                    className={`rounded-3xl overflow-hidden shadow-2xl border backdrop-blur-xl ${
                      darkMode 
                        ? 'bg-slate-800/95 border-slate-700/30' 
                        : 'bg-white/95 border-slate-200/30'
                    }`}
                    style={{
                      boxShadow: darkMode
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    <div className={`flex justify-between items-center p-4 border-b ${
                      darkMode ? 'border-slate-700/30' : 'border-slate-200/30'
                    }`}>
                      <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Choose Emoji
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 text-lg ${
                          darkMode 
                            ? 'hover:bg-slate-700 text-slate-400' 
                            : 'hover:bg-slate-100 text-slate-600'
                        }`}
                        onClick={() => setShowEmojiPicker(false)}
                      >
                        ×
                      </motion.button>
                    </div>
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      theme={darkMode ? 'dark' : 'light'}
                      height={350}
                      width={320}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatApp;